import { Link } from "react-router-dom";
import { SCHEDULE } from "../data/store";
import { Icon } from "./Icon";

// CTA principal. O destino vem de SCHEDULE (src/v1/data/store.js):
// link externo (WhatsApp) hoje, rota interna no futuro.
export function ScheduleButton({ size = "lg", className = "", label = SCHEDULE.label }) {
  const classes = [
    "v1-btn",
    "v1-btn--primary",
    size === "sm" && "v1-btn--sm",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      {label}
      <Icon name="arrowUpRight" size={size === "sm" ? 16 : 18} />
    </>
  );

  if (SCHEDULE.href.startsWith("/")) {
    return (
      <Link to={SCHEDULE.href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <a
      href={SCHEDULE.href}
      className={classes}
      target="_blank"
      rel="noopener noreferrer"
    >
      {content}
      <span className="v1-sr-only"> (abre o WhatsApp em nova aba)</span>
    </a>
  );
}
