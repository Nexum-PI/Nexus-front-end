import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { TrackOrder } from "./pages/TrackOrder";
import { ServiceDetails } from "./pages/ServiceDetails";
import { WashService } from "./pages/WashService";
import { PaintService } from "./pages/PaintService";
import { SoleService } from "./pages/SoleService";
import { CustomService } from "./pages/CustomService";
import { Management } from "./pages/Management";
import { OrdersProvider } from "./context/OrdersProvider";

function App() {
  return (
    <OrdersProvider>
      <BrowserRouter>
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
      </BrowserRouter>
    </OrdersProvider>
  );
}

export default App;