// Indicadores do painel: faturamento, SLA e clientes por região (CEP).
// Tudo é calculado a partir dos pedidos (src/data/orders.js).

// TODO: quando o pedidos-service existir, o CEP vem no próprio pedido.
// Até lá, CEPs fictícios para os pedidos de exemplo.
export const SAMPLE_CEP = {
  "NX-2026-000123": "01310-100", // Bela Vista (perto da loja)
  "NX-2026-000124": "04538-132", // Itaim Bibi
  "NX-2026-000125": "05422-030", // Pinheiros
  "NX-2026-000126": "01415-000", // Consolação
  "NX-2026-000127": "09015-000", // Santo André
};

export const cepOf = (order) => order.customerCep ?? SAMPLE_CEP[order.code] ?? null;

// Regiões pelo início do CEP (faixas dos Correios para a Grande São Paulo).
export const REGIONS = [
  { key: "centro", label: "Centro", test: (n) => n >= 1000 && n <= 1599 },
  { key: "oeste", label: "Zona Oeste", test: (n) => (n >= 5000 && n <= 5899) || (n >= 1600 && n <= 1999) },
  { key: "sul", label: "Zona Sul", test: (n) => n >= 4000 && n <= 4999 },
  { key: "norte", label: "Zona Norte", test: (n) => n >= 2000 && n <= 2999 },
  { key: "leste", label: "Zona Leste", test: (n) => (n >= 3000 && n <= 3999) || (n >= 8000 && n <= 8499) },
  { key: "abc", label: "ABC", test: (n) => n >= 9000 && n <= 9999 },
  { key: "grande", label: "Grande SP", test: (n) => (n >= 6000 && n <= 7999) || (n >= 8500 && n <= 8999) },
];

export const regionOfCep = (cep) => {
  const digits = String(cep ?? "").replace(/\D/g, "");
  if (digits.length !== 8) return null;
  const prefix = Number(digits.slice(0, 5)); // 5 primeiros dígitos (ex.: 01310)
  return REGIONS.find((r) => r.test(prefix)) ?? { key: "outras", label: "Outras cidades" };
};

export const orderTotal = (order) => order.items.reduce((sum, item) => sum + (item.price ?? 0), 0);

export const brl = (value) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

// Faturamento: total, recebido (entregues), a receber (demais, menos cancelados)
export const revenueOf = (orders, services) => {
  const valid = orders.filter((o) => o.status !== "CANCELED");
  const total = valid.reduce((s, o) => s + orderTotal(o), 0);
  const received = valid.filter((o) => o.status === "DELIVERED").reduce((s, o) => s + orderTotal(o), 0);
  const byService = services.map((service) => ({
    label: service.title,
    value: valid.reduce(
      (s, o) => s + o.items.filter((i) => i.service === service.title).reduce((a, i) => a + i.price, 0),
      0,
    ),
  }));
  return {
    total,
    received,
    open: total - received,
    ticket: valid.length ? total / valid.length : 0,
    byService,
  };
};

const DAY = 24 * 60 * 60 * 1000;
const finishedAt = (order) =>
  order.history.find((h) => h.status === "READY")?.changedAt ??
  order.history.find((h) => h.status === "DELIVERED")?.changedAt ??
  null;

// SLA: pedidos concluídos (pronto ou entregue) dentro da previsão de entrega
export const slaOf = (orders, isLate, today) => {
  const finished = orders.filter((o) => finishedAt(o));
  const onTime = finished.filter((o) => finishedAt(o).slice(0, 10) <= o.expectedAt);
  const days = finished.map((o) => (new Date(finishedAt(o)) - new Date(o.receivedAt)) / DAY);
  return {
    finished: finished.length,
    onTime: onTime.length,
    rate: finished.length ? Math.round((onTime.length / finished.length) * 100) : null,
    avgDays: days.length ? days.reduce((a, b) => a + b, 0) / days.length : null,
    late: orders.filter((o) => isLate(o, today)).length,
  };
};
