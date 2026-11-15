import { useCallback, useEffect, useId, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useOrders } from "../../context/useOrders";
import {
  ACTIVE_STATUS,
  STATUS,
  STATUS_KEYS,
  formatDate,
  isDueSoon,
  isLate,
} from "../../data/orders";
import { ServiceBars, StatusDonut } from "../components/Charts";
import { Icon } from "../components/Icon";
import { KpiCard } from "../components/KpiCard";
import { Sidebar } from "../components/Sidebar";
import { StatusChip } from "../components/StatusChip";
import { SERVICES } from "../data/services";
import { STATUS_TONE } from "../data/statusUi";
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

// Filtros da tabela: status do banco + avisos derivados do prazo.
const FILTERS = [
  { value: "ALL", label: "Todos os status" },
  ...STATUS_KEYS.map((key) => ({ value: key, label: STATUS[key].label })),
  { value: "LATE", label: "Atrasados" },
  { value: "DUE_SOON", label: "Prazo próximo" },
];

export function Management() {
  const { orders, changeStatus } = useOrders();

  // "Hoje" fixo na abertura do painel; usado para calcular atrasos e prazos próximos
  const [today] = useState(() => new Date());
  const [theme, setTheme] = useState(readTheme);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const searchId = useId();
  const filterId = useId();
  const sidebarId = useId();

  useEffect(() => {
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {
      /* armazenamento indisponível: o tema vale só nesta visita */
    }
  }, [theme]);

  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  // Atrasado e prazo próximo são derivados da previsão de entrega (expected_at),
  // não são status gravados no banco.
  const kpis = useMemo(
    () => ({
      total: orders.length,
      emAndamento: orders.filter((p) => ACTIVE_STATUS.includes(p.status)).length,
      prazoProximo: orders.filter((p) => isDueSoon(p, today)).length,
      atrasados: orders.filter((p) => isLate(p, today)).length,
      entregues: orders.filter((p) => p.status === "DELIVERED").length,
    }),
    [orders, today],
  );

  // Em andamento primeiro, pelos prazos mais curtos; depois os demais
  const sorted = useMemo(
    () =>
      [...orders].sort((a, b) => {
        const aAtivo = ACTIVE_STATUS.includes(a.status);
        const bAtivo = ACTIVE_STATUS.includes(b.status);
        if (aAtivo !== bAtivo) return aAtivo ? -1 : 1;
        return a.expectedAt.localeCompare(b.expectedAt);
      }),
    [orders],
  );

  const visible = useMemo(() => {
    const term = search.trim().toLowerCase();
    return sorted.filter((order) => {
      const matchesTerm =
        !term ||
        order.code.toLowerCase().includes(term) ||
        order.customerName.toLowerCase().includes(term);
      const matchesStatus =
        statusFilter === "ALL" ||
        (statusFilter === "LATE" && isLate(order, today)) ||
        (statusFilter === "DUE_SOON" && isDueSoon(order, today)) ||
        order.status === statusFilter;
      return matchesTerm && matchesStatus;
    });
  }, [sorted, search, statusFilter, today]);

  const handleStatusChange = (code, status) => {
    changeStatus(code, status, "Status atualizado pela equipe");
  };

  const todayLabel = today.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
  });

  return (
    <div className="v1 v1-panel" data-theme={theme}>
      <a href="#visao-geral" className="v1-skip">
        Pular para o conteúdo
      </a>
      <Sidebar id={sidebarId} open={drawerOpen} onClose={closeDrawer} />

      <div className="v1-panel__main">
        {/* Topbar */}
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

          <div className="v1-topbar__search">
            <label htmlFor={searchId} className="v1-sr-only">
              Buscar por código ou cliente
            </label>
            <Icon name="search" size={18} />
            <input
              id={searchId}
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por código ou cliente"
              autoComplete="off"
            />
          </div>

          <button
            type="button"
            className="v1-icon-btn"
            onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
            aria-label={theme === "dark" ? "Usar tema claro" : "Usar tema escuro"}
            aria-pressed={theme === "dark"}
          >
            <Icon name={theme === "dark" ? "sun" : "moon"} size={18} />
          </button>
          <span className="v1-topbar__user" aria-label="Equipe conectada">
            EQ
          </span>
        </header>

        <main id="visao-geral" className="v1-panel__content" tabIndex={-1}>
          <div className="v1-panel__head">
            <div>
              <p className="v1-kicker">Painel da equipe</p>
              <h1 className="v1-panel__title">Visão geral</h1>
              <p className="v1-panel__date">{todayLabel}</p>
            </div>
            {/* Leva às páginas de serviço, onde a equipe abre a ordem */}
            <Link to="/#servicos" className="v1-btn v1-btn--primary">
              <Icon name="plus" size={18} />
              Nova ordem
            </Link>
          </div>

          {/* KPIs */}
          <section className="v1-kpis" aria-label="Indicadores">
            <KpiCard label="Total de pedidos" value={kpis.total} hint="no sistema" />
            <KpiCard
              label="Em andamento"
              value={kpis.emAndamento}
              hint="recebidos, em higienização ou restauração"
            />
            <KpiCard
              label="Prazo próximo"
              value={kpis.prazoProximo}
              hint="vencem em até 2 dias"
              tone={kpis.prazoProximo ? "orange" : undefined}
            />
            <KpiCard
              label="Atrasados"
              value={kpis.atrasados}
              hint="previsão de entrega já passou"
              tone={kpis.atrasados ? "red" : undefined}
            />
            <KpiCard label="Entregues" value={kpis.entregues} hint="concluídos" tone="green" />
          </section>

          {/* Gráficos */}
          <section className="v1-charts" aria-label="Gráficos">
            <article className="v1-card">
              <header className="v1-card__head">
                <h2 className="v1-card__title">Pedidos por status</h2>
              </header>
              <StatusDonut orders={orders} />
            </article>
            <article className="v1-card">
              <header className="v1-card__head">
                <h2 className="v1-card__title">Itens por serviço</h2>
                <span className="v1-card__meta">quantidade de pares</span>
              </header>
              <ServiceBars orders={orders} services={SERVICES} />
            </article>
          </section>

          {/* Tabela */}
          <section id="ordens" className="v1-card v1-orders" aria-labelledby="v1-orders-title">
            <header className="v1-orders__head">
              <div>
                <h2 id="v1-orders-title" className="v1-card__title">
                  Ordens de serviço
                </h2>
                <p className="v1-card__meta" aria-live="polite">
                  {visible.length} de {orders.length} {orders.length === 1 ? "ordem" : "ordens"}
                </p>
              </div>
              <div className="v1-orders__filter">
                <label htmlFor={filterId} className="v1-label">
                  Filtrar
                </label>
                <select
                  id={filterId}
                  className="v1-input v1-select"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  {FILTERS.map((f) => (
                    <option key={f.value} value={f.value}>
                      {f.label}
                    </option>
                  ))}
                </select>
              </div>
            </header>

            <div className="v1-table-wrap">
              <table className="v1-table">
                <thead>
                  <tr>
                    <th scope="col">Código</th>
                    <th scope="col">Cliente</th>
                    <th scope="col">Tênis / Serviço</th>
                    <th scope="col">Previsão</th>
                    <th scope="col">Status</th>
                    <th scope="col">
                      <span className="v1-sr-only">Ações</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {visible.map((pedido) => (
                    <tr key={pedido.code}>
                      <td data-label="Código" className="v1-mono v1-table__code">
                        {pedido.code}
                      </td>
                      <td data-label="Cliente">{pedido.customerName}</td>
                      <td data-label="Tênis / Serviço">
                        {pedido.items.map((item) => (
                          <div key={`${item.shoe}-${item.service}`} className="v1-table__item">
                            <span className="v1-table__shoe">{item.shoe}</span>
                            <span className="v1-table__service">{item.service}</span>
                          </div>
                        ))}
                      </td>
                      <td data-label="Previsão" className="v1-table__date">
                        {formatDate(pedido.expectedAt)}
                      </td>
                      <td data-label="Status">
                        <div className="v1-table__status">
                          <select
                            className={`v1-chip-select v1-tone--${STATUS_TONE[pedido.status]}`}
                            value={pedido.status}
                            onChange={(e) => handleStatusChange(pedido.code, e.target.value)}
                            aria-label={`Status do pedido ${pedido.code}`}
                          >
                            {STATUS_KEYS.map((key) => (
                              <option key={key} value={key}>
                                {STATUS[key].label}
                              </option>
                            ))}
                          </select>
                          {isLate(pedido, today) && <StatusChip tone="red">Atrasado</StatusChip>}
                          {isDueSoon(pedido, today) && (
                            <StatusChip tone="orange">Prazo próximo</StatusChip>
                          )}
                        </div>
                      </td>
                      <td data-label="Ações" className="v1-table__actions">
                        <Link to={`/acompanhar/${pedido.code}`} className="v1-table__link">
                          <span className="v1-table__link-text">
                            Ver andamento<span className="v1-sr-only"> do pedido {pedido.code}</span>
                          </span>
                          <Icon name="arrowRight" size={16} />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {visible.length === 0 && (
                <p className="v1-orders__empty">Nenhuma ordem encontrada com esses filtros.</p>
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
