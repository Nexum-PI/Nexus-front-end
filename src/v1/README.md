# NEXUM · v1

Redesign editorial do site e do painel da A Casa do Tênis. Usa a mesma stack
(React + Vite + React Router + CSS puro) e não adiciona dependências.

## Como alternar as versões

Em `src/App.jsx`, mude uma linha:

```js
const UI_VERSION = "v1"; // ou "legacy" para as telas de src/pages
```

As telas são carregadas sob demanda, então o CSS de uma versão não vaza na outra.

## Onde editar

| O quê | Arquivo |
| --- | --- |
| Cores, fontes, espaçamentos | `styles/tokens.css` |
| WhatsApp, endereço, horários, números de prova, faixa do topo | `data/store.js` |
| Destino do botão "Agendar atendimento" | `SCHEDULE` em `data/store.js` |
| Fotos (todas) | `data/media.js` |
| Serviços e "Como funciona" | `data/services.js` |
| Depoimentos | `data/testimonials.js` |
| Cores dos status | `data/statusUi.js` |

## O que a loja precisa preencher antes de publicar

1. **Fotos** em `data/media.js`: hero (16:9, com recorte 3:4 opcional para
   celular), 4 serviços (4:3), 3 pares de antes/depois (4:5, mesmo enquadramento),
   loja (3:2) e área da equipe (4:5). Coloque os arquivos em `public/` e preencha
   `src`. Sem logos ou nomes de marcas visíveis nas fotos.
2. **Depoimentos reais** em `data/testimonials.js`, com autorização do cliente.
3. **Endereço, horários e WhatsApp** em `data/store.js` (`whatsappNumber` só com
   dígitos, com DDI e DDD).
4. **Números de prova** (`PROOF` em `data/store.js`): pares tratados e nota média.
   O ano de abertura (2023) vem do selo.
5. **Instagram** (opcional) em `STORE.instagram`.

## Regras mantidas

- Status seguem o enum do banco (`src/data/orders.js`); "Atrasado" e "Prazo
  próximo" são calculados pela previsão de entrega.
- Mudar o status no painel reflete na consulta do cliente (`OrdersProvider`).
- O cliente não tem conta: consulta pelo código e vê só o primeiro nome, sem preços.
