// Todas as imagens da v1 em um só lugar.
// Cada slot: { src, alt, ratio, label }.
//  - src: caminho da foto (ex.: "/v1/hero.jpg" dentro de /public). Enquanto for
//    null, o componente <ImageSlot /> mostra um bloco temporário do mesmo tamanho.
//  - ratio: proporção reservada na página ("largura/altura"). Exporte a foto
//    nessa proporção para não haver cortes inesperados.
//  - label: aparece só no bloco temporário, para a equipe saber que foto vai ali.
//  - position (opcional): ponto da foto que fica visível no recorte, como no
//    CSS object-position (ex.: "50% 65%" = centro, um pouco abaixo do meio).
// Regras: fotos próprias da loja, com tratamento escuro e luz quente;
// sem logos ou nomes de marcas de tênis visíveis.

const slot = (label, ratio, alt, extra = {}) => ({ src: null, alt, ratio, label, ...extra });

export const MEDIA = {
  // Hero: foto horizontal em desktop. `srcMobile` é opcional (recorte vertical).
  // Foto atual: vitrine da loja (public/v1/loja-fachada.webp, 1344×896).
  // Para uma imagem mais nítida em telas grandes, use uma versão de 1920px ou mais.
  hero: slot(
    "Hero · vitrine da loja",
    "16/9",
    "Vitrine da A Casa do Tênis com o selo da loja no vidro e prateleiras iluminadas ao fundo",
    { src: "/v1/loja-fachada.webp", srcMobile: null, ratioMobile: "3/4" },
  ),

  // Fotos dos serviços: public/v1/servicos/
  services: {
    "lavagem-premium": slot(
      "Serviço 01 · lavagem",
      "4/3",
      "Tênis de camurça caramelo limpo, sobre a bancada da loja",
      { src: "/v1/servicos/lavagem-depois.webp", position: "50% 62%" },
    ),
    "pintura-restauracao": slot(
      "Serviço 02 · pintura e restauração",
      "4/3",
      "Tênis branco e roxo com a cor restaurada, sobre a bancada da loja",
      { src: "/v1/servicos/pintura-depois.webp", position: "50% 58%" },
    ),
    "troca-solado": slot(
      "Serviço 03 · troca de solado",
      "4/3",
      "Par de tênis com solado branco novo, visto por baixo",
      { src: "/v1/servicos/solado-novo.webp", position: "50% 50%" },
    ),
    // TODO: foto da customização em public/v1/servicos/customizacao-depois.webp
    customizacao: slot(
      "Serviço 04 · customização",
      "4/3",
      "Calçado customizado sobre a bancada da loja",
    ),
  },

  // Antes e depois: as duas fotos de cada caso devem ter enquadramento parecido.
  beforeAfter: [
    {
      id: "pintura",
      title: "Pintura",
      detail: "Cor desbotada, recuperada.",
      before: slot("Antes · pintura", "4/5", "Tênis branco e roxo desbotado, antes da pintura", {
        src: "/v1/servicos/pintura-antes.webp",
        position: "50% 60%",
      }),
      after: slot("Depois · pintura", "4/5", "O mesmo tênis com o roxo restaurado", {
        src: "/v1/servicos/pintura-depois.webp",
        position: "50% 60%",
      }),
    },
    {
      id: "lavagem",
      title: "Lavagem",
      detail: "Camurça e sola sem as manchas de uso.",
      before: slot(
        "Antes · lavagem",
        "4/5",
        "Tênis de camurça caramelo sujo, com a sola manchada",
        {
          src: "/v1/servicos/lavagem-antes.webp",
          position: "50% 65%",
        },
      ),
      after: slot("Depois · lavagem", "4/5", "O mesmo tênis de camurça limpo, com a sola branca", {
        src: "/v1/servicos/lavagem-depois.webp",
        position: "50% 65%",
      }),
    },
    {
      // TODO: foto de "antes" da troca de sola (sem ela, o card mostra só o resultado)
      id: "solado",
      title: "Troca de sola",
      detail: "Solado novo, colado e conferido na bancada.",
      before: slot("Antes · troca de sola", "4/5", "Solado gasto, antes da troca"),
      after: slot(
        "Depois · troca de sola",
        "4/5",
        "Par de tênis com solado branco novo, visto por baixo",
        {
          src: "/v1/servicos/solado-novo.webp",
          position: "50% 50%",
        },
      ),
    },
    {
      // TODO: fotos em public/v1/servicos/customizacao-antes.webp e customizacao-depois.webp
      // Enquanto o "depois" não tiver foto, o caso fica escondido no carrossel.
      id: "customizacao",
      title: "Customização",
      detail: "Solado plataforma aplicado à mão.",
      before: slot("Antes · customização", "4/5", "Calçado de camurça antes da customização"),
      after: slot("Depois · customização", "4/5", "O mesmo calçado com o novo solado plataforma"),
    },
  ],

  store: slot(
    "Loja · fachada ou balcão",
    "3/2",
    "Interior da A Casa do Tênis com prateleiras de madeira e luz quente",
    { src: "/v1/loja-fachada.webp" },
  ),

  login: slot(
    "Área da equipe · bancada de trabalho",
    "4/5",
    "Bancada de trabalho da loja com ferramentas de restauração",
  ),
};
