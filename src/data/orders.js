// Dados e regras de pedidos do NEXUM.
// Segue o dicionário de dados (Atividade #14): orders, order_items e order_status_history.
// Hoje usa dados de exemplo. Quando o pedidos-service existir, basta trocar
// as funções de leitura por chamadas à API; as telas não precisam mudar.

// ── Status (enum orders.status) ──────────────────────────────────────────────
export const STATUS = {
  RECEIVED: { label: "Recebido", badge: "badge-received" },
  CLEANING: { label: "Em higienização", badge: "badge-cleaning" },
  RESTORING: { label: "Em restauração", badge: "badge-restoring" },
  READY: { label: "Pronto para retirada/entrega", badge: "badge-ready" },
  DELIVERED: { label: "Entregue", badge: "badge-delivered" },
  CANCELED: { label: "Cancelado", badge: "badge-default" },
};

export const STATUS_KEYS = Object.keys(STATUS);

// Pedidos "em andamento": ainda dependem do trabalho da loja.
export const ACTIVE_STATUS = ["RECEIVED", "CLEANING", "RESTORING"];

// ── Datas ────────────────────────────────────────────────────────────────────
// expected_at é DATE (só o dia). Usamos strings "AAAA-MM-DD" para comparar sem
// problemas de fuso horário.
export const toISODate = (date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

export const addDays = (date, days) => {
  const copy = new Date(date);
  copy.setDate(copy.getDate() + days);
  return copy;
};

export const formatDate = (isoDate) => {
  if (!isoDate) return "-";
  const [y, m, d] = isoDate.slice(0, 10).split("-");
  return `${d}/${m}/${y}`;
};

export const formatDateTime = (iso) => {
  if (!iso) return "-";
  const date = new Date(iso);
  return `${date.toLocaleDateString("pt-BR")} ${date.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  })}`;
};

// ── Regras derivadas ─────────────────────────────────────────────────────────
// "Atrasado" não é um status do banco: é calculado pela previsão de entrega.
export const isLate = (order, today = new Date()) =>
  ACTIVE_STATUS.includes(order.status) && order.expectedAt < toISODate(today);

// Prazo próximo: vence hoje ou nos próximos `days` dias e ainda não está pronto.
export const isDueSoon = (order, today = new Date(), days = 2) =>
  ACTIVE_STATUS.includes(order.status) &&
  order.expectedAt >= toISODate(today) &&
  order.expectedAt <= toISODate(addDays(today, days));

// Código informado ao cliente, ex.: NX-2026-000123.
export const normalizeCode = (code) => code.trim().toUpperCase();

// ── Dados de exemplo ─────────────────────────────────────────────────────────
// As datas são relativas a hoje para a demonstração sempre mostrar pedidos
// atrasados, com prazo próximo e no prazo.
export const buildSampleOrders = (today = new Date()) => {
  const at = (days, hour = 10) => {
    const date = addDays(today, days);
    date.setHours(hour, 0, 0, 0);
    return date.toISOString();
  };

  return [
    {
      code: "NX-2026-000123",
      customerName: "Carlos Eduardo",
      status: "CLEANING",
      receivedAt: at(-3),
      expectedAt: toISODate(addDays(today, 1)),
      deliveredAt: null,
      items: [
        { shoe: "Nike Air Force 1", service: "Lavagem Premium", price: 90 },
      ],
      history: [
        { status: "RECEIVED", changedAt: at(-3), note: "Tênis recebido na loja" },
        { status: "CLEANING", changedAt: at(-1), note: "Higienização iniciada" },
      ],
    },
    {
      code: "NX-2026-000124",
      customerName: "Mariana Costa",
      status: "RECEIVED",
      receivedAt: at(0, 9),
      expectedAt: toISODate(addDays(today, 5)),
      deliveredAt: null,
      items: [{ shoe: "Yeezy Boost 350", service: "Lavagem Premium", price: 120 }],
      history: [
        { status: "RECEIVED", changedAt: at(0, 9), note: "Tênis recebido na loja" },
      ],
    },
    {
      code: "NX-2026-000125",
      customerName: "Rafael Souza",
      status: "READY",
      receivedAt: at(-8),
      expectedAt: toISODate(addDays(today, -1)),
      deliveredAt: null,
      items: [
        { shoe: "Air Jordan 1", service: "Pintura & Restauração", price: 280 },
      ],
      history: [
        { status: "RECEIVED", changedAt: at(-8), note: "Tênis recebido na loja" },
        { status: "RESTORING", changedAt: at(-6), note: "Pintura iniciada" },
        { status: "READY", changedAt: at(-1), note: "Aguardando retirada" },
      ],
    },
    {
      code: "NX-2026-000126",
      customerName: "Ana Lima",
      status: "RESTORING",
      receivedAt: at(-9),
      expectedAt: toISODate(addDays(today, -2)),
      deliveredAt: null,
      items: [{ shoe: "Vans Old Skool", service: "Customização", price: 350 }],
      history: [
        { status: "RECEIVED", changedAt: at(-9), note: "Tênis recebido na loja" },
        {
          status: "RESTORING",
          changedAt: at(-7),
          note: "Aguardando material para customização",
        },
      ],
    },
    {
      code: "NX-2026-000127",
      customerName: "Lucas Silva",
      status: "DELIVERED",
      receivedAt: at(-12),
      expectedAt: toISODate(addDays(today, -4)),
      deliveredAt: at(-4, 15),
      items: [{ shoe: "New Balance 550", service: "Troca de Solado", price: 220 }],
      history: [
        { status: "RECEIVED", changedAt: at(-12), note: "Tênis recebido na loja" },
        { status: "RESTORING", changedAt: at(-10), note: "Troca de solado iniciada" },
        { status: "READY", changedAt: at(-5), note: "Serviço finalizado" },
        { status: "DELIVERED", changedAt: at(-4, 15), note: "Retirado na loja" },
      ],
    },
  ];
};

export const findOrderByCode = (orders, code) =>
  orders.find((order) => order.code === normalizeCode(code)) ?? null;
