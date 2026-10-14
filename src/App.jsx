import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { ServiceDetails } from './pages/ServiceDetails';
import { WashService } from './pages/WashService';
import { Management } from './pages/Management'; // <-- 1. Importar a nova página

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        
        {/* <-- 2. Adicionar a rota do Painel Admin --> */}
        <Route path="/gerenciamento" element={<Management />} />
        
        <Route path="/servicos/lavagem-premium" element={<WashService />} />
        <Route path="/servicos/:slug" element={<ServiceDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;