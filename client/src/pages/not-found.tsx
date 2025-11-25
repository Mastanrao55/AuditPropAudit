import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, Home } from "lucide-react";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md mx-4">
        <CardContent className="pt-6 space-y-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-8 w-8 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">404 Page Not Found</h1>
              <p className="mt-2 text-sm text-gray-600">
                The page you're looking for doesn't exist. Please check the URL or navigate back home.
              </p>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button asChild className="w-full gap-2">
              <Link href="/">
                <Home className="h-4 w-4" />
                Go Home
              </Link>
            </Button>
            <Button variant="outline" asChild className="w-full">
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
