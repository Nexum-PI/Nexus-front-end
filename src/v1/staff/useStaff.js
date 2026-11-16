import { useContext } from "react";
import { StaffContext } from "./StaffContext";

export function useStaff() {
  const context = useContext(StaffContext);
  if (!context) throw new Error("useStaff deve ser usado dentro de <StaffProvider>.");
  return context;
}
