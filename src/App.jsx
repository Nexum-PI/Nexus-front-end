import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { ServiceDetails } from "./pages/ServiceDetails";

function App() {
  return (
    // BrowserRouter "envolve" a aplicação para que ela consiga ler a URL do navegador
    <BrowserRouter>
      {/* Routes é onde definimos nossos caminhos */}
      <Routes>
        {/* Rota principal (Home) */}
        <Route path="/" element={<Home />} />

        {/* Rota dinâmica. O ":slug" atua como uma variável na URL */}
        <Route path="/servicos/:slug" element={<ServiceDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
