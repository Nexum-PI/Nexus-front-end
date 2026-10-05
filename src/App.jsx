import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { ServiceDetails } from "./pages/ServiceDetails";
import { WashService } from "./pages/WashService"; // Importamos a nova página

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* ROTA ESPECÍFICA: Intercepta o clique em "Lavagem Premium" */}
        <Route path="/servicos/lavagem-premium" element={<WashService />} />

        {/* ROTA DINÂMICA: Serve para os outros serviços que ainda não têm página própria */}
        <Route path="/servicos/:slug" element={<ServiceDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
