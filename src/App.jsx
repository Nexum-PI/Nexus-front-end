import { Home } from "./pages/Home";
import { ServiceDetails } from "./pages/ServiceDetails";
import { WashService } from './pages/WashService';
function App() {
  return (
    <><div>
      <WashService />
    </div>
      <BrowserRouter>
        {/* Routes é onde definimos nossos caminhos */}
        <Routes>
          {/* Rota principal (Home) */}
          <Route path="/" element={<Home />} />

          {/* Rota dinâmica. O ":slug" atua como uma variável na URL */}
          <Route path="/servicos/:slug" element={<ServiceDetails />} />
        </Routes>
      </BrowserRouter></>
  );
}

export default App;
