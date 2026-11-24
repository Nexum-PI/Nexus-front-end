import { Navigate, useLocation } from "react-router-dom";
import { isStaffRole } from "./roles";
import { useAuth } from "./useAuth";

// Envolve a área do cliente. Sem sessão vai para o login; equipe volta para o painel.
export function RequireClient({ children }) {
  const { session } = useAuth();
  const location = useLocation();

  if (!session) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  if (isStaffRole(session.role)) {
    return <Navigate to="/gerenciamento" replace />;
  }
  return children;
}
