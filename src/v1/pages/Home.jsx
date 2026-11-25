import { useRef } from "react";
import { Link } from "react-router-dom";
import { BeforeAfterCarousel } from "../components/BeforeAfter";
import { Hero, ProofStrip } from "../components/Hero";
import { Icon } from "../components/Icon";
import { StoreCta } from "../components/StoreCta";
import { ServicePanel } from "../components/ServicePanel";
import { SiteLayout } from "../components/SiteLayout";
import { StoreMap } from "../components/StoreMap";
import { TestimonialCard } from "../components/TestimonialCard";
import { useReveal } from "../components/useReveal";
import { MEDIA } from "../data/media";
import { SERVICES, STEPS } from "../data/services";
import { STORE, mapsLink, whatsappLink } from "../data/store";
import { TESTIMONIALS } from "../data/testimonials";
import "../styles/home.css";

export function Home() {
  const pageRef = useRef(null);
  useReveal(pageRef);

  return (
    <SiteLayout>
      <div ref={pageRef}>
        <Hero />
        <ProofStrip />

        {/* 01 · Serviços */}
        <section
          id="servicos"
          className="v1-section v1-theme-paper"
          aria-labelledby="v1-servicos-title"
        >
          <div className="v1-container">
            <header className="v1-section-head" data-reveal>
              <p className="v1-kicker">Serviços</p>
              <h2 id="v1-servicos-title" className="v1-display v1-section-title">
                Quatro serviços. Um padrão.
              </h2>
              <p className="v1-lead">
                Cada par passa por avaliação antes de qualquer produto encostar nele.
              </p>
            </header>
            <div className="v1-services">
              {SERVICES.map((service, index) => (
                <ServicePanel key={service.slug} service={service} reverse={index % 2 === 1} />
              ))}
            </div>
          </div>
        </section>

        {/* 02 · Antes e depois */}
        <section className="v1-section v1-section--raised" aria-labelledby="v1-ba-title">
          <div className="v1-container">
            <header className="v1-section-head" data-reveal>
              <p className="v1-kicker">Antes e depois</p>
              <h2 id="v1-ba-title" className="v1-display v1-section-title">
                O resultado fala.
              </h2>
              <p className="v1-lead">
                Arraste a linha para comparar. Use as setas para ver mais casos.
              </p>
            </header>
            <BeforeAfterCarousel items={MEDIA.beforeAfter} />
          </div>
        </section>

        {/* 03 · Como funciona */}
        <section
          id="como-funciona"
          className="v1-section v1-theme-paper"
          aria-labelledby="v1-steps-title"
        >
          <div className="v1-container">
            <header className="v1-section-head" data-reveal>
              <p className="v1-kicker">Como funciona</p>
              <h2 id="v1-steps-title" className="v1-display v1-section-title">
                Do balcão à entrega.
              </h2>
            </header>
            <ol className="v1-steps">
              {STEPS.map((step, index) => (
                <li
                  key={step.number}
                  className="v1-step"
                  data-reveal
                  style={{ "--reveal-delay": `${index * 90}ms` }}
                >
                  <span className="v1-display v1-step__number" aria-hidden="true">
                    {step.number}
                  </span>
                  <h3 className="v1-step__title">{step.status}</h3>
                  <p className="v1-step__text">{step.text}</p>
                </li>
              ))}
            </ol>
            <p className="v1-steps__note" data-reveal>
              <Icon name="track" size={18} />
              Você acompanha cada etapa pela sua conta ou, se preferir, só com o código do pedido.
            </p>
          </div>
        </section>

        {/* 04 · Depoimentos */}
        <section
          id="depoimentos"
          className="v1-section v1-theme-cream"
          aria-labelledby="v1-quotes-title"
        >
          <div className="v1-container">
            <header className="v1-section-head" data-reveal>
              <p className="v1-kicker">Depoimentos</p>
              <h2 id="v1-quotes-title" className="v1-display v1-section-title">
                Quem já deixou o par aqui.
              </h2>
            </header>
            <div className="v1-quotes">
              {TESTIMONIALS.map((testimonial, index) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* 05 · Crie sua conta */}
        <section className="v1-section v1-account" aria-labelledby="v1-account-title">
          <div className="v1-container v1-account__inner">
            <div className="v1-account__lead" data-reveal>
              <p className="v1-kicker">Sua conta</p>
              <h2 id="v1-account-title" className="v1-display v1-section-title">
                Cada par na palma da mão.
              </h2>
              <p className="v1-lead">
                Crie sua conta gratuita e acompanhe todos os seus pedidos em um só lugar.
              </p>
            </div>

            <div className="v1-account__side" data-reveal>
              <ol className="v1-account__perks">
                <li>
                  <span className="v1-display" aria-hidden="true">
                    01
                  </span>
                  <p>
                    <strong>Andamento em tempo real.</strong> Veja em que etapa está cada tênis.
                  </p>
                </li>
                <li>
                  <span className="v1-display" aria-hidden="true">
                    02
                  </span>
                  <p>
                    <strong>Aviso na hora certa.</strong> Saiba quando o par ficar pronto.
                  </p>
                </li>
                <li>
                  <span className="v1-display" aria-hidden="true">
                    03
                  </span>
                  <p>
                    <strong>Histórico completo.</strong> Todos os seus serviços sempre à mão.
                  </p>
                </li>
              </ol>

              <div className="v1-account__actions">
                <Link to="/cadastro" className="v1-btn v1-btn--primary">
                  Criar minha conta
                  <Icon name="arrowRight" size={18} />
                </Link>
                <Link to="/login" className="v1-btn v1-btn--outline">
                  Já tenho conta
                </Link>
              </div>

              <p className="v1-account__alt">
                Prefere não criar conta?{" "}
                <Link to="/acompanhar">Consulte seu pedido pelo código</Link>
              </p>
            </div>
          </div>
        </section>

        {/* 06 · A loja */}
        <section className="v1-section v1-theme-paper" aria-labelledby="v1-store-title">
          <div className="v1-container v1-store">
            <div className="v1-store__media" data-reveal>
              <StoreMap />
            </div>
            <div className="v1-store__body" data-reveal>
              <p className="v1-kicker">A loja</p>
              <h2 id="v1-store-title" className="v1-display v1-section-title">
                Venha conhecer a bancada.
              </h2>
              <dl className="v1-store__info">
                <div>
                  <dt>
                    <Icon name="pin" size={18} /> Endereço
                  </dt>
                  <dd>
                    {STORE.address.street} · {STORE.address.complement}
                    <br />
                    {STORE.address.city}
                    {STORE.address.zip && ` · CEP ${STORE.address.zip}`}
                  </dd>
                </div>
                <div>
                  <dt>
                    <Icon name="clock" size={18} /> Horário
                  </dt>
                  <dd>
                    <ul className="v1-store__hours">
                      {STORE.hours.map((row) => (
                        <li key={row.days}>
                          <span>{row.days}</span>
                          <span>{row.time}</span>
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
                <div>
                  <dt>
                    <Icon name="chat" size={18} /> Contato
                  </dt>
                  <dd>
                    <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                      {STORE.whatsappDisplay}
                    </a>
                    <br />
                    <a href={`mailto:${STORE.email}`}>{STORE.email}</a>
                  </dd>
                </div>
              </dl>
              <a
                href={mapsLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="v1-link-arrow"
              >
                Como chegar <Icon name="arrowUpRight" size={16} />
              </a>
            </div>
          </div>
        </section>

        {/* 07 · CTA final */}
        <section className="v1-final" aria-labelledby="v1-final-title">
          <div className="v1-container v1-final__inner" data-reveal>
            <p className="v1-kicker">Visite a loja</p>
            <h2 id="v1-final-title" className="v1-display v1-final__title">
              Traga o par.
              <br />
              Nós cuidamos do resto.
            </h2>
            <p className="v1-lead">Avaliação na loja e prazo combinado antes de começar.</p>
            <StoreCta />
          </div>
        </section>
      </div>
    </SiteLayout>
  );
}
