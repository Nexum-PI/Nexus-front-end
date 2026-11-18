import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { OrdersProvider } from "./context/OrdersProvider";

// Versão da interface. Troque esta linha para comparar as versões:
//   "v1"     → redesign em src/v1 (rotas em src/v1/routes.jsx)
//   "legacy" → telas originais de src/pages
const UI_VERSION = "v1";

// As telas são carregadas sob demanda: assim o CSS de uma versão não vaza na outra.
const V1Routes = lazy(() => import("./v1/routes.jsx"));

const page = (load, name) => lazy(() => load().then((m) => ({ default: m[name] })));
const Home = page(() => import("./pages/Home"), "Home");
const Login = page(() => import("./pages/Login"), "Login");
const TrackOrder = page(() => import("./pages/TrackOrder"), "TrackOrder");
const ServiceDetails = page(() => import("./pages/ServiceDetails"), "ServiceDetails");
const WashService = page(() => import("./pages/WashService"), "WashService");
const PaintService = page(() => import("./pages/PaintService"), "PaintService");
const SoleService = page(() => import("./pages/SoleService"), "SoleService");
const CustomService = page(() => import("./pages/CustomService"), "CustomService");
const Management = page(() => import("./pages/Management"), "Management");

function LegacyRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      {/* Login da equipe (o cliente não tem conta: consulta pelo código do pedido) */}
      <Route path="/login" element={<Login />} />

      {/* Jornada do cliente: acompanhar pedido pelo código */}
      <Route path="/acompanhar" element={<TrackOrder />} />
      <Route path="/acompanhar/:code" element={<TrackOrder />} />

      {/* Jornadas da equipe: painel e abertura de ordens */}
      <Route path="/gerenciamento" element={<Management />} />
      <Route path="/servicos/lavagem-premium" element={<WashService />} />
      <Route path="/servicos/pintura-restauracao" element={<PaintService />} />
      <Route path="/servicos/troca-solado" element={<SoleService />} />
      <Route path="/servicos/customizacao" element={<CustomService />} />

      {/* ROTA DINÂMICA: serviços sem página própria */}
      <Route path="/servicos/:slug" element={<ServiceDetails />} />
    </Routes>
  );
}

function App() {
  return (
    <OrdersProvider>
      <BrowserRouter>
        <Suspense fallback={null}>
          {UI_VERSION === "v1" ? <V1Routes /> : <LegacyRoutes />}
        </Suspense>
      </BrowserRouter>
    </OrdersProvider>
  );
}

export default App;
