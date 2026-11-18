// Funcionários (perfis do auth-service: ADMIN, ATTENDANT e TECHNICIAN).
// Os dados vêm do auth-service (/api/staff).

export const ROLES = {
  ADMIN: { label: "Administrador", tone: "yellow" },
  ATTENDANT: { label: "Atendente", tone: "blue" },
  TECHNICIAN: { label: "Técnico", tone: "green" },
};

export const ROLE_KEYS = Object.keys(ROLES);
