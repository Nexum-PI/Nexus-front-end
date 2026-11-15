// Serviços da loja: alimentam os painéis da Home, as páginas públicas de cada
// serviço e a tela "Nova ordem" do painel da equipe.
// Os campos do formulário seguem as telas atuais (src/pages/*Service.jsx):
// mesmos nomes, mesma validação e mesma mensagem ao registrar.

export const SERVICES = [
  {
    number: "01",
    slug: "lavagem-premium",
    // O que está incluso (página pública do serviço). Ajuste com a loja.
    includes: [
      "Avaliação do material antes de começar",
      "Limpeza de cabedal, entressola e sola",
      "Higienização interna e da palmilha",
      "Cadarços lavados ou trocados",
    ],
    path: "/servicos/lavagem-premium",
    title: "Lavagem Premium",
    line: "Higienização profunda, por dentro e por fora, respeitando cada material.",
    form: {
      title: "Lavagem Premium",
      field: { name: "material", label: "Material", placeholder: "Ex: Camurça, Couro, Malha" },
      modelPlaceholder: "Ex: Cano baixo de couro branco",
      notesPlaceholder: "Detalhes como: manchas profundas, rasgos, cuidados especiais, etc.",
      success: (cliente) => `Pedido de lavagem para ${cliente} registrado com sucesso!`,
    },
  },
  {
    number: "02",
    slug: "pintura-restauracao",
    // O que está incluso (página pública do serviço). Ajuste com a loja.
    includes: [
      "Avaliação da cor e do desgaste",
      "Retoque ou repintura adequada ao material",
      "Correção de arranhões e partes descascadas",
      "Acabamento selado para durar no uso",
    ],
    path: "/servicos/pintura-restauracao",
    title: "Pintura & Restauração",
    line: "Cor recuperada, desgaste corrigido e acabamento de volta ao original.",
    form: {
      title: "Pintura e Restauração",
      field: { name: "corDesejada", label: "Cor Desejada", placeholder: "Ex: Branco, Azul, Preto" },
      modelPlaceholder: "Ex: Cano alto de couro preto",
      notesPlaceholder: "Detalhes como: cor diferente, estampa, etc.",
      success: (cliente) => `Pedido de pintura para ${cliente} registrado com sucesso!`,
    },
  },
  {
    number: "03",
    slug: "troca-solado",
    // O que está incluso (página pública do serviço). Ajuste com a loja.
    includes: [
      "Avaliação da estrutura do tênis",
      "Remoção da sola antiga e preparo da base",
      "Sola nova colada e conferida",
      "Revisão de caimento e acabamento",
    ],
    path: "/servicos/troca-solado",
    title: "Troca de Solado",
    line: "Sola nova, estrutura firme e o mesmo caimento de antes.",
    form: {
      title: "Troca de Solado",
      field: { name: "tipoSola", label: "Tipo de Solado", placeholder: "Ex: Borracha, EVA, Poliuretano" },
      modelPlaceholder: "Ex: Tênis de corrida",
      notesPlaceholder: "Detalhes como: tipo de solado, material do solado, etc.",
      success: (cliente) => `Pedido de troca de solado para ${cliente} registrado com sucesso!`,
    },
  },
  {
    number: "04",
    slug: "customizacao",
    // O que está incluso (página pública do serviço). Ajuste com a loja.
    includes: [
      "Conversa para entender a sua ideia",
      "Proposta do desenho antes de começar",
      "Pintura, bordado ou troca de peças à mão",
      "Acabamento selado para durar no uso",
    ],
    path: "/servicos/customizacao",
    title: "Customização",
    line: "Um par único, desenhado com você e feito à mão.",
    form: {
      title: "Customização",
      field: {
        name: "tipoServico",
        label: "Tipo de Serviço",
        placeholder: "Ex: Pintura personalizada, Bordado, Troca de cadarço",
      },
      modelPlaceholder: "Ex: Cano baixo de lona",
      notesPlaceholder: "Detalhes como: tipo de serviço, material do serviço, etc.",
      success: (cliente) =>
        `Pedido de serviço personalizado para ${cliente} registrado com sucesso!`,
    },
  },
];

export const findService = (slug) => SERVICES.find((s) => s.slug === slug) ?? null;

// "Como funciona": mesma ordem dos status do sistema.
export const STEPS = [
  {
    number: "01",
    status: "Recebido",
    text: "Avaliamos o par com você e registramos tudo no pedido.",
  },
  {
    number: "02",
    status: "Higienização ou restauração",
    text: "O trabalho começa na bancada. Cada etapa fica registrada.",
  },
  {
    number: "03",
    status: "Pronto",
    text: "Conferimos o acabamento e avisamos você.",
  },
  {
    number: "04",
    status: "Entregue",
    text: "Retirada na loja ou entrega combinada pelo WhatsApp.",
  },
];
