# NEXUM · front-end (A Casa do Tênis)

React 19 + Vite. A versão atual da interface fica em `src/v1` (veja `src/v1/README.md`).

## Rodar

1. Suba o back-end (repositório **Nexum-back-end**): `docker compose up -d --build`
2. No front:

   ```bash
   npm install
   ```

   ```bash
   npm run dev
   ```

3. Abra http://localhost:5173. Área da equipe: `/login` com o administrador definido no
   `.env` do back-end.

A API usada é `http://localhost:8080`. Para mudar, copie `.env.example` para `.env` e
ajuste `VITE_API_URL`.
