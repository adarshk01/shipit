import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useAuthStore } from "../store/store";

export function AuthInitializer() {
  const { isAuthenticated, isLoading, user } = useAuth0();
  const setUser = useAuthStore((s: any) => s.setUser);

  useEffect(() => {
    if (isLoading) return;

    if (isAuthenticated && user) {
      setUser(user);
    } else {
    }
  }, [isAuthenticated, isLoading, user]);
  return null;
}
