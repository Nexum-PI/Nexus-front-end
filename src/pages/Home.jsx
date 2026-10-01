import { Link } from "react-router-dom"; // Importamos o Link para navegação SPA
import "./Home.css";

export function Home() {
  // Estrutura de Dados atualizada com o "path" (URL amigável)
  const servicesList = [
    {
      id: 1,
      title: "Lavagem Premium",
      description:
        "Limpeza profunda e higienização interna com produtos específicos que não agridem o material original do seu sneaker.",
      icon: "🧼",
      path: "/servicos/lavagem-premium", // Nova propriedade
    },
    {
      id: 2,
      title: "Pintura & Restauração",
      description:
        "Devolvemos a cor original de fábrica ou removemos arranhões e desgastes profundos do couro e camurça.",
      icon: "🎨",
      path: "/servicos/pintura-restauracao",
    },
    {
      id: 3,
      title: "Troca de Solado",
      description:
        "Solados amarelados, trincados ou esfarelando? Fazemos a substituição completa garantindo estrutura e conforto.",
      icon: "👟",
      path: "/servicos/troca-solado",
    },
    {
      id: 4,
      title: "Customização",
      description:
        "Transforme seu tênis em uma obra de arte exclusiva. Nossos artistas criam designs únicos de acordo com a sua ideia.",
      icon: "✨",
      path: "/servicos/customizacao",
    },
  ];

  return (
    <div className="home-container">
      <main className="home-main">
        <section className="hero-section">
          <h1>
            Nova vida para os seus <span className="text-accent">Sneakers</span>
          </h1>
          <p>
            Especialistas na estética e restauração de tênis. Da lavagem
            minuciosa à customização exclusiva, cuidamos do seu par favorito.
          </p>
        </section>

        <section id="servicos" className="services-container">
          <h2 className="section-title">Nossos Serviços</h2>

          <div className="features-section">
            {servicesList.map((service) => (
              <div className="card" key={service.id}>
                <div className="card-icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>

                {/* NOVO: Botão de redirecionamento */}
                <Link to={service.path} className="btn-card">
                  Ver Detalhes &rarr;
                </Link>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="home-footer">
        <p>&copy; 2026 Nexus Sneaker Care. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
