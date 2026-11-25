import { useRef } from "react";
import { Link } from "react-router-dom";
import { Icon } from "../components/Icon";
import { ImageSlot } from "../components/ImageSlot";
import { StoreCta } from "../components/StoreCta";
import { SiteLayout } from "../components/SiteLayout";
import { useReveal } from "../components/useReveal";
import { MEDIA } from "../data/media";
import { SERVICES, STEPS, findService } from "../data/services";
import "../styles/service.css";

// Página pública de cada serviço. Só apresenta o serviço e leva ao
// agendamento: abrir ordem de serviço é tarefa da equipe, dentro do painel.
export function ServicePage({ slug }) {
  const service = findService(slug);
  const others = SERVICES.filter((s) => s.slug !== slug);
  const pageRef = useRef(null);
  useReveal(pageRef, [slug]);

  return (
    <SiteLayout>
      <div ref={pageRef}>
        <section className="v1-svc-hero" aria-labelledby="v1-svc-title">
          <div className="v1-svc-hero__media">
            <ImageSlot slot={MEDIA.services[service.slug]} fill eager />
            <div className="v1-svc-hero__scrim" aria-hidden="true" />
          </div>
          <div className="v1-container v1-svc-hero__content">
            <Link to="/#servicos" className="v1-svc-back">
              <Icon name="arrowLeft" size={16} /> Todos os serviços
            </Link>
            <p className="v1-kicker">Serviço {service.number}</p>
            <h1 id="v1-svc-title" className="v1-display v1-svc-hero__title">
              {service.title}
            </h1>
            <p className="v1-svc-hero__line">{service.line}</p>
            <StoreCta />
          </div>
        </section>

        <div className="v1-theme-paper">
          <section className="v1-container v1-svc-detail" aria-labelledby="v1-svc-includes">
            <header className="v1-svc-detail__head" data-reveal>
              <p className="v1-kicker">O que está incluso</p>
              <h2 id="v1-svc-includes" className="v1-display v1-svc-detail__title">
                Cada etapa, feita à mão.
              </h2>
              <p className="v1-lead">
                O valor e o prazo são combinados na avaliação, com o tênis em mãos.
              </p>
            </header>
            <ol className="v1-svc-includes">
              {service.includes.map((item, index) => (
                <li key={item} data-reveal style={{ "--reveal-delay": `${index * 80}ms` }}>
                  <span className="v1-display v1-svc-includes__num" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {item}
                </li>
              ))}
            </ol>
          </section>

          <section
            className="v1-container v1-svc-flow"
            aria-labelledby="v1-svc-flow-title"
            data-reveal
          >
            <h2 id="v1-svc-flow-title" className="v1-kicker">
              Do balcão à entrega
            </h2>
            <ol className="v1-svc-flow__list">
              {STEPS.map((step) => (
                <li key={step.number}>
                  <span className="v1-svc-flow__num">{step.number}</span>
                  <span>{step.status}</span>
                </li>
              ))}
            </ol>
            <p className="v1-svc-flow__note">
              Você acompanha cada etapa pelo código do pedido, sem cadastro.{" "}
              <Link to="/acompanhar">Acompanhar pedido</Link>
            </p>
          </section>
        </div>

        <section className="v1-final v1-svc-final" aria-labelledby="v1-svc-final-title">
          <div className="v1-container v1-final__inner" data-reveal>
            <h2 id="v1-svc-final-title" className="v1-display v1-svc-final__title">
              Traga o par para avaliação.
            </h2>
            <StoreCta />
            <ul className="v1-svc-others" aria-label="Outros serviços">
              {others.map((s) => (
                <li key={s.slug}>
                  <Link to={s.path} className="v1-link-arrow">
                    {s.title} <Icon name="arrowRight" size={16} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </SiteLayout>
  );
}
