// Aparência dos status na v1. Os status em si vêm de src/data/orders.js
// (enum do banco); aqui só decidimos o tom de cada um.
//  RECEIVED amarelo · CLEANING/RESTORING azul · READY/DELIVERED verde ·
//  CANCELED cinza · Atrasado vermelho · Prazo próximo laranja

export const STATUS_TONE = {
  RECEIVED: "yellow",
  CLEANING: "blue",
  RESTORING: "blue",
  READY: "green",
  DELIVERED: "green",
  CANCELED: "gray",
};

// Cores sólidas para o gráfico de rosca. Status do mesmo tom ganham
// variações de intensidade; a legenda sempre traz nome e número.
export const STATUS_CHART_COLOR = {
  RECEIVED: "#D9A521",
  CLEANING: "#2F6FB5",
  RESTORING: "#7AA7DF",
  READY: "#3F9A66",
  DELIVERED: "#1F5E3C",
  CANCELED: "#9A9A9A",
};

// Etapas do stepper do cliente (mesma ordem do "Como funciona").
export const STEP_OF_STATUS = {
  RECEIVED: 0,
  CLEANING: 1,
  RESTORING: 1,
  READY: 2,
  DELIVERED: 3,
};
