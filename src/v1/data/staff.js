// Funcionários (perfis do auth-service: ADMIN, ATTENDANT e TECHNICIAN).
// Por enquanto ficam só na memória do navegador. Quando o auth-service
// existir, o StaffProvider passa a ler e gravar pela API.

export const ROLES = {
  ADMIN: { label: "Administrador", tone: "yellow" },
  ATTENDANT: { label: "Atendente", tone: "blue" },
  TECHNICIAN: { label: "Técnico", tone: "green" },
};

export const ROLE_KEYS = Object.keys(ROLES);

// Exemplos para a demonstração (nomes fictícios)
export const SAMPLE_STAFF = [
  { id: "f1", name: "Administrador da loja", email: "admin@acasadotenis.com.br", role: "ADMIN", active: true },
  { id: "f2", name: "Atendente de exemplo", email: "atendimento@acasadotenis.com.br", role: "ATTENDANT", active: true },
  { id: "f3", name: "Técnico de exemplo", email: "bancada@acasadotenis.com.br", role: "TECHNICIAN", active: true },
];
