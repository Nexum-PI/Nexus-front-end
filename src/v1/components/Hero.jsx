import { Link } from "react-router-dom";
import { MEDIA } from "../data/media";
import { PROOF } from "../data/store";
import { Icon } from "./Icon";
import { ImageSlot } from "./ImageSlot";
import { StoreCta } from "./StoreCta";

// Hero em largura total: a foto ocupa a maior parte da dobra e o texto fica
// sobreposto no canto inferior. O espaço da foto é fixo (proporção em media.js),
// então trocar o bloco temporário pela foto não muda a composição.
export function Hero() {
  return (
    <section className="v1-hero" aria-labelledby="v1-hero-title">
      <div className="v1-hero__media">
        <ImageSlot slot={MEDIA.hero} fill eager showLabel />
        <div className="v1-hero__scrim" aria-hidden="true" />
      </div>

      <div className="v1-container v1-hero__content">
        <p className="v1-kicker">Cuidado de colecionador</p>
        <h1 id="v1-hero-title" className="v1-display v1-hero__title">
          Seu tênis,
          <br />
          como novo.
        </h1>
        <p className="v1-hero__lead">
          Higienização, restauração, solado e customização feitos à mão. Um par por vez.
        </p>
        <div className="v1-hero__actions">
          <StoreCta />
          <Link to="/acompanhar" className="v1-link-arrow">
            Acompanhar pedido <Icon name="arrowRight" size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

export function ProofStrip() {
  return (
    <section className="v1-proof" aria-label="A loja em números">
      <dl className="v1-container v1-proof__list">
        {PROOF.map((item) => (
          <div key={item.label} className="v1-proof__item" data-reveal>
            <dt className="v1-proof__label">{item.label}</dt>
            <dd className="v1-display v1-proof__value">{item.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
