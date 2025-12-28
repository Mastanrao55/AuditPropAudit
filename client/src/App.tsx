import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Provider } from "react-redux";
import { store } from "@/store";
import { useEffect } from "react";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { PublicRoute } from "@/components/PublicRoute";
import NotFound from "@/pages/not-found";
import LandingPage from "@/pages/landing";
import Dashboard from "@/pages/dashboard";
import PropertyDetails from "@/pages/property-details";
import ReviewQueue from "@/pages/review-queue";
import Solutions from "@/pages/solutions";
import DataSources from "@/pages/data-sources";
import Pricing from "@/pages/pricing";
import APIPage from "@/pages/api";
import SignIn from "@/pages/sign-in";
import SignUp from "@/pages/sign-up";
import ForgotPassword from "@/pages/forgot-password";
import ResetPassword from "@/pages/reset-password";
import VerifyEmail from "@/pages/verify-email";
import AuditReports from "@/pages/audit-reports";
import Settings from "@/pages/settings";
import Contact from "@/pages/contact";
import News from "@/pages/news";
import AdminDashboard from "@/pages/admin";
import AdminUsers from "@/pages/admin-users";
import AuditorDashboard from "@/pages/auditor";
import VerificationHub from "@/pages/verification-hub";
import NRI from "@/pages/nri";
import MarketIntelligence from "@/pages/market-intelligence";
import FraudDetection from "@/pages/fraud-detection";
import ComprehensiveDashboard from "@/pages/comprehensive-dashboard";
import DocumentVerification from "@/pages/document-verification";
import LitigationSearch from "@/pages/litigation-search";
import TitleVerification from "@/pages/title-verification";
import DeveloperAuditDashboard from "@/pages/developer-audit-dashboard";
import NRISolutions from "@/pages/nri-solutions";
import RERADashboard from "@/pages/rera-dashboard";
import ECDashboard from "@/pages/ec-dashboard";
import PropertyValuation from "@/pages/property-valuation";
import Blog from "@/pages/blog";
import BlogArticle from "@/pages/blog-article";
import HTMLSitemap from "@/pages/html-sitemap";

// Component to sync localStorage with server session on mount
// Server session is the source of truth - localStorage is just a backup
function AuthRestorer() {
  useEffect(() => {
    // Validate server session and sync localStorage on mount
    const syncAuthState = async () => {
      try {
        const response = await fetch("/api/auth/user", {
          credentials: "include",
        });
        
        if (response.ok) {
          const user = await response.json();
          // Update localStorage with server session data
          const userData = {
            id: user.id,
            email: user.email,
            fullName: user.fullName,
            role: user.role,
          };
          localStorage.setItem("auth-user", JSON.stringify(userData));
        } else if (response.status === 401) {
          // Server session is invalid - clear localStorage
          localStorage.removeItem("auth-user");
        }
      } catch (error) {
        // Network error - keep localStorage as backup
        // ProtectedRoute will handle validation
        console.error("Failed to sync auth state:", error);
      }
    };

    syncAuthState();
  }, []); // Only run once on mount

  return null;
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/news" element={<News />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:slug" element={<BlogArticle />} />
      <Route path="/html-sitemap" element={<HTMLSitemap />} />
      <Route path="/solutions" element={<Solutions />} />
      <Route path="/nri-solutions" element={<NRISolutions />} />
      <Route path="/data-sources" element={<DataSources />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/api" element={<APIPage />} />
      {/* Auth-related public routes - redirect logged-in users away */}
      <Route
        path="/sign-in"
        element={
          <PublicRoute>
            <SignIn />
          </PublicRoute>
        }
      />
      <Route
        path="/sign-up"
        element={
          <PublicRoute>
            <SignUp />
          </PublicRoute>
        }
      />
      <Route
        path="/forgot-password"
        element={
          <PublicRoute>
            <ForgotPassword />
          </PublicRoute>
        }
      />
      <Route
        path="/reset-password"
        element={
          <PublicRoute>
            <ResetPassword />
          </PublicRoute>
        }
      />
      <Route
        path="/verify-email"
        element={
          <PublicRoute>
            <VerifyEmail />
          </PublicRoute>
        }
      />

      {/* Protected Routes - Require Authentication */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/verification"
        element={
          <ProtectedRoute>
            <VerificationHub />
          </ProtectedRoute>
        }
      />
      <Route
        path="/review"
        element={
          <ProtectedRoute>
            <ReviewQueue />
          </ProtectedRoute>
        }
      />
      <Route
        path="/reports"
        element={
          <ProtectedRoute>
            <AuditReports />
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />
      <Route
        path="/nri"
        element={
          <ProtectedRoute>
            <NRI />
          </ProtectedRoute>
        }
      />
      <Route
        path="/market"
        element={
          <ProtectedRoute>
            <MarketIntelligence />
          </ProtectedRoute>
        }
      />
      <Route
        path="/fraud"
        element={
          <ProtectedRoute>
            <FraudDetection />
          </ProtectedRoute>
        }
      />
      <Route
        path="/documents"
        element={
          <ProtectedRoute>
            <DocumentVerification />
          </ProtectedRoute>
        }
      />
      <Route
        path="/litigation"
        element={
          <ProtectedRoute>
            <LitigationSearch />
          </ProtectedRoute>
        }
      />
      <Route
        path="/title"
        element={
          <ProtectedRoute>
            <TitleVerification />
          </ProtectedRoute>
        }
      />
      <Route
        path="/developer-audit"
        element={
          <ProtectedRoute>
            <DeveloperAuditDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/rera"
        element={
          <ProtectedRoute>
            <RERADashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/ec"
        element={
          <ProtectedRoute>
            <ECDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/valuation"
        element={
          <ProtectedRoute>
            <PropertyValuation />
          </ProtectedRoute>
        }
      />
      <Route
        path="/features"
        element={
          <ProtectedRoute>
            <ComprehensiveDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/property/:id"
        element={
          <ProtectedRoute>
            <PropertyDetails />
          </ProtectedRoute>
        }
      />

      {/* Admin-only Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/users"
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminUsers />
          </ProtectedRoute>
        }
      />

      {/* Auditor-only Routes */}
      <Route
        path="/auditor"
        element={
          <ProtectedRoute requiredRole="auditor">
            <AuditorDashboard />
          </ProtectedRoute>
        }
      />

      {/* 404 Not Found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <AuthRestorer />
          <TooltipProvider>
            <Toaster />
            <AppRoutes />
          </TooltipProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
