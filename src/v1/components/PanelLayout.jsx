import { useCallback, useEffect, useId, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import { Icon } from "./Icon";
import { Sidebar } from "./Sidebar";
import "../styles/site.css";
import "../styles/panel.css";

const THEME_KEY = "nexum-v1-panel-theme";

const readTheme = () => {
  try {
    return localStorage.getItem(THEME_KEY) === "dark" ? "dark" : "light";
  } catch {
    return "light";
  }
};

// Moldura das telas da equipe: sidebar (gaveta no celular), topbar com busca
// opcional, alternância de tema e saída da sessão.
export function PanelLayout({ active, search, onSearch, searchPlaceholder, children }) {
  const { session, logout } = useAuth();
  const navigate = useNavigate();
  const [theme, setTheme] = useState(readTheme);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const searchId = useId();
  const sidebarId = useId();

  useEffect(() => {
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {
      /* armazenamento indisponível: o tema vale só nesta visita */
    }
  }, [theme]);

  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  // Iniciais a partir do nome do e-mail (parte antes do @)
  const initials = (session?.name || session?.email?.split("@")[0] || "EQ")
    .split(/\s+/)
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="v1 v1-panel" data-theme={theme}>
      <a href="#conteudo-painel" className="v1-skip">
        Pular para o conteúdo
      </a>
      <Sidebar
        id={sidebarId}
        open={drawerOpen}
        onClose={closeDrawer}
        onLogout={handleLogout}
        active={active}
        isAdmin={session?.role === "ADMIN"}
      />

      <div className="v1-panel__main">
        <header className="v1-topbar">
          <button
            type="button"
            className="v1-icon-btn v1-topbar__menu"
            aria-label="Abrir menu"
            aria-expanded={drawerOpen}
            aria-controls={sidebarId}
            onClick={() => setDrawerOpen(true)}
          >
            <Icon name="menu" size={20} />
          </button>

          {onSearch ? (
            <div className="v1-topbar__search">
              <label htmlFor={searchId} className="v1-sr-only">
                {searchPlaceholder}
              </label>
              <Icon name="search" size={18} />
              <input
                id={searchId}
                type="search"
                value={search}
                onChange={(e) => onSearch(e.target.value)}
                placeholder={searchPlaceholder}
                autoComplete="off"
              />
            </div>
          ) : (
            <span className="v1-topbar__spacer" />
          )}

          <button
            type="button"
            className="v1-icon-btn"
            onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
            aria-label={theme === "dark" ? "Usar tema claro" : "Usar tema escuro"}
            aria-pressed={theme === "dark"}
          >
            <Icon name={theme === "dark" ? "sun" : "moon"} size={18} />
          </button>
          <span className="v1-topbar__user" title={session?.email}>
            <span aria-hidden="true">{initials}</span>
            <span className="v1-sr-only">Conectado como {session?.email}</span>
          </span>
        </header>

        <main id="conteudo-painel" className="v1-panel__content" tabIndex={-1}>
          {children}
        </main>
      </div>
    </div>
  );
}
