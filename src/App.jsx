import { Home } from "./pages/Home";
/* Você pode apagar o import do './App.css' original, ou mantê-lo se quiser regras globais.
   Para o nosso caso, o Home.css já está lidando com a Home. */

function App() {
  return (
    // Renderizamos o Componente Home que importamos acima
    <Home />
  );
}

export default App;
