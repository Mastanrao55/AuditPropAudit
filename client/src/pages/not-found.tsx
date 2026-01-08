import { Button } from "@/components/ui/button";
import { Shield, Home, Search, ArrowLeft, FileQuestion } from "lucide-react";
import { Link } from "react-router-dom";
import { SEO, seoData } from "@/components/seo";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEO {...seoData.notFound} />
      
      <header className="container mx-auto px-4 py-6 flex items-center justify-between">
        <Link to="/">
          <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
            <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight">AssetzAudit</span>
          </div>
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center px-4">
        <div className="max-w-lg text-center space-y-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center opacity-5">
              <span className="text-[200px] font-bold">404</span>
            </div>
            <div className="relative z-10 flex flex-col items-center space-y-4">
              <div className="h-24 w-24 bg-muted rounded-full flex items-center justify-center">
                <FileQuestion className="h-12 w-12 text-muted-foreground" />
              </div>
              <h1 className="text-4xl font-bold">Page Not Found</h1>
            </div>
          </div>
          
          <p className="text-lg text-muted-foreground">
            The page you're looking for doesn't exist or has been moved. 
            Please check the URL or use the navigation below.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="gap-2" asChild>
              <Link to="/">
                <Home className="h-4 w-4" />
                Go to Home
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="gap-2" asChild>
              <Link to="/dashboard">
                <Search className="h-4 w-4" />
                Property Search
              </Link>
            </Button>
          </div>

          <div className="pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground mb-4">Popular pages you might be looking for:</p>
            <div className="flex flex-wrap justify-center gap-2">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/solutions">Solutions</Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/pricing">Pricing</Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/blog">Blog</Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/contact">Contact</Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/sign-in">Sign In</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-border py-8 bg-card">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 AssetzAudit Technologies. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
