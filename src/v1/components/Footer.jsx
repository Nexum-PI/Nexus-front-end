import { Link } from "react-router-dom";
import { SERVICES } from "../data/services";
import { STORE, mapsLink, whatsappLink } from "../data/store";
import { Wordmark } from "./Wordmark";

export function Footer() {
  const year = new Date().getFullYear();
  const { address } = STORE;

  return (
    <footer className="v1-footer">
      <div className="v1-container">
        <div className="v1-footer__grid">
          <div className="v1-footer__brand">
            <Wordmark size={44} />
            <p>
              Higienização, restauração, troca de solado e customização. Um par por vez.
            </p>
          </div>

          <nav className="v1-footer__col" aria-label="Serviços">
            <h2 className="v1-footer__title">Serviços</h2>
            <ul>
              {SERVICES.map((service) => (
                <li key={service.slug}>
                  <Link to={service.path}>{service.title}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="v1-footer__col">
            <h2 className="v1-footer__title">Loja</h2>
            <ul>
              <li>
                <a href={mapsLink()} target="_blank" rel="noopener noreferrer">
                  {address.street} · {address.complement}
                </a>
              </li>
              <li>{address.city}</li>
              <li>
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                  WhatsApp <span className="v1-nowrap">{STORE.whatsappDisplay}</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${STORE.email}`}>{STORE.email}</a>
              </li>
              {STORE.instagram && (
                <li>
                  <a href={STORE.instagram} target="_blank" rel="noopener noreferrer">
                    Instagram
                  </a>
                </li>
              )}
            </ul>
          </div>

          <nav className="v1-footer__col" aria-label="Equipe e pedidos">
            <h2 className="v1-footer__title">Pedidos e conta</h2>
            <ul>
              <li>
                <Link to="/acompanhar">Acompanhar pedido</Link>
              </li>
              <li>
                <Link to="/cadastro">Criar conta</Link>
              </li>
              <li>
                <Link to="/login">Entrar</Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="v1-footer__bottom">
          <span>
            © {year} {STORE.name}
          </span>
          <span className="v1-mono">{STORE.system}</span>
        </div>
      </div>
    </footer>
  );
}
