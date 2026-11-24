import { Link } from "react-router-dom";
import { Icon } from "./Icon";
import { ImageSlot } from "./ImageSlot";
import { Wordmark } from "./Wordmark";
import { MEDIA } from "../data/media";
import "../styles/site.css";
import "../styles/login.css";

// Etapas do card de demonstração (mesma sequência do acompanhamento do cliente)
const DEMO_STEPS = ["Recebido", "Higienização", "Pronto", "Entregue"];

// Moldura das telas de entrada (login e cadastro): foto + card animado à esquerda,
// formulário à direita.
export function AuthShell({ children, demoNote }) {
  return (
    <div className="v1 v1-site v1-login">
      <aside className="v1-login__media" aria-label="A Casa do Tênis">
        <ImageSlot slot={MEDIA.login} fill eager showLabel={false} />
        <div className="v1-login__veil" aria-hidden="true" />
        <div className="v1-login__sweep" aria-hidden="true" />

        <div className="v1-login__media-copy">
          <p className="v1-kicker v1-login__rise" style={{ "--d": "100ms" }}>
            Bancada
          </p>
          <p className="v1-display v1-login__quote v1-login__rise" style={{ "--d": "220ms" }}>
            Cada par registrado. Cada etapa visível.
          </p>

          {/* Card de demonstração: o cliente acompanha assim */}
          <div
            className="v1-login__demo v1-login__rise"
            style={{ "--d": "420ms" }}
            role="img"
            aria-label="Exemplo do acompanhamento de um pedido, passando de recebido a entregue"
          >
            <div className="v1-login__demo-head">
              <span className="v1-mono v1-login__demo-code">NX-2026-000123</span>
              <span className="v1-login__demo-chip">
                {DEMO_STEPS.map((label, i) => (
                  <span key={label} className={`v1-login__demo-chip-text is-${i + 1}`}>
                    {label}
                  </span>
                ))}
              </span>
            </div>
            <div className="v1-login__demo-track">
              <span className="v1-login__demo-fill" />
              {DEMO_STEPS.map((label, i) => (
                <span key={label} className={`v1-login__demo-dot is-${i + 1}`}>
                  <i />
                  <b>{label}</b>
                </span>
              ))}
            </div>
            <p className="v1-login__demo-note">
              <Icon name="track" size={14} /> {demoNote}
            </p>
          </div>
        </div>
      </aside>

      <main className="v1-login__main">
        <div className="v1-login__top">
          <Wordmark />
          <Link to="/" className="v1-login__back">
            <Icon name="arrowLeft" size={16} /> Voltar ao site
          </Link>
        </div>

        <div className="v1-login__panel">
          {children}
        </div>
      </main>
    </div>
  );
}
