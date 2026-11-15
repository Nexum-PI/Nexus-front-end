import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./useAuth";

// Envolve as telas da equipe. Sem sessão, manda para o login e, depois de
// entrar, a pessoa volta para a tela que tentou abrir.
export function RequireStaff({ children }) {
  const { session } = useAuth();
  const location = useLocation();

  if (!session) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return children;
}
