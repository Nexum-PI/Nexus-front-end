import { STATUS } from "../../data/orders";
import { STATUS_TONE } from "../data/statusUi";

// Chip de status do pedido. Para os avisos derivados do prazo
// (Atrasado / Prazo próximo) use `tone` e `children`.
export function StatusChip({ status, tone, children }) {
  const finalTone = tone ?? STATUS_TONE[status] ?? "gray";
  return (
    <span className={`v1-chip v1-tone--${finalTone}`}>
      {children ?? STATUS[status]?.label ?? status}
    </span>
  );
}
