import { STATUS, STATUS_KEYS } from "../../data/orders";
import { STATUS_CHART_COLOR } from "../data/statusUi";

const pct = (part, total) => (total ? Math.round((part / total) * 100) : 0);

// Rosca de pedidos por status. A legenda traz nome, quantidade e porcentagem,
// então a leitura não depende só da cor.
export function StatusDonut({ orders }) {
  const total = orders.length;
  const rows = STATUS_KEYS.map((key) => ({
    key,
    label: STATUS[key].label,
    count: orders.filter((o) => o.status === key).length,
    color: STATUS_CHART_COLOR[key],
  }));

  // circunferência 100 (r = 15.915) facilita o cálculo dos arcos;
  // offset 25 começa o primeiro arco no topo
  const arcs = rows
    .filter((row) => row.count > 0)
    .reduce((acc, row) => {
      const size = (row.count / total) * 100;
      const used = acc.reduce((sum, arc) => sum + arc.size, 0);
      return [...acc, { ...row, size, offset: 25 - used }];
    }, []);

  const summary = rows
    .filter((r) => r.count)
    .map((r) => `${r.label}: ${r.count}`)
    .join(", ");

  return (
    <div className="v1-donut">
      <svg viewBox="0 0 42 42" className="v1-donut__svg" role="img" aria-label={`Pedidos por status. ${summary}.`}>
        <circle cx="21" cy="21" r="15.915" fill="none" className="v1-donut__track" strokeWidth="5" />
        {arcs.map((arc) => (
          <circle
            key={arc.key}
            cx="21"
            cy="21"
            r="15.915"
            fill="none"
            stroke={arc.color}
            strokeWidth="5"
            strokeDasharray={`${Math.max(arc.size - 0.6, 0)} ${100 - Math.max(arc.size - 0.6, 0)}`}
            strokeDashoffset={arc.offset}
          />
        ))}
        <text x="21" y="20.5" textAnchor="middle" className="v1-donut__total">
          {total}
        </text>
        <text x="21" y="28" textAnchor="middle" className="v1-donut__caption">
          pedidos
        </text>
      </svg>

      <ul className="v1-legend">
        {rows.map((row) => (
          <li key={row.key} className={row.count ? "" : "is-zero"}>
            <span className="v1-legend__swatch" style={{ background: row.color }} aria-hidden="true" />
            <span className="v1-legend__label">{row.label}</span>
            <span className="v1-legend__value">
              {row.count} <span className="v1-legend__pct">· {pct(row.count, total)}%</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Barras horizontais: quantos itens de cada serviço estão nos pedidos.
export function ServiceBars({ orders, services }) {
  const counts = services.map((service) => ({
    label: service.title,
    count: orders.reduce(
      (sum, order) => sum + order.items.filter((item) => item.service === service.title).length,
      0,
    ),
  }));
  const max = Math.max(1, ...counts.map((c) => c.count));

  return (
    <ul className="v1-bars">
      {counts.map((row) => (
        <li key={row.label} className="v1-bars__row">
          <span className="v1-bars__label">{row.label}</span>
          <span className="v1-bars__track" aria-hidden="true">
            <span className="v1-bars__fill" style={{ width: `${(row.count / max) * 100}%` }} />
          </span>
          <span className="v1-bars__value">
            {row.count}
            <span className="v1-sr-only"> {row.count === 1 ? "item" : "itens"}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}
