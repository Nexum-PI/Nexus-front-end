import { Link, useParams } from "react-router-dom";
import { Icon } from "../components/Icon";
import { ScheduleButton } from "../components/ScheduleButton";
import { SiteLayout } from "../components/SiteLayout";
import { SERVICES } from "../data/services";
import "../styles/service.css";

// Rota dinâmica /servicos/:slug, para serviços sem página própria.
// Mostra o endereço acessado e leva aos serviços existentes.
export function ServiceDetails() {
  const { slug } = useParams();

  return (
    <SiteLayout>
      <div className="v1-theme-paper">
        <section className="v1-container v1-svc-missing" aria-labelledby="v1-missing-title">
          <p className="v1-kicker">Detalhes do serviço</p>
          <h1 id="v1-missing-title" className="v1-display v1-svc-missing__title">
            Serviço sob consulta.
          </h1>
          <p className="v1-lead">
            Você acessou <span className="v1-mono">/servicos/{slug}</span>. Este serviço ainda não
            tem página própria. Fale com a loja ou veja os serviços abaixo.
          </p>
          <ScheduleButton />

          <ul className="v1-svc-missing__list">
            {SERVICES.map((service) => (
              <li key={service.slug}>
                <Link to={service.path} className="v1-svc-missing__link">
                  <span className="v1-display v1-svc-missing__num">{service.number}</span>
                  <span className="v1-svc-missing__name">{service.title}</span>
                  <Icon name="arrowRight" size={20} />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </SiteLayout>
  );
}
