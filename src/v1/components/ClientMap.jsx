import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { REGIONS, cepOf, regionOfCep } from "../data/analytics";

// Mapa real de São Paulo (OpenStreetMap, gratuito e sem chave) com um círculo
// por região: quanto mais clientes, maior e mais forte o círculo.
// As posições são o centro aproximado de cada região; quando o pedido tiver
// coordenadas reais (geocodificação do CEP no back-end), dá para marcar cada cliente.
const CENTERS = {
  centro: [-23.548, -46.638],
  oeste: [-23.565, -46.705],
  sul: [-23.625, -46.665],
  norte: [-23.485, -46.63],
  leste: [-23.545, -46.515],
  abc: [-23.665, -46.535],
  grande: [-23.533, -46.79],
};
const STORE = { pos: [-23.5569, -46.662], label: "A Casa do Tênis · Av. Paulista, 2001" };

export function ClientMap({ orders }) {
  const mapRef = useRef(null);

  const counts = {};
  orders.forEach((order) => {
    const region = regionOfCep(cepOf(order));
    if (region && CENTERS[region.key]) counts[region.key] = (counts[region.key] ?? 0) + 1;
  });
  const key = JSON.stringify(counts);

  useEffect(() => {
    const data = JSON.parse(key);
    const max = Math.max(1, ...Object.values(data));
    const map = L.map(mapRef.current, {
      center: [-23.56, -46.64],
      zoom: 11,
      scrollWheelZoom: false,
      attributionControl: true,
    });
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18,
      attribution: "© OpenStreetMap",
    }).addTo(map);

    Object.entries(data).forEach(([region, count]) => {
      const intensity = count / max;
      const label = REGIONS.find((r) => r.key === region)?.label ?? region;
      L.circle(CENTERS[region], {
        radius: 1500 + intensity * 3500,
        color: "#8a6d22",
        weight: 1,
        fillColor: "#c9a24a",
        fillOpacity: 0.25 + intensity * 0.45,
      })
        .bindTooltip(`${label}: ${count} ${count === 1 ? "cliente" : "clientes"}`, {
          permanent: true,
          direction: "center",
          className: "v1-map-tip",
        })
        .addTo(map);
    });

    L.circleMarker(STORE.pos, {
      radius: 7,
      color: "#c9a24a",
      weight: 3,
      fillColor: "#14283d",
      fillOpacity: 1,
    })
      .bindTooltip(STORE.label, { direction: "top" })
      .addTo(map);

    return () => map.remove();
  }, [key]);

  const total = Object.values(counts).reduce((a, b) => a + b, 0);

  return (
    <div className="v1-clientmap">
      <div
        ref={mapRef}
        className="v1-clientmap__map"
        role="img"
        aria-label={`Mapa de clientes por região. ${Object.entries(counts)
          .map(([r, c]) => `${REGIONS.find((x) => x.key === r)?.label}: ${c}`)
          .join(", ")}.`}
      />
      <p className="v1-clientmap__foot">
        {total} {total === 1 ? "cliente localizado" : "clientes localizados"} pelo CEP · ponto azul
        = loja
      </p>
    </div>
  );
}
