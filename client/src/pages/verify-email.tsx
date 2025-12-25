import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function VerifyEmail() {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [errorMessage, setErrorMessage] = useState("");
  const [, navigate] = useLocation();
  const { verifyEmail } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    
    if (!token) {
      setStatus("error");
      setErrorMessage("Invalid verification link.");
      return;
    }

    verifyEmail(token)
      .then(() => {
        setStatus("success");
      })
      .catch((error) => {
        setStatus("error");
        setErrorMessage(error?.message || "Failed to verify email. The link may be expired.");
      });
  }, [verifyEmail]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="container mx-auto px-4 py-6">
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
            {status === "loading" && (
              <div className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
                </div>
                <h2 className="text-2xl font-bold">Verifying Email</h2>
                <p className="text-muted-foreground">
                  Please wait while we verify your email address...
                </p>
              </div>
            )}

            {status === "success" && (
              <div className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold">Email Verified!</h2>
                <p className="text-muted-foreground">
                  Your email has been successfully verified. You can now sign in to your account.
                </p>
                <div className="pt-4">
                  <Link href="/sign-in">
                    <Button className="w-full" data-testid="button-goto-signin">
                      Go to Sign In
                    </Button>
                  </Link>
                </div>
              </div>
            )}

            {status === "error" && (
              <div className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertCircle className="h-8 w-8 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold">Verification Failed</h2>
                <p className="text-muted-foreground">
                  {errorMessage}
                </p>
                <div className="pt-4 space-y-3">
                  <Link href="/sign-in">
                    <Button variant="outline" className="w-full" data-testid="button-goto-signin">
                      Go to Sign In
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      <footer className="border-t border-border py-12 bg-card">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 AssetzAudit Technologies. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
