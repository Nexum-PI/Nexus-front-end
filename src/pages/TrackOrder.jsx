import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useOrders } from "../context/useOrders";
import {
  STATUS,
  findOrderByCode,
  formatDate,
  formatDateTime,
  isLate,
  normalizeCode,
} from "../data/orders";
import "./TrackOrder.css";

// Jornada do cliente: consulta o andamento e o prazo pelo código do pedido,
// informado pela loja na entrega do tênis. O cliente não precisa de conta.
export function TrackOrder() {
  const { code: codeParam } = useParams();
  const navigate = useNavigate();
  const { orders } = useOrders();
  const [codigo, setCodigo] = useState(codeParam ?? "");

  const order = codeParam ? findOrderByCode(orders, codeParam) : null;
  const naoEncontrado = Boolean(codeParam) && !order;

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = normalizeCode(codigo);
    if (!value) return;
    navigate(`/acompanhar/${encodeURIComponent(value)}`);
  };

  // Expõe o mínimo de dados pessoais: só o primeiro nome do cliente.
  const firstName = order?.customerName.split(" ")[0];

  return (
    <div className="track-container">
      <header className="track-header">
        <Link to="/" className="btn-back">
          &larr; Voltar para Home
        </Link>
        <h1>Acompanhar pedido</h1>
        <p>Digite o código informado pela loja quando você deixou o tênis.</p>
      </header>

      <form onSubmit={handleSubmit} className="track-search">
        <input
          type="text"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          placeholder="Ex: NX-2026-000123"
          aria-label="Código do pedido"
        />
        <button type="submit" className="btn-submit">
          Consultar
        </button>
      </form>

      {naoEncontrado && (
        <div className="track-card track-empty" role="alert">
          <h2>Pedido não encontrado</h2>
          <p>
            Confira o código digitado ou fale com a loja para confirmar o número
            do seu pedido.
          </p>
        </div>
      )}

      {order && (
        <section className="track-card">
          <div className="track-card-top">
            <div>
              <span className="track-label">Pedido</span>
              <h2>{order.code}</h2>
              <p className="track-sub">Olá, {firstName}!</p>
            </div>
            <span className={`status-badge ${STATUS[order.status].badge}`}>
              {STATUS[order.status].label}
            </span>
          </div>

          {isLate(order) && (
            <p className="track-alert">
              O prazo previsto já passou. Fale com a loja para saber mais.
            </p>
          )}

          <dl className="track-info">
            <div>
              <dt>Previsão de entrega</dt>
              <dd>{formatDate(order.expectedAt)}</dd>
            </div>
            <div>
              <dt>Recebido em</dt>
              <dd>{formatDateTime(order.receivedAt)}</dd>
            </div>
            {order.deliveredAt && (
              <div>
                <dt>Entregue em</dt>
                <dd>{formatDateTime(order.deliveredAt)}</dd>
              </div>
            )}
          </dl>

          <h3>Serviços</h3>
          <ul className="track-items">
            {order.items.map((item) => (
              <li key={`${item.shoe}-${item.service}`}>
                <strong>{item.shoe}</strong>
                <span>{item.service}</span>
              </li>
            ))}
          </ul>

          <h3>Andamento</h3>
          <ol className="track-timeline">
            {order.history.map((step, index) => (
              <li
                key={`${step.status}-${step.changedAt}`}
                className={index === order.history.length - 1 ? "current" : ""}
              >
                <div className="timeline-status">{STATUS[step.status].label}</div>
                <div className="timeline-date">{formatDateTime(step.changedAt)}</div>
                {step.note && <div className="timeline-note">{step.note}</div>}
              </li>
            ))}
          </ol>
        </section>
      )}
    </div>
  );
}
