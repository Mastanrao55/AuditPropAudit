import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "user" | "auditor" | "nri_user";
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
};

// Restore user from localStorage
const loadUserFromStorage = (): User | null => {
  try {
    const storedUser = localStorage.getItem("auth-user");
    if (storedUser) {
      return JSON.parse(storedUser);
    }
  } catch (e) {
    localStorage.removeItem("auth-user");
  }
  return null;
};

// Initialize state from localStorage
const storedUser = loadUserFromStorage();
if (storedUser) {
  initialState.user = storedUser;
  initialState.isAuthenticated = true;
}

// Async thunk for login
export const loginAsync = createAsyncThunk(
  "auth/login",
  async (credentials: { email: string; password: string }) => {
    // Mock authentication - in a real app, this would call your backend
    return new Promise<User>((resolve) => {
      setTimeout(() => {
        // Mock user creation based on email
        let role: "admin" | "user" | "auditor" | "nri_user" = "user";
        if (credentials.email === "admin@auditprop.com") role = "admin";
        else if (credentials.email === "auditor@auditprop.com") role = "auditor";
        else if (credentials.email === "nri@auditprop.com") role = "nri_user";
        
        const mockUser: User = {
          id: Math.random().toString(36).substr(2, 9),
          email: credentials.email,
          name: credentials.email.split("@")[0].charAt(0).toUpperCase() + credentials.email.split("@")[0].slice(1),
          role,
        };
        resolve(mockUser);
      }, 800);
    });
  }
);

// Async thunk for logout
export const logoutAsync = createAsyncThunk(
  "auth/logout",
  async () => {
    const response = await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: "Logout failed" }));
      throw new Error(error.error || "Logout failed");
    }

    return await response.json();
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("auth-user");
    },
    restoreUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        // Login is pending
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        localStorage.setItem("auth-user", JSON.stringify(action.payload));
      })
      .addCase(loginAsync.rejected, (state) => {
        // Handle login error if needed
      })
      .addCase(logoutAsync.pending, (state) => {
        // Logout is pending
      })
      .addCase(logoutAsync.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        localStorage.removeItem("auth-user");
      })
      .addCase(logoutAsync.rejected, (state) => {
        // Even if API call fails, clear local state
        state.user = null;
        state.isAuthenticated = false;
        localStorage.removeItem("auth-user");
      });
  },
});

export const { logout, restoreUser } = authSlice.actions;
export default authSlice.reducer;

