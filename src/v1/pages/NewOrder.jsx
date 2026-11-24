import { useId, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useOrders } from "../../context/useOrders";
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
  email: "",
  cep: "",
  modeloTenis: "",
  [fieldName]: "",
  previsaoEntrega: "",
  valor: "",
  observacoes: "",
});

// Aceita "150", "150,00" ou "1.250,50" e devolve número (ou NaN)
const parseValor = (texto) => Number(String(texto).replace(/\./g, "").replace(",", "."));

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

function OrderForm({ service, form }) {
  const { createOrder } = useOrders();
  const [enviando, setEnviando] = useState(false);
  const [criado, setCriado] = useState(null);
  const [formulario, setFormulario] = useState(() => emptyForm(form.field.name));
  const uid = useId();
  const id = (name) => `${uid}-${name}`;

  const handleChange = (e) => {
    const { name } = e.target;
    let { value } = e.target;
    // CEP com máscara 00000-000
    if (name === "cep") {
      const d = value.replace(/\D/g, "").slice(0, 8);
      value = d.length > 5 ? `${d.slice(0, 5)}-${d.slice(5)}` : d;
    }
    setFormulario((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formulario.cliente || !formulario.modeloTenis) {
      alert("Por favor, preencha o nome do cliente e o modelo do tênis.");
      return;
    }

    if (formulario.cep.replace(/\D/g, "").length !== 8) {
      alert("Por favor, informe o CEP do cliente (8 números).");
      return;
    }

    const valor = parseValor(formulario.valor);
    if (!formulario.valor || Number.isNaN(valor) || valor <= 0) {
      alert("Por favor, informe o valor do serviço.");
      return;
    }

    if (!formulario.previsaoEntrega) {
      alert("Por favor, informe a previsão de entrega.");
      return;
    }

    // Grava no pedidos-service (POST /api/orders); a API gera o código NX-...
    setEnviando(true);
    try {
      const pedido = await createOrder({
        customerName: formulario.cliente.trim(),
        customerPhone: formulario.telefone.trim() || null,
        customerEmail: formulario.email.trim() || null,
        customerCep: formulario.cep,
        expectedAt: formulario.previsaoEntrega,
        notes: formulario.observacoes.trim() || null,
        items: [
          {
            shoe: formulario.modeloTenis.trim(),
            service: service.title,
            price: valor,
            detail: formulario[form.field.name]?.trim() || null,
          },
        ],
      });
      setCriado(pedido.code);
      alert(`${form.success(formulario.cliente)} Código: ${pedido.code}`);
      setFormulario(emptyForm(form.field.name));
    } catch (err) {
      alert(`Não foi possível registrar o pedido: ${err.message}`);
    } finally {
      setEnviando(false);
    }
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
          <label htmlFor={id("email")} className="v1-label">
            E-mail da conta do cliente (opcional)
          </label>
          <input
            id={id("email")}
            className="v1-input"
            type="email"
            name="email"
            value={formulario.email}
            onChange={handleChange}
            placeholder="cliente@email.com"
            autoComplete="off"
          />
          <p className="v1-field__hint">
            Se o cliente tem conta, o pedido aparece em &ldquo;Meus pedidos&rdquo; dele.
          </p>
        </div>

        <div className="v1-field">
          <label htmlFor={id("cep")} className="v1-label">
            CEP do cliente
          </label>
          <input
            id={id("cep")}
            className="v1-input v1-mono"
            type="text"
            inputMode="numeric"
            name="cep"
            value={formulario.cep}
            onChange={handleChange}
            placeholder="00000-000"
            autoComplete="off"
            required
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

        <div className="v1-field">
          <label htmlFor={id("valor")} className="v1-label">
            Valor (R$)
          </label>
          <input
            id={id("valor")}
            className="v1-input"
            type="text"
            inputMode="decimal"
            name="valor"
            value={formulario.valor}
            onChange={handleChange}
            placeholder="Ex: 150,00"
            autoComplete="off"
            required
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
          <button type="submit" className="v1-btn v1-btn--primary" disabled={enviando}>
            {enviando ? "Registrando…" : "Registrar Pedido"}
          </button>
          {criado && (
            <Link to={`/acompanhar/${criado}`} className="v1-link-arrow">
              Ver pedido {criado} <Icon name="arrowRight" size={16} />
            </Link>
          )}
        </div>
      </form>
    </section>
  );
}
