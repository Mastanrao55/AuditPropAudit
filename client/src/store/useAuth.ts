import { useAppDispatch, useAppSelector } from "./hooks";
import { logout, loginAsync } from "./authSlice";

export function useAuth() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  const handleLogin = async (email: string, password: string) => {
    await dispatch(loginAsync({ email, password })).unwrap();
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return {
    user,
    isAuthenticated,
    login: handleLogin,
    logout: handleLogout,
  };
}

