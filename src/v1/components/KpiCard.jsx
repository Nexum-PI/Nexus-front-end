// Cartão de indicador do painel: rótulo, número grande e uma linha de apoio.
// `tone` destaca o número (ex.: "red" para atrasados) sem depender só da cor:
// o rótulo sempre diz o que o número significa.
export function KpiCard({ label, value, hint, tone }) {
  return (
    <article className={`v1-kpi ${tone ? `v1-kpi--${tone}` : ""}`}>
      <h3 className="v1-kpi__label">{label}</h3>
      <p className="v1-kpi__value">{value}</p>
      {hint && <p className="v1-kpi__hint">{hint}</p>}
    </article>
  );
}
