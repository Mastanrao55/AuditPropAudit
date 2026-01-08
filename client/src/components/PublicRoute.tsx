import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useState, useEffect } from "react";

interface PublicRouteProps {
  children: React.ReactNode;
  redirectTo?: string; // Optional custom redirect path
}

// Helper to get user from localStorage
function getUserFromLocalStorage() {
  try {
    const storedUser = localStorage.getItem("auth-user");
    if (storedUser) {
      return JSON.parse(storedUser);
    }
  } catch (e) {
    localStorage.removeItem("auth-user");
  }
  return null;
}

// Helper to get appropriate dashboard based on user role
function getDashboardForRole(role: string): string {
  switch (role) {
    case "admin":
      return "/admin";
    case "auditor":
      return "/auditor";
    default:
      return "/dashboard";
  }
}

export function PublicRoute({ children, redirectTo }: PublicRouteProps) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const [localStorageUser, setLocalStorageUser] = useState(getUserFromLocalStorage());

  // Sync localStorage with server session
  useEffect(() => {
    if (user && isAuthenticated) {
      // Update localStorage when server session is valid
      const userData = {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
      };
      localStorage.setItem("auth-user", JSON.stringify(userData));
      setLocalStorageUser(userData);
    } else if (!isLoading && !user) {
      // Clear localStorage if server session is invalid
      localStorage.removeItem("auth-user");
      setLocalStorageUser(null);
    }
  }, [user, isAuthenticated, isLoading]);

  // Show loading state while checking authentication
  if (isLoading) {
    return null; // Or return a loading spinner component
  }

  // Server session is the source of truth (as defined in routes.ts)
  // Check both server session AND localStorage
  const hasValidServerSession = isAuthenticated && user;
  const hasLocalStorageAuth = localStorageUser !== null;

  // If user is authenticated (via server session or localStorage), redirect away
  if (hasValidServerSession || hasLocalStorageAuth) {
    const currentUser = user || localStorageUser;
    const redirectPath = redirectTo || getDashboardForRole(currentUser?.role || "user");
    return <Navigate to={redirectPath} replace />;
  }

  // User is not authenticated - allow access to public route
  return <>{children}</>;
}

