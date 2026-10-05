import { useState } from "react";
import { Link } from "react-router-dom";
import "./WashService.css";

export function WashService() {
  // Refatoração do Estado: Removemos as propriedades 'corTenis', 'incluiPalmilhaCadarco'
  // e propriedades irrelevantes agora que não há mais tabela de exibição.
  const [formulario, setFormulario] = useState({
    cliente: "",
    telefone: "",
    modeloTenis: "",
    material: "", // Agora iniciamos como string vazia, pois será um campo de texto
    previsaoEntrega: "",
    observacoes: "",
  });

  // Função manipuladora (Handler) genérica para atualizar o estado do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Função engatilhada ao clicar em "Registrar Pedido"
  const handleSubmit = (e) => {
    e.preventDefault(); // Impede o comportamento padrão do navegador de recarregar a página

    // Validação Simples (Front-end Validation)
    if (!formulario.cliente || !formulario.modeloTenis) {
      alert("Por favor, preencha o nome do cliente e o modelo do tênis.");
      return;
    }

    // Como removemos a tabela, vamos simular o sucesso da operação emitindo um alerta.
    // Em um cenário real de Full-stack, aqui entraria um comando fetch() ou axios.post()
    // enviando esses dados para o Banco de Dados via API.
    alert(
      `Pedido de lavagem para ${formulario.cliente} registrado com sucesso!`,
    );

    // Reseta o formulário para o estado inicial, limpando os campos
    setFormulario({
      cliente: "",
      telefone: "",
      modeloTenis: "",
      material: "",
      previsaoEntrega: "",
      observacoes: "",
    });
  };

  return (
    <div className="wash-service-container">
      {/* Cabeçalho */}
      <header className="wash-service-header">
        <Link to="/" className="btn-back">
          &larr; Voltar para Home
        </Link>
        <h1>Painel de Lavagem Premium</h1>
        <p>
          Preencha os dados abaixo para registrar uma nova ordem de serviço.
        </p>
      </header>

      {/* Formulário de Novo Pedido */}
      <div className="wash-form-card">
        <h2>Abrir Nova Ordem de Serviço</h2>
        <form onSubmit={handleSubmit} className="form-grid">
          <div className="form-group">
            <label>Cliente</label>
            <input
              type="text"
              name="cliente"
              value={formulario.cliente}
              onChange={handleChange}
              placeholder="Nome completo"
            />
          </div>

          <div className="form-group">
            <label>Telefone</label>
            <input
              type="text"
              name="telefone"
              value={formulario.telefone}
              onChange={handleChange}
              placeholder="(11) 90000-0000"
            />
          </div>

          <div className="form-group">
            <label>Modelo do Tênis</label>
            <input
              type="text"
              name="modeloTenis"
              value={formulario.modeloTenis}
              onChange={handleChange}
              placeholder="Ex: Nike Dunk Low"
            />
          </div>

          {/* O campo material agora é um input de texto padrão */}
          <div className="form-group">
            <label>Material</label>
            <input
              type="text"
              name="material"
              value={formulario.material}
              onChange={handleChange}
              placeholder="Ex: Camurça, Couro, Malha"
            />
          </div>

          <div className="form-group">
            <label>Previsão de Entrega</label>
            <input
              type="date"
              name="previsaoEntrega"
              value={formulario.previsaoEntrega}
              onChange={handleChange}
            />
          </div>

          <div className="form-group full-width">
            <label>Observações Adicionais</label>
            <textarea
              name="observacoes"
              value={formulario.observacoes}
              onChange={handleChange}
              rows="4"
              placeholder="Detalhes como: manchas profundas, rasgos, cuidados especiais, etc."
            ></textarea>
          </div>

          <div className="full-width">
            <button type="submit" className="btn-submit">
              Registrar Pedido
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
