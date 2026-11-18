import { useCallback, useEffect, useMemo, useState } from "react";
import { api, readStoredSession, setUnauthorizedHandler, storeSession } from "../api/client";
import { AuthContext } from "./AuthContext";

// Sessão da equipe com o token (JWT) emitido pelo auth-service.
// A API recusa qualquer ação da equipe sem esse token: a segurança está no back.
export function AuthProvider({ children }) {
  const [session, setSession] = useState(readStoredSession);

  const logout = useCallback(() => {
    storeSession(null);
    setSession(null);
  }, []);

  useEffect(() => {
    setUnauthorizedHandler(logout);
  }, [logout]);

  const login = useCallback(async (email, password) => {
    const data = await api("/api/auth/login", {
      method: "POST",
      body: { email, password },
      auth: false,
    });
    const next = {
      token: data.token,
      expiresAt: data.expiresAt,
      email: data.user.email,
      name: data.user.name,
      role: data.user.role,
    };
    storeSession(next);
    setSession(next);
    return next;
  }, []);

  const value = useMemo(() => ({ session, login, logout }), [session, login, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
