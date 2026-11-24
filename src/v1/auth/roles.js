// Perfis que o auth-service devolve. CLIENT é conta de cliente; os demais são da equipe.
export const STAFF_ROLES = ["ADMIN", "ATTENDANT", "TECHNICIAN"];
export const isStaffRole = (role) => STAFF_ROLES.includes(role);
// Para onde cada perfil vai depois de entrar
export const homeFor = (role) => (isStaffRole(role) ? "/gerenciamento" : "/minha-conta");
