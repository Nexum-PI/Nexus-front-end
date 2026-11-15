import { Link } from "react-router-dom";
import { MEDIA } from "../data/media";
import { Icon } from "./Icon";
import { ImageSlot } from "./ImageSlot";

// Painel de serviço em largura total. `reverse` alterna o lado da imagem.
export function ServicePanel({ service, reverse = false }) {
  const titleId = `v1-service-${service.slug}`;
  return (
    <article
      className={`v1-service ${reverse ? "v1-service--reverse" : ""}`}
      aria-labelledby={titleId}
      data-reveal
    >
      <Link to={service.path} className="v1-service__media" tabIndex={-1} aria-hidden="true">
        <ImageSlot slot={MEDIA.services[service.slug]} sizes="(max-width: 900px) 100vw, 60vw" />
      </Link>

      <div className="v1-service__body">
        <span className="v1-display v1-service__number" aria-hidden="true">
          {service.number}
        </span>
        <h3 id={titleId} className="v1-display v1-service__title">
          {service.title}
        </h3>
        <p className="v1-service__line">{service.line}</p>
        <Link to={service.path} className="v1-link-arrow">
          Ver detalhes <Icon name="arrowRight" size={16} />
          <span className="v1-sr-only"> de {service.title}</span>
        </Link>
      </div>
    </article>
  );
}
