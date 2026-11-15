import { useEffect, useId, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { STORE } from "../data/store";
import { Icon } from "./Icon";
import { ScheduleButton } from "./ScheduleButton";
import { Wordmark } from "./Wordmark";

const LINKS = [
  { to: "/#servicos", label: "Serviços" },
  { to: "/#como-funciona", label: "Como funciona" },
  { to: "/#depoimentos", label: "Depoimentos" },
];

export function AnnouncementBar() {
  return (
    <div className="v1-announce">
      <p className="v1-container">{STORE.announcement}</p>
    </div>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const close = () => setOpen(false);

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
          <NavLink to="/login" className="v1-nav__link">
            Área da equipe
          </NavLink>
        </nav>

        <div className="v1-nav__actions">
          <ScheduleButton size="sm" className="v1-nav__cta" />
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
              <Link to="/login" onClick={close} className="v1-nav__drawer-link">
                Área da equipe
              </Link>
            </li>
          </ul>
          <ScheduleButton className="v1-btn--block" />
        </nav>
      </div>
    </header>
  );
}
