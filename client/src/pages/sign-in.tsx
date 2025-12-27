import { Link, useLocation } from "wouter";
import { useState } from "react";
import { SEO, seoData } from "@/components/seo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, ArrowRight, Phone, Mail, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [requiresVerification, setRequiresVerification] = useState(false);
  const [verificationEmail, setVerificationEmail] = useState("");
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const { 
    login, 
    loginPending, 
    requestOTP, 
    requestOTPPending,
    verifyOTP,
    verifyOTPPending,
    resendVerification,
    resendVerificationPending
  } = useAuth();

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please enter both email and password.",
        variant: "destructive",
      });
      return;
    }

    try {
      await login({ email, password });
      toast({
        title: "Welcome Back!",
        description: `Logged in successfully. Redirecting to dashboard...`,
      });
      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (error: any) {
      const errorData = error?.data;
      
      if (errorData?.requiresVerification) {
        setRequiresVerification(true);
        setVerificationEmail(email);
        toast({
          title: "Email Not Verified",
          description: "Please verify your email before signing in.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Sign In Failed",
          description: error?.message || "Invalid email or password.",
          variant: "destructive",
        });
      }
    }
  };

  const handleRequestOTP = async () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      toast({
        title: "Error",
        description: "Please enter a valid phone number.",
        variant: "destructive",
      });
      return;
    }

    try {
      await requestOTP(phoneNumber);
      setOtpSent(true);
      toast({
        title: "OTP Sent",
        description: "A verification code has been sent to your phone.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to send OTP. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!otp || otp.length !== 6) {
      toast({
        title: "Error",
        description: "Please enter a valid 6-digit OTP.",
        variant: "destructive",
      });
      return;
    }

    try {
      const result = await verifyOTP({ phoneNumber, code: otp });
      if (result.isNewUser) {
        toast({
          title: "Phone Verified",
          description: "Please complete your registration.",
        });
        navigate("/sign-up?phone=" + encodeURIComponent(phoneNumber));
      } else {
        toast({
          title: "Welcome Back!",
          description: "Logged in successfully. Redirecting to dashboard...",
        });
        setTimeout(() => navigate("/dashboard"), 1000);
      }
    } catch (error: any) {
      toast({
        title: "Verification Failed",
        description: error?.message || "Invalid OTP. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleResendVerification = async () => {
    try {
      await resendVerification(verificationEmail);
      toast({
        title: "Verification Email Sent",
        description: "Please check your inbox for the verification link.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to resend verification email.",
        variant: "destructive",
      });
    }
  };

  if (requiresVerification) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <SEO {...seoData.signIn} />
        <header className="container mx-auto px-4 py-6 flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
              <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight">AssetzAudit</span>
            </div>
          </Link>
        </header>

        <main className="flex-1 flex items-center justify-center py-12 px-4">
          <Card className="w-full max-w-md border-muted">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Mail className="h-8 w-8 text-yellow-600" />
                </div>
                <h1 className="text-2xl font-bold">Email Verification Required</h1>
                <p className="text-muted-foreground">
                  Your email address <strong>{verificationEmail}</strong> has not been verified. 
                  Please check your inbox for the verification link.
                </p>
                <div className="pt-4 space-y-3">
                  <Button 
                    onClick={handleResendVerification}
                    disabled={resendVerificationPending}
                    className="w-full"
                    data-testid="button-resend-verification"
                  >
                    {resendVerificationPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Resend Verification Email"
                    )}
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => setRequiresVerification(false)}
                    data-testid="button-back-signin"
                  >
                    Back to Sign In
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEO {...seoData.signIn} />
      <header className="container mx-auto px-4 py-6 flex items-center justify-between">
        <Link href="/">
          <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
            <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight">AssetzAudit</span>
          </div>
        </Link>
        <div className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/">Back Home</Link>
          </Button>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <Card className="border-muted">
            <CardHeader className="space-y-2">
              <h1 className="text-2xl font-bold tracking-tight">Sign In</h1>
              <CardDescription>
                Choose your preferred method to sign in
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="email" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="email" data-testid="tab-email">
                    <Mail className="h-4 w-4 mr-2" />
                    Email
                  </TabsTrigger>
                  <TabsTrigger value="phone" data-testid="tab-phone">
                    <Phone className="h-4 w-4 mr-2" />
                    Phone OTP
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="email" className="space-y-4 mt-4">
                  <form onSubmit={handleEmailSignIn} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={loginPending}
                        data-testid="input-email"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">Password</Label>
                        <Link href="/forgot-password">
                          <span className="text-xs text-primary hover:underline cursor-pointer" data-testid="link-forgot-password">
                            Forgot password?
                          </span>
                        </Link>
                      </div>
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={loginPending}
                        data-testid="input-password"
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full gap-2" 
                      disabled={loginPending} 
                      data-testid="button-signin"
                    >
                      {loginPending ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Signing In...
                        </>
                      ) : (
                        <>
                          Sign In <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="phone" className="space-y-4 mt-4">
                  {!otpSent ? (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+91 98765 43210"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          disabled={requestOTPPending}
                          data-testid="input-phone"
                        />
                        <p className="text-xs text-muted-foreground">
                          We'll send a 6-digit OTP to this number
                        </p>
                      </div>

                      <Button 
                        onClick={handleRequestOTP}
                        className="w-full gap-2" 
                        disabled={requestOTPPending}
                        data-testid="button-request-otp"
                      >
                        {requestOTPPending ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Sending OTP...
                          </>
                        ) : (
                          <>
                            Send OTP <Phone className="h-4 w-4" />
                          </>
                        )}
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleVerifyOTP} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="otp">Enter OTP</Label>
                        <Input
                          id="otp"
                          type="text"
                          placeholder="Enter 6-digit code"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                          maxLength={6}
                          disabled={verifyOTPPending}
                          data-testid="input-otp"
                          className="text-center text-2xl tracking-widest"
                        />
                        <p className="text-xs text-muted-foreground">
                          OTP sent to {phoneNumber}
                        </p>
                      </div>

                      <Button 
                        type="submit"
                        className="w-full gap-2" 
                        disabled={verifyOTPPending}
                        data-testid="button-verify-otp"
                      >
                        {verifyOTPPending ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Verifying...
                          </>
                        ) : (
                          <>
                            Verify & Sign In <ArrowRight className="h-4 w-4" />
                          </>
                        )}
                      </Button>

                      <Button 
                        type="button"
                        variant="link"
                        className="w-full"
                        onClick={() => {
                          setOtpSent(false);
                          setOtp("");
                        }}
                        data-testid="button-change-phone"
                      >
                        Use a different phone number
                      </Button>
                    </form>
                  )}
                </TabsContent>
              </Tabs>

              <div className="mt-6 text-center text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link href="/sign-up">
                  <span className="text-primary hover:underline cursor-pointer" data-testid="link-signup">
                    Create account
                  </span>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6 border-muted bg-muted/30">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">
                <strong>Secure Access:</strong> Your data is protected with enterprise-grade security and encryption.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="border-t border-border py-12 bg-card">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 AssetzAudit Technologies. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
