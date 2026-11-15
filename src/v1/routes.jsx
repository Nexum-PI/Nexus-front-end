import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Management } from "./pages/Management";
import { ServiceDetails } from "./pages/ServiceDetails";
import { ServiceOrder } from "./pages/ServiceOrder";
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

// Rotas da v1. Mesmos caminhos das telas atuais: nenhuma rota foi removida.
export default function V1Routes() {
  return (
    <>
      <ScrollManager />
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Login da equipe (o cliente não tem conta: consulta pelo código do pedido) */}
        <Route path="/login" element={<Login />} />

        {/* Jornada do cliente */}
        <Route path="/acompanhar" element={<TrackOrder />} />
        <Route path="/acompanhar/:code" element={<TrackOrder />} />

        {/* Jornadas da equipe */}
        <Route path="/gerenciamento" element={<Management />} />
        {/* key: cada serviço começa com o formulário limpo */}
        <Route
          path="/servicos/lavagem-premium"
          element={<ServiceOrder key="lavagem-premium" slug="lavagem-premium" />}
        />
        <Route
          path="/servicos/pintura-restauracao"
          element={<ServiceOrder key="pintura-restauracao" slug="pintura-restauracao" />}
        />
        <Route
          path="/servicos/troca-solado"
          element={<ServiceOrder key="troca-solado" slug="troca-solado" />}
        />
        <Route
          path="/servicos/customizacao"
          element={<ServiceOrder key="customizacao" slug="customizacao" />}
        />

        {/* Serviços sem página própria */}
        <Route path="/servicos/:slug" element={<ServiceDetails />} />
      </Routes>
    </>
  );
}
