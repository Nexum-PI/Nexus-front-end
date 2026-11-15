import { useCallback, useMemo, useState } from "react";
import { AuthContext } from "./AuthContext";

// Sessão da equipe (atendentes, técnicos e administradores).
//
// IMPORTANTE: por enquanto o login é simulado e a sessão fica só no navegador.
// Isso apenas esconde o painel de quem não entrou; não é segurança de verdade.
// A proteção real vem do back-end: quando o auth-service existir, `login`
// passa a receber um token (JWT) da API, e a API recusa criar pedidos, listar
// clientes ou mudar status sem esse token.
const STORAGE_KEY = "nexum-v1-session";

const readSession = () => {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const writeSession = (session) => {
  try {
    if (session) sessionStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    else sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    /* armazenamento indisponível: a sessão vale só enquanto a página estiver aberta */
  }
};

export function AuthProvider({ children }) {
  const [session, setSession] = useState(readSession);

  const login = useCallback((email) => {
    const next = { email, startedAt: new Date().toISOString() };
    writeSession(next);
    setSession(next);
  }, []);

  const logout = useCallback(() => {
    writeSession(null);
    setSession(null);
  }, []);

  const value = useMemo(() => ({ session, login, logout }), [session, login, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
