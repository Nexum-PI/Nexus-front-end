// Dados da loja usados no site público (v1).
// Tudo marcado com TODO é placeholder: a loja precisa preencher antes de publicar.

export const STORE = {
  name: "A Casa do Tênis",
  system: "NEXUM",
  foundedYear: 2023, // ano que aparece no selo do logo

  // TODO: número real do WhatsApp, só dígitos, com DDI e DDD (ex.: 5511999999999)
  whatsappNumber: "5500000000000",
  // TODO: como o número deve aparecer escrito na página
  whatsappDisplay: "(00) 00000-0000",

  // TODO: endereço real da loja
  address: {
    street: "Rua Exemplo, 000",
    district: "Bairro",
    city: "Cidade · UF",
    zip: "00000-000",
  },

  // TODO: horários reais de funcionamento
  hours: [
    { days: "Segunda a sexta", time: "10h às 19h" },
    { days: "Sábado", time: "10h às 16h" },
    { days: "Domingo e feriados", time: "Fechado" },
  ],

  // TODO: perfil real (ou deixe null para esconder o link)
  instagram: null,

  announcement: "Retirada e entrega combinadas pelo WhatsApp.",
};

// Números de prova logo abaixo do hero.
// TODO: substituir pelos números reais. Os valores com "0" são placeholders
// propositais para não parecerem dados verdadeiros.
export const PROOF = [
  { value: String(STORE.foundedYear), label: "Ano de abertura da loja" },
  { value: "0.000+", label: "Pares tratados", placeholder: true },
  { value: "0,0", label: "Nota média das avaliações", placeholder: true },
];

const scheduleMessage =
  "Olá. Quero agendar um atendimento na A Casa do Tênis.";

// CTA principal "Agendar atendimento".
// Hoje abre o WhatsApp. Para trocar por um fluxo próprio de agendamento,
// basta mudar `href` para uma rota interna (ex.: "/agendar"): os botões
// usam <Link> quando o endereço começa com "/".
export const SCHEDULE = {
  label: "Agendar atendimento",
  href: `https://wa.me/${STORE.whatsappNumber}?text=${encodeURIComponent(scheduleMessage)}`,
};

export const whatsappLink = (text = "") =>
  `https://wa.me/${STORE.whatsappNumber}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

export const mapsLink = () =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${STORE.address.street}, ${STORE.address.district}, ${STORE.address.city}`,
  )}`;
