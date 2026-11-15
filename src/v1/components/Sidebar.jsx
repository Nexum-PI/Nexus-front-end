import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Icon } from "./Icon";
import { Wordmark } from "./Wordmark";

const ITEMS = [
  { href: "#visao-geral", label: "Visão geral", icon: "grid" },
  { href: "#ordens", label: "Ordens de serviço", icon: "list" },
  { to: "/#servicos", label: "Nova ordem", icon: "plus" },
  { to: "/acompanhar", label: "Acompanhar pedido", icon: "track" },
];

// Sidebar fixa no desktop; no celular vira gaveta (drawer) com fundo escurecido.
export function Sidebar({ id, open, onClose, active = "#visao-geral" }) {
  const closeRef = useRef(null);

  // Ao abrir a gaveta, o foco vai para o botão de fechar; Esc fecha.
  useEffect(() => {
    if (!open) return undefined;
    closeRef.current?.focus();
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <>
      <div
        className={`v1-sidebar__overlay ${open ? "is-open" : ""}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside id={id} className={`v1-sidebar ${open ? "is-open" : ""}`} aria-label="Menu do painel">
        <div className="v1-sidebar__head">
          <Wordmark size={36} sub="Painel da equipe" />
          <button
            type="button"
            ref={closeRef}
            className="v1-sidebar__close"
            onClick={onClose}
            aria-label="Fechar menu"
          >
            <Icon name="close" size={20} />
          </button>
        </div>

        <nav className="v1-sidebar__nav">
          <ul>
            {ITEMS.map((item) => {
              const content = (
                <>
                  <Icon name={item.icon} size={18} />
                  {item.label}
                </>
              );
              const isActive = item.href === active;
              return (
                <li key={item.label}>
                  {item.href ? (
                    <a
                      href={item.href}
                      className={`v1-sidebar__link ${isActive ? "is-active" : ""}`}
                      aria-current={isActive ? "location" : undefined}
                      onClick={onClose}
                    >
                      {content}
                    </a>
                  ) : (
                    <Link to={item.to} className="v1-sidebar__link">
                      {content}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="v1-sidebar__foot">
          <Link to="/login" className="v1-sidebar__link">
            <Icon name="logout" size={18} />
            Sair
          </Link>
        </div>
      </aside>
    </>
  );
}
