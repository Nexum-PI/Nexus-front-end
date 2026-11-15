import { Footer } from "./Footer";
import { AnnouncementBar, Navbar } from "./Navbar";
import "../styles/site.css";

// Moldura das páginas públicas: faixa de aviso, navbar, conteúdo e rodapé.
export function SiteLayout({ children, className = "" }) {
  return (
    <div className={`v1 v1-site ${className}`}>
      <a href="#conteudo" className="v1-skip">
        Pular para o conteúdo
      </a>
      <AnnouncementBar />
      <Navbar />
      <main id="conteudo" tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
