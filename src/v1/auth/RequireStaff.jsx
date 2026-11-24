import { Navigate, useLocation } from "react-router-dom";
import { isStaffRole } from "./roles";
import { useAuth } from "./useAuth";

// Envolve as telas da equipe. Sem sessão, manda para o login e, depois de
// entrar, a pessoa volta para a tela que tentou abrir.
// `roles` restringe a tela a alguns perfis (ex.: Equipe só para ADMIN);
// quem não tem o perfil vai para a visão geral do painel.
export function RequireStaff({ children, roles }) {
  const { session } = useAuth();
  const location = useLocation();

  if (!session) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  // Cliente logado não entra no painel: vai para a área dele
  if (!isStaffRole(session.role)) {
    return <Navigate to="/minha-conta" replace />;
  }
  if (roles && !roles.includes(session.role)) {
    return <Navigate to="/gerenciamento" replace />;
  }
  return children;
}
