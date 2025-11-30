import { Link, useLocation, useSearch } from "wouter";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Shield, CheckCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [token, setToken] = useState("");
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const { resetPassword, resetPasswordPending } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tokenParam = params.get("token");
    if (tokenParam) {
      setToken(tokenParam);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      toast({
        title: "Error",
        description: "Invalid reset link. Please request a new one.",
        variant: "destructive",
      });
      return;
    }

    if (!password || !confirmPassword) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match.",
        variant: "destructive",
      });
      return;
    }

    if (password.length < 8) {
      toast({
        title: "Error",
        description: "Password must be at least 8 characters long.",
        variant: "destructive",
      });
      return;
    }

    try {
      await resetPassword({ token, password });
      setSuccess(true);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.message || "Failed to reset password. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <header className="container mx-auto px-4 py-6">
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
              <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight">AuditProp</span>
            </div>
          </Link>
        </header>

        <main className="flex-1 flex items-center justify-center py-12 px-4">
          <Card className="w-full max-w-md border-muted">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertCircle className="h-8 w-8 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold">Invalid Reset Link</h2>
                <p className="text-muted-foreground">
                  This password reset link is invalid or has expired. Please request a new one.
                </p>
                <div className="pt-4">
                  <Link href="/forgot-password">
                    <Button className="w-full" data-testid="button-request-new">
                      Request New Link
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <header className="container mx-auto px-4 py-6">
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
              <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight">AuditProp</span>
            </div>
          </Link>
        </header>

        <main className="flex-1 flex items-center justify-center py-12 px-4">
          <Card className="w-full max-w-md border-muted">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold">Password Reset</h2>
                <p className="text-muted-foreground">
                  Your password has been successfully reset. You can now sign in with your new password.
                </p>
                <div className="pt-4">
                  <Link href="/sign-in">
                    <Button className="w-full" data-testid="button-goto-signin">
                      Go to Sign In
                    </Button>
                  </Link>
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
      <header className="container mx-auto px-4 py-6">
        <Link href="/">
          <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
            <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight">AuditProp</span>
          </div>
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <Card className="border-muted">
            <CardHeader className="space-y-2">
              <CardTitle>Reset Your Password</CardTitle>
              <CardDescription>
                Enter your new password below
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="password">New Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="At least 8 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={resetPasswordPending}
                    data-testid="input-password"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Re-enter your new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={resetPasswordPending}
                    data-testid="input-confirm-password"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={resetPasswordPending}
                  data-testid="button-reset-password"
                >
                  {resetPasswordPending ? "Resetting..." : "Reset Password"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="border-t border-border py-12 bg-card">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 AuditProp Technologies. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
