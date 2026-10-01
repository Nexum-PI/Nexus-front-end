import { Home } from "./pages/Home";
<<<<<<< Updated upstream
/* Você pode apagar o import do './App.css' original, ou mantê-lo se quiser regras globais.
   Para o nosso caso, o Home.css já está lidando com a Home. */

function App() {
  return (
    // Renderizamos o Componente Home que importamos acima
    <Home />
=======
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
>>>>>>> Stashed changes
  );
}

export default App;
