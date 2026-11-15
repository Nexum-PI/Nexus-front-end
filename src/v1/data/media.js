// Todas as imagens da v1 em um só lugar.
// Cada slot: { src, alt, ratio, label }.
//  - src: caminho da foto (ex.: "/v1/hero.jpg" dentro de /public). Enquanto for
//    null, o componente <ImageSlot /> mostra um bloco temporário do mesmo tamanho.
//  - ratio: proporção reservada na página ("largura/altura"). Exporte a foto
//    nessa proporção para não haver cortes inesperados.
//  - label: aparece só no bloco temporário, para a equipe saber que foto vai ali.
// Regras: fotos próprias da loja, com tratamento escuro e luz quente;
// sem logos ou nomes de marcas de tênis visíveis.

const slot = (label, ratio, alt, extra = {}) => ({ src: null, alt, ratio, label, ...extra });

export const MEDIA = {
  // Hero: foto horizontal em desktop. `srcMobile` é opcional (recorte vertical).
  hero: slot(
    "Hero · par restaurado sob luz lateral",
    "16/9",
    "Par de tênis restaurado sobre bancada escura, iluminado de lado",
    { srcMobile: null, ratioMobile: "3/4" },
  ),

  services: {
    "lavagem-premium": slot(
      "Serviço 01 · lavagem",
      "4/3",
      "Tênis sendo higienizado à mão com escova macia",
    ),
    "pintura-restauracao": slot(
      "Serviço 02 · pintura e restauração",
      "4/3",
      "Retoque de pintura no cabedal de couro",
    ),
    "troca-solado": slot(
      "Serviço 03 · troca de solado",
      "4/3",
      "Solado novo sendo colado na bancada",
    ),
    customizacao: slot(
      "Serviço 04 · customização",
      "4/3",
      "Detalhe de customização pintada à mão",
    ),
  },

  // Antes e depois: as duas fotos de cada caso precisam ter o mesmo enquadramento.
  beforeAfter: [
    {
      id: "couro",
      title: "Couro branco",
      detail: "Cabedal amarelado e vincado.",
      before: slot("Antes · caso 01", "4/5", "Tênis de couro branco amarelado, antes do serviço"),
      after: slot("Depois · caso 01", "4/5", "O mesmo tênis de couro branco depois da restauração"),
    },
    {
      id: "camurca",
      title: "Camurça",
      detail: "Manchas de uso e pelo achatado.",
      before: slot("Antes · caso 02", "4/5", "Tênis de camurça manchado, antes do serviço"),
      after: slot("Depois · caso 02", "4/5", "O mesmo tênis de camurça depois da higienização"),
    },
    {
      id: "solado",
      title: "Solado",
      detail: "Entressola ressecada e trincada.",
      before: slot("Antes · caso 03", "4/5", "Solado trincado, antes da troca"),
      after: slot("Depois · caso 03", "4/5", "Tênis com solado novo depois da troca"),
    },
  ],

  store: slot(
    "Loja · fachada ou balcão",
    "3/2",
    "Interior da A Casa do Tênis com prateleiras de madeira e luz quente",
  ),

  login: slot(
    "Área da equipe · bancada de trabalho",
    "4/5",
    "Bancada de trabalho da loja com ferramentas de restauração",
  ),
};
