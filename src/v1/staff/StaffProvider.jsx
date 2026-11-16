import { useCallback, useMemo, useState } from "react";
import { SAMPLE_STAFF } from "../data/staff";
import { StaffContext } from "./StaffContext";

// Cadastro de funcionários em memória (sobrevive à navegação entre telas).
// Quando o auth-service existir, estas funções chamam a API.
export function StaffProvider({ children }) {
  const [staff, setStaff] = useState(SAMPLE_STAFF);

  const saveMember = useCallback((member) => {
    setStaff((current) =>
      member.id
        ? current.map((m) => (m.id === member.id ? { ...m, ...member } : m))
        : [...current, { ...member, id: `f${Date.now()}`, active: true }],
    );
  }, []);

  const toggleActive = useCallback((id) => {
    setStaff((current) => current.map((m) => (m.id === id ? { ...m, active: !m.active } : m)));
  }, []);

  const value = useMemo(() => ({ staff, saveMember, toggleActive }), [staff, saveMember, toggleActive]);
  return <StaffContext.Provider value={value}>{children}</StaffContext.Provider>;
}
