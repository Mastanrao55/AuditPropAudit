import React, { createContext, useContext, useState, ReactNode } from "react";

interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "user" | "auditor" | "nri_user";
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    // Mock authentication - in a real app, this would call your backend
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        // Mock user creation based on email
        let role: "admin" | "user" | "auditor" | "nri_user" = "user";
        if (email === "admin@auditprop.com") role = "admin";
        else if (email === "auditor@auditprop.com") role = "auditor";
        else if (email === "nri@auditprop.com") role = "nri_user";
        
        const mockUser: User = {
          id: Math.random().toString(36).substr(2, 9),
          email,
          name: email.split("@")[0].charAt(0).toUpperCase() + email.split("@")[0].slice(1),
          role,
        };
        setUser(mockUser);
        localStorage.setItem("auth-user", JSON.stringify(mockUser));
        resolve();
      }, 800);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("auth-user");
  };

  // Restore user from localStorage on mount
  React.useEffect(() => {
    const storedUser = localStorage.getItem("auth-user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem("auth-user");
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
