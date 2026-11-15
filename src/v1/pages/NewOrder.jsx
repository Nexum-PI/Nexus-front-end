import { useId, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Icon } from "../components/Icon";
import { PanelLayout } from "../components/PanelLayout";
import { SERVICES, findService } from "../data/services";
import "../styles/service.css";

// Abertura de ordem de serviço: só para a equipe (rota protegida).
// Campos, validação e mensagem são os mesmos das telas atuais
// (src/pages/*Service.jsx). O 4º campo muda conforme o serviço.
// Sem API ainda: o registro é simulado com um aviso.
const emptyForm = (fieldName) => ({
  cliente: "",
  telefone: "",
  modeloTenis: "",
  [fieldName]: "",
  previsaoEntrega: "",
  observacoes: "",
});

export function NewOrder() {
  const [params, setParams] = useSearchParams();
  const service = findService(params.get("servico")) ?? SERVICES[0];
  const { form } = service;

  return (
    <PanelLayout active="new">
      <div className="v1-panel__head">
        <div>
          <Link to="/gerenciamento" className="v1-order-back">
            <Icon name="arrowLeft" size={16} /> Visão geral
          </Link>
          <p className="v1-kicker">Painel da equipe</p>
          <h1 className="v1-panel__title">Nova ordem</h1>
        </div>
      </div>

      <fieldset className="v1-card v1-order-picker">
        <legend className="v1-card__title">Serviço</legend>
        <div className="v1-order-picker__list">
          {SERVICES.map((s) => (
            <label
              key={s.slug}
              className={`v1-order-picker__item ${s.slug === service.slug ? "is-active" : ""}`}
            >
              <input
                type="radio"
                name="servico"
                value={s.slug}
                checked={s.slug === service.slug}
                onChange={() => setParams({ servico: s.slug }, { replace: true })}
              />
              <span className="v1-order-picker__num">{s.number}</span>
              <span className="v1-order-picker__name">{s.title}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* key: ao trocar de serviço o formulário recomeça com os campos certos */}
      <OrderForm key={service.slug} service={service} form={form} />
    </PanelLayout>
  );
}

function OrderForm({ form }) {
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

    // Quando o pedidos-service existir, aqui entra o POST /api/orders.
    alert(form.success(formulario.cliente));
    setFormulario(emptyForm(form.field.name));
  };

  return (
    <section className="v1-card" aria-labelledby={id("titulo")}>
      <header className="v1-card__head">
        <h2 id={id("titulo")} className="v1-card__title">
          Dados da ordem · {form.title}
        </h2>
      </header>

      <form className="v1-order-form" onSubmit={handleSubmit}>
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

        <div className="v1-field v1-order-form__full">
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

        <div className="v1-order-form__full v1-order-form__actions">
          <button type="submit" className="v1-btn v1-btn--primary">
            Registrar Pedido
          </button>
        </div>
      </form>
    </section>
  );
}
