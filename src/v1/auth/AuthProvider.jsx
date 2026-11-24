import { useCallback, useEffect, useMemo, useState } from "react";
import { api, readStoredSession, setUnauthorizedHandler, storeSession } from "../api/client";
import { AuthContext } from "./AuthContext";

// Sessão (equipe ou cliente) com o token (JWT) emitido pelo auth-service.
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

  const open = (data) => {
    const next = {
      token: data.token,
      expiresAt: data.expiresAt,
      email: data.user.email,
      name: data.user.name,
      role: data.user.role,
      phone: data.user.phone ?? "",
      cep: data.user.cep ?? "",
    };
    storeSession(next);
    setSession(next);
    return next;
  };

  const login = useCallback(async (email, password) => {
    const data = await api("/api/auth/login", {
      method: "POST",
      body: { email, password },
      auth: false,
    });
    return open(data);
  }, []);

  // Cadastro público: cria uma conta de cliente pendente. A pessoa só entra depois de abrir
  // o link enviado por e-mail (confirm), que já devolve o login.
  const register = useCallback(
    (payload) => api("/api/auth/register", { method: "POST", body: payload, auth: false }),
    [],
  );

  const confirmEmail = useCallback(async (token) => {
    const data = await api("/api/auth/confirm", { method: "POST", body: { token }, auth: false });
    return open(data);
  }, []);

  const resendConfirmation = useCallback(
    (email) =>
      api("/api/auth/resend-confirmation", { method: "POST", body: { email }, auth: false }),
    [],
  );

  const saveProfile = useCallback(async ({ name, phone, cep }) => {
    const user = await api("/api/auth/me", { method: "PUT", body: { name, phone, cep } });
    setSession((current) => {
      const next = { ...current, name: user.name, phone: user.phone, cep: user.cep };
      storeSession(next);
      return next;
    });
    return user;
  }, []);

  const changePassword = useCallback(
    (currentPassword, newPassword) =>
      api("/api/auth/me/password", { method: "PATCH", body: { currentPassword, newPassword } }),
    [],
  );

  const value = useMemo(
    () => ({
      session, login, register, confirmEmail, resendConfirmation, saveProfile, changePassword, logout,
    }),
    [session, login, register, confirmEmail, resendConfirmation, saveProfile, changePassword, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
