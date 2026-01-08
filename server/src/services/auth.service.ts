import bcrypt from "bcryptjs";
import crypto from "crypto";
import { type User } from "@shared/schema";
import * as userRepo from "../repositories/user.repo";

const SALT_ROUNDS = 12;
const TOKEN_EXPIRY_HOURS = 24;
const OTP_EXPIRY_MINUTES = 10;
const OTP_MAX_ATTEMPTS = 3;

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

function generateSecureToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function hashToken(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export async function createUser(data: {
  email: string;
  password: string;
  fullName: string;
  phoneNumber?: string;
}): Promise<User> {
  const hashedPassword = await hashPassword(data.password);
  const username = data.email.split("@")[0] + "_" + crypto.randomBytes(4).toString("hex");
  
  const user = await userRepo.createUser({
    username,
    email: data.email,
    hashedPassword,
    fullName: data.fullName,
    phoneNumber: data.phoneNumber || null,
  });
  
  return user;
}

export async function getUserByEmail(email: string): Promise<User | undefined> {
  return userRepo.getUserByEmail(email);
}

export async function getUserById(id: string): Promise<User | undefined> {
  return userRepo.getUserById(id);
}

export async function getUserByPhone(phoneNumber: string): Promise<User | undefined> {
  return userRepo.getUserByPhone(phoneNumber);
}

export async function createEmailVerificationToken(userId: string): Promise<string> {
  const token = generateSecureToken();
  const tokenHash = hashToken(token);
  const expiresAt = new Date(Date.now() + TOKEN_EXPIRY_HOURS * 60 * 60 * 1000);
  
  await userRepo.createEmailVerificationToken(userId, tokenHash, expiresAt);
  
  return token;
}

export async function verifyEmailToken(token: string): Promise<{ success: boolean; userId?: string; error?: string }> {
  const tokenHash = hashToken(token);
  
  const tokenRecord = await userRepo.getEmailVerificationToken(tokenHash);
  
  if (!tokenRecord) {
    return { success: false, error: "Invalid or expired verification link" };
  }
  
  await userRepo.markEmailVerificationTokenAsUsed(tokenRecord.id);
  await userRepo.updateUserEmailVerified(tokenRecord.userId);
  
  return { success: true, userId: tokenRecord.userId };
}

export async function createPasswordResetToken(userId: string): Promise<string> {
  const token = generateSecureToken();
  const tokenHash = hashToken(token);
  const expiresAt = new Date(Date.now() + TOKEN_EXPIRY_HOURS * 60 * 60 * 1000);
  
  await userRepo.createPasswordResetToken(userId, tokenHash, expiresAt);
  
  return token;
}

export async function resetPasswordWithToken(token: string, newPassword: string): Promise<{ success: boolean; error?: string }> {
  const tokenHash = hashToken(token);
  
  const tokenRecord = await userRepo.getPasswordResetToken(tokenHash);
  
  if (!tokenRecord) {
    return { success: false, error: "Invalid or expired reset link" };
  }
  
  const hashedPassword = await hashPassword(newPassword);
  
  await userRepo.markPasswordResetTokenAsUsed(tokenRecord.id);
  await userRepo.updateUserPassword(tokenRecord.userId, hashedPassword);
  
  return { success: true };
}

export async function createOTPChallenge(
  destination: string, 
  channel: "sms" | "email",
  userId?: string
): Promise<{ otp: string; challengeId: string }> {
  const otp = generateOTP();
  const codeHash = hashToken(otp);
  const expiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);
  
  const challenge = await userRepo.createOTPChallenge({
    userId: userId || null,
    channel,
    destination,
    codeHash,
    expiresAt,
  });
  
  return { otp, challengeId: challenge.id };
}

export async function verifyOTP(
  destination: string, 
  code: string
): Promise<{ success: boolean; userId?: string | null; error?: string }> {
  const codeHash = hashToken(code);
  
  const challenge = await userRepo.getActiveOTPChallenge(destination);
  
  if (!challenge) {
    return { success: false, error: "No active OTP found. Please request a new one." };
  }
  
  if ((challenge.attempts || 0) >= (challenge.maxAttempts || OTP_MAX_ATTEMPTS)) {
    return { success: false, error: "Maximum attempts exceeded. Please request a new OTP." };
  }
  
  if (challenge.codeHash !== codeHash) {
    await userRepo.incrementOTPAttempts(challenge.id, (challenge.attempts || 0) + 1);
    
    return { success: false, error: "Invalid OTP. Please try again." };
  }
  
  await userRepo.markOTPAsVerified(challenge.id);
  
  if (challenge.userId) {
    await userRepo.updateUserPhoneVerified(challenge.userId);
  }
  
  return { success: true, userId: challenge.userId };
}

export async function updateUserPassword(userId: string, newPassword: string): Promise<void> {
  const hashedPassword = await hashPassword(newPassword);
  await userRepo.updateUserPassword(userId, hashedPassword);
}

export async function updateLastLogin(userId: string): Promise<void> {
  await userRepo.updateLastLogin(userId);
}

