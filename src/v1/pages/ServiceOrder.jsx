import { useId, useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "../components/Icon";
import { ImageSlot } from "../components/ImageSlot";
import { ScheduleButton } from "../components/ScheduleButton";
import { SiteLayout } from "../components/SiteLayout";
import { MEDIA } from "../data/media";
import { findService } from "../data/services";
import "../styles/service.css";

// Página de cada serviço: apresentação no topo e, abaixo, o formulário de
// abertura de ordem usado pela equipe. Campos, validação e mensagem são os
// mesmos das telas atuais (src/pages/*Service.jsx).
const emptyForm = (fieldName) => ({
  cliente: "",
  telefone: "",
  modeloTenis: "",
  [fieldName]: "",
  previsaoEntrega: "",
  observacoes: "",
});

export function ServiceOrder({ slug }) {
  const service = findService(slug);
  const { form } = service;
  const [formulario, setFormulario] = useState(() => emptyForm(form.field.name));
  const uid = useId();
  const id = (name) => `${uid}-${name}`;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formulario.cliente || !formulario.modeloTenis) {
      alert("Por favor, preencha o nome do cliente e o modelo do tênis.");
      return;
    }

    // Sem API ainda: simula o registro com um aviso, como nas telas atuais.
    alert(form.success(formulario.cliente));
    setFormulario(emptyForm(form.field.name));
  };

  return (
    <SiteLayout>
      <section className="v1-svc-hero" aria-labelledby="v1-svc-title">
        <div className="v1-svc-hero__media">
          <ImageSlot slot={MEDIA.services[service.slug]} fill eager />
          <div className="v1-svc-hero__scrim" aria-hidden="true" />
        </div>
        <div className="v1-container v1-svc-hero__content">
          <Link to="/#servicos" className="v1-svc-back">
            <Icon name="arrowLeft" size={16} /> Todos os serviços
          </Link>
          <p className="v1-kicker">Serviço {service.number}</p>
          <h1 id="v1-svc-title" className="v1-display v1-svc-hero__title">
            {service.title}
          </h1>
          <p className="v1-svc-hero__line">{service.line}</p>
          <ScheduleButton />
        </div>
      </section>

      <section className="v1-container v1-svc-form-wrap" aria-labelledby="v1-svc-form-title">
        <header className="v1-svc-form-head">
          <p className="v1-kicker v1-kicker--muted">Uso da equipe</p>
          <h2 id="v1-svc-form-title" className="v1-display v1-svc-form-title">
            Abrir ordem de serviço
          </h2>
          <p className="v1-svc-form-sub">
            {form.title}. Preencha os dados abaixo para registrar uma nova ordem.
          </p>
        </header>

        <form className="v1-svc-form" onSubmit={handleSubmit}>
          <div className="v1-field">
            <label htmlFor={id("cliente")} className="v1-label">
              Cliente
            </label>
            <input
              id={id("cliente")}
              className="v1-input"
              type="text"
              name="cliente"
              value={formulario.cliente}
              onChange={handleChange}
              placeholder="Nome completo"
              autoComplete="off"
            />
          </div>

          <div className="v1-field">
            <label htmlFor={id("telefone")} className="v1-label">
              Telefone
            </label>
            <input
              id={id("telefone")}
              className="v1-input"
              type="text"
              inputMode="tel"
              name="telefone"
              value={formulario.telefone}
              onChange={handleChange}
              placeholder="(11) 90000-0000"
              autoComplete="off"
            />
          </div>

          <div className="v1-field">
            <label htmlFor={id("modeloTenis")} className="v1-label">
              Modelo do Tênis
            </label>
            <input
              id={id("modeloTenis")}
              className="v1-input"
              type="text"
              name="modeloTenis"
              value={formulario.modeloTenis}
              onChange={handleChange}
              placeholder={form.modelPlaceholder}
            />
          </div>

          <div className="v1-field">
            <label htmlFor={id(form.field.name)} className="v1-label">
              {form.field.label}
            </label>
            <input
              id={id(form.field.name)}
              className="v1-input"
              type="text"
              name={form.field.name}
              value={formulario[form.field.name]}
              onChange={handleChange}
              placeholder={form.field.placeholder}
            />
          </div>

          <div className="v1-field">
            <label htmlFor={id("previsaoEntrega")} className="v1-label">
              Previsão de Entrega
            </label>
            <input
              id={id("previsaoEntrega")}
              className="v1-input"
              type="date"
              name="previsaoEntrega"
              value={formulario.previsaoEntrega}
              onChange={handleChange}
            />
          </div>

          <div className="v1-field v1-svc-form__full">
            <label htmlFor={id("observacoes")} className="v1-label">
              Observações Adicionais
            </label>
            <textarea
              id={id("observacoes")}
              className="v1-input"
              name="observacoes"
              value={formulario.observacoes}
              onChange={handleChange}
              rows="4"
              placeholder={form.notesPlaceholder}
            />
          </div>

          <div className="v1-svc-form__full v1-svc-form__actions">
            <button type="submit" className="v1-btn v1-btn--primary">
              Registrar Pedido
            </button>
            <Link to="/gerenciamento" className="v1-link-arrow">
              Ir para o painel <Icon name="arrowRight" size={16} />
            </Link>
          </div>
        </form>
      </section>
    </SiteLayout>
  );
}
