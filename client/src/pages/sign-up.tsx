import { Link, useLocation } from "wouter";
import { useState } from "react";
import { SEO, seoData } from "@/components/seo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Shield, ArrowRight, Mail, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

export default function SignUp() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [success, setSuccess] = useState(false);
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const { register, registerPending } = useAuth();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName || !email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
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
      await register({
        email,
        password,
        fullName,
        phoneNumber: phoneNumber || undefined,
      });
      setSuccess(true);
    } catch (error: any) {
      toast({
        title: "Registration Failed",
        description: error?.message || error?.data?.error || "An error occurred. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
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
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <Mail className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold">Check Your Email</h2>
                <p className="text-muted-foreground">
                  We've sent a verification link to <strong>{email}</strong>. 
                  Please check your inbox and click the link to verify your account.
                </p>
                <div className="pt-4 space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => navigate("/sign-in")}
                    data-testid="button-goto-signin"
                  >
                    Go to Sign In
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
      <SEO {...seoData.signUp} />
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
              <CardTitle>Create Account</CardTitle>
              <CardDescription>
                Sign up to access the AssetzAudit property due-diligence platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="John Doe"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    disabled={registerPending}
                    data-testid="input-fullname"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={registerPending}
                    data-testid="input-email"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number (Optional)</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    disabled={registerPending}
                    data-testid="input-phone"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password *</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="At least 8 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={registerPending}
                    data-testid="input-password"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password *</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Re-enter your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={registerPending}
                    data-testid="input-confirm-password"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full gap-2" 
                  disabled={registerPending} 
                  data-testid="button-signup"
                >
                  {registerPending ? "Creating Account..." : "Create Account"} 
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </form>

              <div className="mt-6 text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link href="/sign-in">
                  <span className="text-primary hover:underline cursor-pointer" data-testid="link-signin">
                    Sign in
                  </span>
                </Link>
              </div>
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
