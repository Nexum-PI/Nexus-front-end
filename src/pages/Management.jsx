import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useOrders } from '../context/useOrders';
import {
  ACTIVE_STATUS,
  STATUS,
  STATUS_KEYS,
  formatDate,
  isDueSoon,
  isLate,
} from '../data/orders';
import './Management.css';

export function Management() {
  const { orders, changeStatus } = useOrders();

  // "Hoje" fixo na abertura do painel; usado para calcular atrasos e prazos próximos
  const [today] = useState(() => new Date());

  // Atrasado e prazo próximo são derivados da previsão de entrega (expected_at),
  // não são status gravados no banco.
  const totalPedidos = orders.length;
  const emAndamento = orders.filter((p) => ACTIVE_STATUS.includes(p.status)).length;
  const atrasados = orders.filter((p) => isLate(p, today)).length;
  const prazoProximo = orders.filter((p) => isDueSoon(p, today)).length;
  const entregues = orders.filter((p) => p.status === 'DELIVERED').length;

  // Em andamento primeiro, pelos prazos mais curtos; depois os demais
  const pedidosOrdenados = [...orders].sort((a, b) => {
    const aAtivo = ACTIVE_STATUS.includes(a.status);
    const bAtivo = ACTIVE_STATUS.includes(b.status);
    if (aAtivo !== bAtivo) return aAtivo ? -1 : 1;
    return a.expectedAt.localeCompare(b.expectedAt);
  });

  const handleStatusChange = (code, status) => {
    changeStatus(code, status, 'Status atualizado pela equipe');
  };

  return (
    <div className="management-container">
      {/* Cabeçalho */}
      <header className="management-header">
        <div className="header-titles">
          <Link to="/" className="btn-back">&larr; Voltar para Home</Link>
          <h1>Painel de Gerenciamento</h1>
          <p>Visão geral e controle de todas as ordens de serviço.</p>
        </div>
        <div className="header-actions">
          {/* Leva às páginas de serviço, onde a equipe abre a ordem */}
          <Link to="/#servicos" className="btn-primary">
            + Nova Ordem
          </Link>
        </div>
      </header>

      {/* Seção de Resumo */}
      <section className="summary-cards">
        <div className="summary-card">
          <h3>Total de Pedidos</h3>
          <span className="summary-value">{totalPedidos}</span>
        </div>
        <div className="summary-card">
          <h3>Em andamento</h3>
          <span className="summary-value text-warning">{emAndamento}</span>
        </div>
        <div className="summary-card">
          <h3>Prazo próximo (até 2 dias)</h3>
          <span className="summary-value text-warning">{prazoProximo}</span>
        </div>
        <div className="summary-card">
          <h3>Atrasados</h3>
          <span className="summary-value text-danger">{atrasados}</span>
        </div>
        <div className="summary-card">
          <h3>Entregues</h3>
          <span className="summary-value text-success">{entregues}</span>
        </div>
      </section>

      {/* Tabela de Gerenciamento (Data Grid) */}
      <section className="management-table-section">
        <h2>Listagem de Serviços</h2>
        <div className="table-responsive">
          <table className="nexus-table">
            <thead>
              <tr>
                <th>Código</th>
                <th>Cliente</th>
                <th>Tênis / Serviço</th>
                <th>Previsão de Entrega</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {pedidosOrdenados.map((pedido) => (
                <tr key={pedido.code}>
                  <td className="fw-bold">{pedido.code}</td>
                  <td>{pedido.customerName}</td>
                  <td>
                    {pedido.items.map((item) => (
                      <div key={`${item.shoe}-${item.service}`}>
                        <div className="fw-bold">{item.shoe}</div>
                        <div className="text-muted">{item.service}</div>
                      </div>
                    ))}
                  </td>
                  <td>{formatDate(pedido.expectedAt)}</td>
                  <td>
                    <div className="status-cell">
                      <select
                        className={`status-select ${STATUS[pedido.status].badge}`}
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
                      {isLate(pedido, today) && (
                        <span className="status-badge badge-danger">Atrasado</span>
                      )}
                      {isDueSoon(pedido, today) && (
                        <span className="status-badge badge-warning">Prazo próximo</span>
                      )}
                    </div>
                  </td>
                  <td>
                    <Link
                      to={`/acompanhar/${pedido.code}`}
                      className="btn-action"
                    >
                      Ver andamento
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
