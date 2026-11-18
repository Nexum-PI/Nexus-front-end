// Dados da loja usados no site público (v1).
// Contato, endereço e horários vêm do site atual (acasadotenis.com.br).
// O que ainda estiver marcado com TODO é placeholder.

export const STORE = {
  name: "A Casa do Tênis",
  system: "NEXUM",
  foundedYear: 2023, // ano que aparece no selo do logo

  // WhatsApp: só dígitos, com DDI e DDD
  whatsappNumber: "5511993485998",
  whatsappDisplay: "(11) 99348-5998",
  email: "contato.acasadotenis@gmail.com",

  address: {
    street: "Avenida Paulista, 2001",
    complement: "Sobreloja 24",
    city: "São Paulo · SP",
    zip: null, // TODO: CEP (opcional; aparece no bloco da loja quando preenchido)
    // Texto usado para buscar o endereço no Google Maps (mapa e "Como chegar")
    mapsQuery: "Avenida Paulista 2001 sobreloja 24 São Paulo",
  },

  hours: [
    { days: "Segunda a sexta", time: "08h30 às 18h30" },
    { days: "Sábado", time: "10h às 16h" },
    { days: "Domingo", time: "Fechado" },
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

// "Como chegar": abre o Google Maps (no celular, o app) já com a loja.
export const mapsLink = () =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(STORE.address.mapsQuery)}`;

// Rotas até a loja a partir da localização do visitante.
export const directionsLink = () =>
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(STORE.address.mapsQuery)}`;

// Mapa incorporado (não precisa de chave de API).
export const mapsEmbedUrl = () =>
  `https://www.google.com/maps?q=${encodeURIComponent(STORE.address.mapsQuery)}&z=16&output=embed`;
