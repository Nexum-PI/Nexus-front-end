import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { ServiceDetails } from './pages/ServiceDetails';
import { WashService } from './pages/WashService';
import { Management } from './pages/Management'; // <-- 1. Importar a nova página
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { ServiceDetails } from "./pages/ServiceDetails";
import { WashService } from "./pages/WashService"; // Importamos a nova página
import { PaintService } from "./pages/PaintService"; // Importamos a nova página
import { SoleService } from "./pages/SoleService"; // Importamos a nova página
import { CustomService } from "./pages/CustomService"; // Importamos a nova página

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        
        {/* <-- 2. Adicionar a rota do Painel Admin --> */}
        <Route path="/gerenciamento" element={<Management />} />
        
        <Route path="/servicos/lavagem-premium" element={<WashService />} />

        {/* ROTA ESPECÍFICA: Intercepta o clique em "Pintura" */}
        <Route
          path="/servicos/pintura-restauracao"
          element={<PaintService />}
        />
        {/* ROTA ESPECÍFICA: Intercepta o clique em "Troca de Solado" */}
        <Route path="/servicos/troca-solado" element={<SoleService />} />

        {/* ROTA ESPECÍFICA: Intercepta o clique em "Customização" */}
        <Route path="/servicos/customizacao" element={<CustomService />} />

        {/* ROTA DINÂMICA: Serve para os outros serviços que ainda não têm página própria */}
        <Route path="/servicos/:slug" element={<ServiceDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;