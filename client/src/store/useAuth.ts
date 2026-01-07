import { useAppDispatch, useAppSelector } from "./hooks";
import { logout, loginAsync, logoutAsync } from "./authSlice";
import { resetRootState } from "./index";

export function useAuth() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const handleLogin = async (email: string, password: string) => {
    await dispatch(loginAsync({ email, password })).unwrap();
  };

  const handleLogout = async () => {
    try {
      await dispatch(logoutAsync()).unwrap();
      // Reset all Redux state
      dispatch(resetRootState());
      window.location.reload();
    } catch (error) {
      // If API call fails, still clear local state and reset Redux
      dispatch(logout());
      dispatch(resetRootState());
      window.location.reload();
      console.error("Logout error:", error);
    }
  };

  return {
    user,
    isAuthenticated,
    login: handleLogin,
    logout: handleLogout,
  };
}

