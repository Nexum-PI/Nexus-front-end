import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { ServiceDetails } from "./pages/ServiceDetails";
import { WashService } from "./pages/WashService";
import { PaintService } from "./pages/PaintService";
import { SoleService } from "./pages/SoleService";
import { CustomService } from "./pages/CustomService";
import { Management } from "./pages/Management";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Login e Cadastro */}
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Register />} />

        <Route path="/gerenciamento" element={<Management />} />
        <Route path="/servicos/lavagem-premium" element={<WashService />} />
        <Route path="/servicos/pintura-restauracao" element={<PaintService />} />
        <Route path="/servicos/troca-solado" element={<SoleService />} />
        <Route path="/servicos/customizacao" element={<CustomService />} />

        {/* ROTA DINÂMICA: serviços sem página própria */}
        <Route path="/servicos/:slug" element={<ServiceDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;