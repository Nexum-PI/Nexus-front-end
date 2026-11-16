import { REGIONS, cepOf, regionOfCep } from "../data/analytics";

// Mapa de calor de clientes por região de São Paulo, a partir do CEP.
// As regiões ficam dispostas como no mapa da cidade (norte em cima, sul embaixo).
// Cada bloco mostra o número de clientes, então a leitura não depende só da cor.
const LAYOUT = ["grande", "norte", "", "oeste", "centro", "leste", "", "sul", "abc"];

export function RegionHeatmap({ orders }) {
  const counts = {};
  let noCep = 0;
  orders.forEach((order) => {
    const region = regionOfCep(cepOf(order));
    if (!region) noCep += 1;
    else counts[region.key] = (counts[region.key] ?? 0) + 1;
  });
  const max = Math.max(1, ...Object.values(counts));
  const labelOf = (key) => REGIONS.find((r) => r.key === key)?.label ?? key;
  const top = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];

  return (
    <div className="v1-heat">
      <div className="v1-heat__grid" role="list" aria-label="Clientes por região">
        {LAYOUT.map((key, i) =>
          key ? (
            <div
              key={key}
              role="listitem"
              className="v1-heat__cell"
              style={{ "--heat": (counts[key] ?? 0) / max }}
            >
              <span className="v1-heat__name">{labelOf(key)}</span>
              <span className="v1-heat__count">
                {counts[key] ?? 0}
                <span className="v1-sr-only"> clientes</span>
              </span>
            </div>
          ) : (
            <span key={`vazio-${i}`} aria-hidden="true" />
          ),
        )}
      </div>
      <div className="v1-heat__foot">
        <span className="v1-heat__scale" aria-hidden="true">
          menos <i /> mais
        </span>
        <span>
          {top ? `Mais clientes: ${labelOf(top[0])}` : "Sem CEP cadastrado"}
          {counts.outras ? ` · ${counts.outras} de outras cidades` : ""}
          {noCep ? ` · ${noCep} sem CEP` : ""}
        </span>
      </div>
    </div>
  );
}
