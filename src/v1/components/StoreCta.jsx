import { STORE, directionsLink } from "../data/store";
import { Icon } from "./Icon";

// CTA principal do site: leva o cliente até a loja.
// Abre a rota no Google Maps (no celular, o app) e mostra o endereço logo abaixo.
// Endereço e texto de busca do mapa ficam em STORE.address (src/v1/data/store.js).
export function StoreCta({ label = "Como chegar à loja", className = "" }) {
  const { address } = STORE;

  return (
    <div className={`v1-store-cta ${className}`.trim()}>
      <a
        href={directionsLink()}
        className="v1-btn v1-btn--primary"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icon name="pin" size={18} />
        {label}
        <span className="v1-sr-only"> (abre o Google Maps em nova aba)</span>
      </a>
      <p className="v1-store-cta__address">
        {address.street} · {address.complement} · {address.city}
      </p>
    </div>
  );
}
