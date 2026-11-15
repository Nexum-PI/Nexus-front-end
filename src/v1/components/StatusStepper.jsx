import { STATUS, formatDateTime } from "../../data/orders";
import { STEP_OF_STATUS } from "../data/statusUi";
import { Icon } from "./Icon";

// Etapas fixas (mesma ordem do "Como funciona"). A etapa 2 mostra o nome real
// do status quando o pedido já passou por ela (higienização ou restauração).
const STEPS = [
  { keys: ["RECEIVED"], label: "Recebido" },
  { keys: ["CLEANING", "RESTORING"], label: "Higienização ou restauração" },
  { keys: ["READY"], label: "Pronto para retirada/entrega" },
  { keys: ["DELIVERED"], label: "Entregue" },
];

// Última vez que o pedido entrou em uma das etapas, segundo o histórico.
const lastEntry = (history, keys) =>
  [...history].reverse().find((entry) => keys.includes(entry.status)) ?? null;

export function StatusStepper({ order }) {
  const canceled = order.status === "CANCELED";
  const current = canceled ? -1 : STEP_OF_STATUS[order.status];

  return (
    <div className="v1-stepper-wrap">
      <ol className={`v1-stepper ${canceled ? "is-canceled" : ""}`}>
        {STEPS.map((step, index) => {
          const entry = lastEntry(order.history, step.keys);
          const state = canceled
            ? "idle"
            : index < current
              ? "done"
              : index === current
                ? "current"
                : "idle";
          const label =
            entry && step.keys.length > 1 ? STATUS[entry.status].label : step.label;

          return (
            <li
              key={step.label}
              className={`v1-stepper__step is-${state}`}
              aria-current={state === "current" ? "step" : undefined}
            >
              <span className="v1-stepper__dot" aria-hidden="true">
                {state === "done" ? <Icon name="check" size={14} strokeWidth={2.5} /> : index + 1}
              </span>
              <span className="v1-stepper__text">
                <span className="v1-stepper__label">{label}</span>
                <span className="v1-stepper__date">
                  {entry && state !== "idle" ? formatDateTime(entry.changedAt) : "Aguardando"}
                </span>
              </span>
              <span className="v1-sr-only">
                {state === "done" ? " (concluída)" : state === "current" ? " (etapa atual)" : ""}
              </span>
            </li>
          );
        })}
      </ol>
      {canceled && (
        <p className="v1-stepper__canceled">Este pedido foi cancelado. Fale com a loja.</p>
      )}
    </div>
  );
}
