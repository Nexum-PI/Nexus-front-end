import { STORE, directionsLink, mapsEmbedUrl } from "../data/store";
import { Icon } from "./Icon";

// Mapa do Google incorporado com a localização da loja.
// Ocupa o mesmo espaço reservado (3:2) que antes era a foto do bloco da loja.
// O mapa recebe um filtro para combinar com o fundo escuro do site.
export function StoreMap() {
  const { address } = STORE;
  return (
    <figure className="v1-map">
      <iframe
        className="v1-map__frame"
        src={mapsEmbedUrl()}
        title={`Mapa: ${STORE.name}, ${address.street}, ${address.complement}, ${address.city}`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
      <figcaption className="v1-map__card">
        <span className="v1-map__pin" aria-hidden="true">
          <Icon name="pin" size={18} />
        </span>
        <span className="v1-map__text">
          <strong>{address.street}</strong>
          <span>
            {address.complement} · {address.city}
          </span>
        </span>
        <a
          href={directionsLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="v1-btn v1-btn--primary v1-btn--sm v1-map__go"
        >
          Traçar rota
          <Icon name="arrowUpRight" size={16} />
          <span className="v1-sr-only"> (abre o Google Maps em nova aba)</span>
        </a>
      </figcaption>
    </figure>
  );
}
