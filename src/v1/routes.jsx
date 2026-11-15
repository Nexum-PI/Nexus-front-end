import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AuthProvider } from "./auth/AuthProvider";
import { RequireStaff } from "./auth/RequireStaff";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Management } from "./pages/Management";
import { NewOrder } from "./pages/NewOrder";
import { ServiceDetails } from "./pages/ServiceDetails";
import { ServicePage } from "./pages/ServicePage";
import { TrackOrder } from "./pages/TrackOrder";
import "./styles/tokens.css";
import "./styles/base.css";

// Ao trocar de página volta ao topo; com âncora (/#servicos) rola até a seção.
function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (target) {
        target.scrollIntoView({ block: "start" });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

const SERVICE_SLUGS = ["lavagem-premium", "pintura-restauracao", "troca-solado", "customizacao"];

// Rotas da v1. Mesmos caminhos das telas atuais (nenhuma foi removida),
// mais /gerenciamento/nova-ordem.
//
// Público: Home, páginas de serviço, acompanhar pedido e login.
// Equipe (exige login): painel e nova ordem.
export default function V1Routes() {
  return (
    <AuthProvider>
      <ScrollManager />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* Jornada do cliente: consulta pelo código, sem conta */}
        <Route path="/acompanhar" element={<TrackOrder />} />
        <Route path="/acompanhar/:code" element={<TrackOrder />} />

        {/* Páginas públicas de serviço (só apresentação, sem formulário) */}
        {SERVICE_SLUGS.map((slug) => (
          <Route
            key={slug}
            path={`/servicos/${slug}`}
            element={<ServicePage key={slug} slug={slug} />}
          />
        ))}
        <Route path="/servicos/:slug" element={<ServiceDetails />} />

        {/* Equipe: protegido por login */}
        <Route
          path="/gerenciamento"
          element={
            <RequireStaff>
              <Management />
            </RequireStaff>
          }
        />
        <Route
          path="/gerenciamento/nova-ordem"
          element={
            <RequireStaff>
              <NewOrder />
            </RequireStaff>
          }
        />
      </Routes>
    </AuthProvider>
  );
}
