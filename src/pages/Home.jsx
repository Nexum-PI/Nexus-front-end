import React from "react";
import "./Home.css"; // Importamos o CSS exclusivo desta página

export function Home() {
  return (
    <div className="home-container">
      {/* HEADER: Elemento de navegação no topo */}
      <header className="home-header">
        <h2 className="logo">NEXUS</h2>
        <nav className="home-nav">
          <a href="#">Início</a>
          <a href="#">Sobre</a>
          <a href="#">Contato</a>
          <button className="btn-outline">Login</button>
        </nav>
      </header>

      {/* MAIN: O conteúdo principal da página */}
      <main className="home-main">
        {/* Hero Section: A seção principal de chamariz do site */}
        <section className="hero-section">
          <h1>
            Bem-vindo ao <span className="text-accent">Nexus</span>
          </h1>
          <p>
            Esta é uma página inicial padrão estruturada com elementos clássicos
            de Engenharia Front-end. Pronta para receber suas cores e regras de
            negócio.
          </p>
          <div className="hero-buttons">
            <button className="btn-primary">Começar Agora</button>
            <button className="btn-secondary">Saiba Mais</button>
          </div>
        </section>

        {/* Cards Section: Elementos em grade (Grid) para exibir recursos */}
        <section className="features-section">
          <div className="card">
            <h3>Arquitetura Limpa</h3>
            <p>
              Componentes separados e responsabilidade única facilitam a
              manutenção do código.
            </p>
          </div>
          <div className="card">
            <h3>Design Tokens</h3>
            <p>
              Utilização de variáveis CSS para facilitar a mudança global de
              cores da interface.
            </p>
          </div>
          <div className="card">
            <h3>Alta Performance</h3>
            <p>
              Construído com Vite e React, garantindo carregamento rápido no
              Client-Side.
            </p>
          </div>
        </section>
      </main>

      {/* FOOTER: Rodapé da página */}
      <footer className="home-footer">
        <p>&copy; 2026 Nexus-PI. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
