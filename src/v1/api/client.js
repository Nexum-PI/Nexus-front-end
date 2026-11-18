// Cliente da API do NEXUM (gateway do back-end).
// Endereço configurável em .env do front: VITE_API_URL (padrão http://localhost:8080).

export const API_URL = (import.meta.env.VITE_API_URL ?? "http://localhost:8080").replace(/\/$/, "");

const TOKEN_KEY = "nexum-v1-session";

export const readStoredSession = () => {
  try {
    const raw = sessionStorage.getItem(TOKEN_KEY);
    const session = raw ? JSON.parse(raw) : null;
    if (!session?.token) return null;
    if (session.expiresAt && new Date(session.expiresAt) <= new Date()) return null;
    return session;
  } catch {
    return null;
  }
};

export const storeSession = (session) => {
  try {
    if (session) sessionStorage.setItem(TOKEN_KEY, JSON.stringify(session));
    else sessionStorage.removeItem(TOKEN_KEY);
  } catch {
    /* sem armazenamento: a sessão vale só enquanto a página estiver aberta */
  }
};

/** Erro da API com status HTTP e mensagem em português (vinda do back quando houver). */
export class ApiError extends Error {
  constructor(status, message, fields) {
    super(message);
    this.status = status;
    this.fields = fields ?? {};
  }
}

// Avisado quando o token vence ou é recusado (o AuthProvider faz logout)
let onUnauthorized = () => {};
export const setUnauthorizedHandler = (fn) => {
  onUnauthorized = fn;
};

export async function api(path, { method = "GET", body, auth = true } = {}) {
  const headers = { Accept: "application/json" };
  if (body !== undefined) headers["Content-Type"] = "application/json";
  const session = auth ? readStoredSession() : null;
  if (session?.token) headers.Authorization = `Bearer ${session.token}`;

  let response;
  try {
    response = await fetch(`${API_URL}${path}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new ApiError(0, `Não foi possível conectar à API (${API_URL}). Confira se o back-end está rodando.`);
  }

  if (response.status === 204) return null;
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    if (response.status === 401 && auth && session) onUnauthorized();
    const fields = data?.errors;
    const first = fields && Object.values(fields)[0];
    const message =
      first ?? data?.detail ?? data?.title ?? (response.status === 403 ? "Acesso não permitido para o seu perfil." : `Erro ${response.status}`);
    throw new ApiError(response.status, message, fields);
  }
  return data;
}
