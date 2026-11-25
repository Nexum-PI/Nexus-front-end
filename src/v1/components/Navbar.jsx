import { useEffect, useId, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { homeFor } from "../auth/roles";
import { useAuth } from "../auth/useAuth";
import { Icon } from "./Icon";
import { Wordmark } from "./Wordmark";

const LINKS = [
  { to: "/#servicos", label: "Serviços" },
  { to: "/#como-funciona", label: "Como funciona" },
  { to: "/#depoimentos", label: "Depoimentos" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const close = () => setOpen(false);
  // Visitante: Entrar. Cliente: Minha conta. Equipe: Painel.
  const { session } = useAuth();
  const account = session
    ? { to: homeFor(session.role), label: session.role === "CLIENT" ? "Minha conta" : "Painel" }
    : { to: "/login", label: "Entrar" };

  // Esc fecha o menu; com o menu aberto a página não rola por trás.
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.documentElement.classList.add("v1-no-scroll");
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.classList.remove("v1-no-scroll");
    };
  }, [open]);

  return (
    <header className={`v1-nav ${open ? "is-open" : ""}`}>
      <div className="v1-container v1-nav__bar">
        <Wordmark />

        <nav className="v1-nav__links" aria-label="Principal">
          {LINKS.map((link) => (
            <Link key={link.to} to={link.to} className="v1-nav__link">
              {link.label}
            </Link>
          ))}
          <NavLink to={account.to} className="v1-nav__link">
            {account.label}
          </NavLink>
        </nav>

        <div className="v1-nav__actions">
          <button
            type="button"
            className="v1-nav__toggle"
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <Icon name={open ? "close" : "menu"} size={22} />
          </button>
        </div>
      </div>

      <div id={menuId} className="v1-nav__drawer" hidden={!open}>
        <nav className="v1-container" aria-label="Menu do celular">
          <ul className="v1-nav__drawer-list">
            {LINKS.map((link) => (
              <li key={link.to}>
                <Link to={link.to} onClick={close} className="v1-nav__drawer-link">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/acompanhar" onClick={close} className="v1-nav__drawer-link">
                Acompanhar pedido
              </Link>
            </li>
            <li>
              <Link to={account.to} onClick={close} className="v1-nav__drawer-link">
                {account.label}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
