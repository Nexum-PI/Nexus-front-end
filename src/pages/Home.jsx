import { Link } from 'react-router-dom';
import { Logo } from '../components/Logo';
import './Home.css';

export function Home() {
  // Estrutura de Dados dos serviços oferecidos
  const servicesList = [
    {
      id: 1,
      title: 'Lavagem Premium',
      description: 'Limpeza profunda e higienização interna com produtos específicos que não agridem o material original do seu sneaker.',
      icon: '🧼',
      path: '/servicos/lavagem-premium' 
    },
    {
      id: 2,
      title: 'Pintura & Restauração',
      description: 'Devolvemos a cor original de fábrica ou removemos arranhões e desgastes profundos do couro e camurça.',
      icon: '🎨',
      path: '/servicos/pintura-restauracao'
    },
    {
      id: 3,
      title: 'Troca de Solado',
      description: 'Solados amarelados, trincados ou esfarelando? Fazemos a substituição completa garantindo estrutura e conforto.',
      icon: '👟',
      path: '/servicos/troca-solado'
    },
    {
      id: 4,
      title: 'Customização',
      description: 'Transforme seu tênis em uma obra de arte exclusiva. Nossos artistas criam designs únicos de acordo com a sua ideia.',
      icon: '✨',
      path: '/servicos/customizacao'
    }
  ];

  return (
    <div className="home-container">
      {/* CABEÇALHO: o cliente consulta o pedido pelo código; a equipe entra pela Área da equipe */}
      <header className="home-header">
        <Link to="/" className="brand logo">
          <Logo size={48} />
          <span className="brand-name">NEXUM</span>
        </Link>
        <nav className="home-nav">
          <a href="#servicos">Serviços</a>

          {/* Link de acesso rápido para o Painel de Gerenciamento */}
          <Link to="/gerenciamento" style={{ fontWeight: '700' }}>
            Painel Admin
          </Link>

          <Link to="/login">Área da equipe</Link>
          <Link to="/acompanhar" className="btn-nav">Acompanhar pedido</Link>
        </nav>
      </header>

      <main className="home-main">
        <section className="hero-section">
          <h1>Nova vida para os seus <span className="text-accent">Sneakers</span></h1>
          <p>Especialistas na estética e restauração de tênis. Da lavagem minuciosa à customização exclusiva, cuidamos do seu par favorito.</p>
        </section>

        <section id="servicos" className="services-container">
          <h2 className="section-title">Nossos Serviços</h2>
          
          <div className="features-section">
            {servicesList.map((service) => (
              <div className="card" key={service.id}>
                <div className="card-icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                
                {/* Botão de redirecionamento para o serviço específico */}
                <Link to={service.path} className="btn-card">
                  Ver Detalhes &rarr;
                </Link>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="home-footer">
        <p>&copy; 2026 NEXUM · A Casa do Tênis. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}