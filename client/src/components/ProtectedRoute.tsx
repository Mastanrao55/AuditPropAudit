import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: "admin" | "user" | "auditor" | "nri_user";
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

export function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
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
  // Validate both server session AND localStorage
  const hasValidServerSession = isAuthenticated && user;
  const hasLocalStorageAuth = localStorageUser !== null;

  // If server session is invalid, clear localStorage and redirect
  if (!hasValidServerSession) {
    if (hasLocalStorageAuth) {
      // Server session invalid but localStorage exists - clear it
      localStorage.removeItem("auth-user");
      setLocalStorageUser(null);
    }
    return <Navigate to="/sign-in" replace />;
  }

  // Server session is valid - validate localStorage matches
  // If localStorage doesn't match, it will be synced by useEffect above
  const currentUser = user;

  // If role is required, check if user has the required role
  if (requiredRole && currentUser.role !== requiredRole) {
    // Redirect based on user role
    if (currentUser.role === "admin") {
      return <Navigate to="/admin" replace />;
    } else if (currentUser.role === "auditor") {
      return <Navigate to="/auditor" replace />;
    }
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}

