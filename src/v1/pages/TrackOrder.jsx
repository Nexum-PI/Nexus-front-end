import { Link, useParams } from "react-router-dom";
import { useOrders } from "../../context/useOrders";
import {
  STATUS,
  findOrderByCode,
  formatDate,
  formatDateTime,
  isLate,
} from "../../data/orders";
import { Icon } from "../components/Icon";
import { SiteLayout } from "../components/SiteLayout";
import { StatusChip } from "../components/StatusChip";
import { StatusStepper } from "../components/StatusStepper";
import { TrackForm } from "../components/TrackForm";
import { whatsappLink } from "../data/store";
import "../styles/track.css";

// Jornada do cliente: consulta pelo código do pedido, sem conta.
// Mostra só o primeiro nome e nenhum preço.
export function TrackOrder() {
  const { code: codeParam } = useParams();
  const { orders } = useOrders();

  const order = codeParam ? findOrderByCode(orders, codeParam) : null;
  const notFound = Boolean(codeParam) && !order;
  const firstName = order?.customerName.split(" ")[0];

  return (
    <SiteLayout>
      <div className="v1-container v1-track">
        <header className="v1-track__head">
          <Link to="/" className="v1-track__back">
            <Icon name="arrowLeft" size={16} /> Início
          </Link>
          <p className="v1-kicker">Acompanhar pedido</p>
          <h1 className="v1-display v1-track__title">Onde está meu tênis?</h1>
          <p className="v1-lead">Digite o código informado pela loja quando você deixou o tênis.</p>
        </header>

        {/* key: o campo recomeça com o código da URL a cada consulta */}
        <TrackForm key={codeParam ?? "vazio"} initialCode={codeParam ?? ""} />

        {notFound && (
          <div className="v1-track__empty" role="alert">
            <Icon name="alert" size={22} />
            <div>
              <h2 className="v1-track__empty-title">Pedido não encontrado</h2>
              <p>
                Confira o código digitado ou fale com a loja para confirmar o número do seu
                pedido.
              </p>
            </div>
          </div>
        )}

        {order && (
          <section className="v1-order" aria-labelledby="v1-order-code">
            <div className="v1-order__top">
              <div>
                <p className="v1-order__label">Pedido</p>
                <h2 id="v1-order-code" className="v1-mono v1-order__code">
                  {order.code}
                </h2>
                <p className="v1-order__hello">Olá, {firstName}.</p>
              </div>
              <StatusChip status={order.status} />
            </div>

            {isLate(order) && (
              <p className="v1-order__late" role="status">
                <Icon name="alert" size={18} />
                O prazo previsto já passou. Fale com a loja para saber mais.{" "}
                <a href={whatsappLink(`Pedido ${order.code}`)} target="_blank" rel="noopener noreferrer">
                  Chamar no WhatsApp
                </a>
              </p>
            )}

            <StatusStepper order={order} />

            <dl className="v1-order__facts">
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

            <div className="v1-order__cols">
              <div>
                <h3 className="v1-order__h">Serviços</h3>
                <ul className="v1-order__items">
                  {order.items.map((item) => (
                    <li key={`${item.shoe}-${item.service}`}>
                      <strong>{item.shoe}</strong>
                      <span>{item.service}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="v1-order__h">Linha do tempo</h3>
                <ol className="v1-timeline">
                  {order.history.map((step, index) => (
                    <li
                      key={`${step.status}-${step.changedAt}`}
                      className={index === order.history.length - 1 ? "is-current" : ""}
                    >
                      <span className="v1-timeline__status">{STATUS[step.status].label}</span>
                      <span className="v1-timeline__date">{formatDateTime(step.changedAt)}</span>
                      {step.note && <span className="v1-timeline__note">{step.note}</span>}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </section>
        )}
      </div>
    </SiteLayout>
  );
}
