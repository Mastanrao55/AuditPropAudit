import { Request, Response } from "express";
import { ZodError } from "zod";
import { 
  registerUserSchema,
  loginUserSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  verifyEmailSchema,
  requestOTPSchema,
  verifyOTPSchema,
} from "@shared/schema";
import * as auth from "../services/auth.service";
import { sendVerificationEmail, sendPasswordResetEmail, sendOTPEmail } from "../services/email.service";
import { sendOTPSMS } from "../services/sms.service";

// OTP request rate limiting (in-memory, per phone number)
const otpRequestCounts = new Map<string, { count: number; resetAt: number }>();
const OTP_RATE_LIMIT = 3; // Max requests per window
const OTP_RATE_WINDOW = 5 * 60 * 1000; // 5 minutes

export const registerController = async (req: Request, res: Response) => {
  try {
    const data = registerUserSchema.parse(req.body);
    
    const existingUser = await auth.getUserByEmail(data.email);
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }
    
    const user = await auth.createUser({
      email: data.email,
      password: data.password,
      fullName: data.fullName,
      phoneNumber: data.phoneNumber,
    });
    
    const token = await auth.createEmailVerificationToken(user.id);
    await sendVerificationEmail(user.email!, token);
    
    res.json({ 
      success: true, 
      message: "Registration successful. Please check your email to verify your account.",
      userId: user.id 
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ error: error.errors[0].message });
    }
    console.error("Registration error:", error);
    res.status(500).json({ error: "Registration failed" });
  }
};

export const loginController = async (req: Request, res: Response) => {
  try {
    const data = loginUserSchema.parse(req.body);
    
    const user = await auth.getUserByEmail(data.email);
    if (!user || !user.hashedPassword) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    
    const isValid = await auth.verifyPassword(data.password, user.hashedPassword);
    if (!isValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    
    if (!user.emailVerified) {
      return res.status(403).json({ 
        error: "Please verify your email before logging in",
        requiresVerification: true 
      });
    }
    
    if (user.status !== "active") {
      return res.status(403).json({ error: "Your account has been suspended" });
    }
    
    await auth.updateLastLogin(user.id);
    
    req.session.userId = user.id;
    req.session.email = user.email!;
    req.session.role = user.role;
    
    res.json({ 
      success: true, 
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        emailVerified: user.emailVerified,
        phoneVerified: user.phoneVerified,
      }
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ error: error.errors[0].message });
    }
    console.error("Login error:", error);
    res.status(500).json({ error: "Login failed" });
  }
};

export const logoutController = (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: "Logout failed" });
    }
    res.clearCookie("connect.sid");
    res.json({ success: true });
  });
};

export const getCurrentUserController = async (req: Request, res: Response) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: "Not authenticated" });
  }
  
  const user = await auth.getUserById(req.session.userId);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  
  res.json({
    id: user.id,
    email: user.email,
    fullName: user.fullName,
    role: user.role,
    emailVerified: user.emailVerified,
    phoneVerified: user.phoneVerified,
  });
};

export const verifyEmailController = async (req: Request, res: Response) => {
  try {
    const { token } = verifyEmailSchema.parse(req.body);
    const result = await auth.verifyEmailToken(token);
    
    if (!result.success) {
      return res.status(400).json({ error: result.error });
    }
    
    res.json({ success: true, message: "Email verified successfully" });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ error: error.errors[0].message });
    }
    res.status(500).json({ error: "Verification failed" });
  }
};

export const resendVerificationController = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }
    
    const user = await auth.getUserByEmail(email);
    if (!user) {
      return res.json({ success: true, message: "If the email exists, a verification link has been sent" });
    }
    
    if (user.emailVerified) {
      return res.status(400).json({ error: "Email is already verified" });
    }
    
    const token = await auth.createEmailVerificationToken(user.id);
    await sendVerificationEmail(user.email!, token);
    
    res.json({ success: true, message: "Verification email sent" });
  } catch (error) {
    console.error("Resend verification error:", error);
    res.status(500).json({ error: "Failed to resend verification email" });
  }
};

export const forgotPasswordController = async (req: Request, res: Response) => {
  try {
    const { email } = forgotPasswordSchema.parse(req.body);
    
    const user = await auth.getUserByEmail(email);
    if (user) {
      const token = await auth.createPasswordResetToken(user.id);
      await sendPasswordResetEmail(user.email!, token);
    }
    
    res.json({ 
      success: true, 
      message: "If an account exists with this email, a password reset link has been sent" 
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ error: error.errors[0].message });
    }
    res.status(500).json({ error: "Failed to process request" });
  }
};

export const resetPasswordController = async (req: Request, res: Response) => {
  try {
    const { token, password } = resetPasswordSchema.parse(req.body);
    const result = await auth.resetPasswordWithToken(token, password);
    
    if (!result.success) {
      return res.status(400).json({ error: result.error });
    }
    
    res.json({ success: true, message: "Password reset successfully" });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ error: error.errors[0].message });
    }
    res.status(500).json({ error: "Failed to reset password" });
  }
};

export const requestOTPController = async (req: Request, res: Response) => {
  try {
    const { phoneNumber } = requestOTPSchema.parse(req.body);
    
    // Rate limiting check
    const now = Date.now();
    const rateData = otpRequestCounts.get(phoneNumber);
    
    if (rateData) {
      if (now < rateData.resetAt) {
        if (rateData.count >= OTP_RATE_LIMIT) {
          const minutesLeft = Math.ceil((rateData.resetAt - now) / 60000);
          return res.status(429).json({ 
            error: `Too many OTP requests. Please try again in ${minutesLeft} minute(s).` 
          });
        }
        rateData.count++;
      } else {
        rateData.count = 1;
        rateData.resetAt = now + OTP_RATE_WINDOW;
      }
    } else {
      otpRequestCounts.set(phoneNumber, { count: 1, resetAt: now + OTP_RATE_WINDOW });
    }
    
    const user = await auth.getUserByPhone(phoneNumber);
    const { otp } = await auth.createOTPChallenge(phoneNumber, "sms", user?.id);
    
    const result = await sendOTPSMS(phoneNumber, otp);
    if (!result.success) {
      return res.status(500).json({ error: "Failed to send OTP" });
    }
    
    res.json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ error: error.errors[0].message });
    }
    console.error("OTP request error:", error);
    res.status(500).json({ error: "Failed to send OTP" });
  }
};

export const verifyOTPController = async (req: Request, res: Response) => {
  try {
    const { phoneNumber, code } = verifyOTPSchema.parse(req.body);
    const result = await auth.verifyOTP(phoneNumber, code);
    
    if (!result.success) {
      return res.status(400).json({ error: result.error });
    }
    
    if (result.userId) {
      const user = await auth.getUserById(result.userId);
      if (user) {
        req.session.userId = user.id;
        req.session.email = user.email!;
        req.session.role = user.role;
        
        return res.json({ 
          success: true, 
          isNewUser: false,
          user: {
            id: user.id,
            email: user.email,
            fullName: user.fullName,
            role: user.role,
          }
        });
      }
    }
    
    res.json({ 
      success: true, 
      isNewUser: true,
      message: "OTP verified. Please complete registration.",
      phoneNumber 
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ error: error.errors[0].message });
    }
    res.status(500).json({ error: "OTP verification failed" });
  }
};

export const requestEmailOTPController = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }
    
    const user = await auth.getUserByEmail(email);
    const { otp } = await auth.createOTPChallenge(email, "email", user?.id);
    
    await sendOTPEmail(email, otp);
    
    res.json({ success: true, message: "OTP sent to your email" });
  } catch (error) {
    console.error("Email OTP request error:", error);
    res.status(500).json({ error: "Failed to send OTP" });
  }
};
