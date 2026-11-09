import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

export function Login() {
  const navigate = useNavigate();

  const [formulario, setFormulario] = useState({
    email: "",
    senha: "",
  });

  // Handler genérico para atualizar o estado do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validação simples (front-end)
    if (!formulario.email || !formulario.senha) {
      alert("Por favor, preencha o e-mail e a senha.");
      return;
    }

    // Em um cenário real, aqui entraria um fetch() ou axios.post() para o auth-service.
    // Os perfis da equipe (ADMIN, ATTENDANT e TECHNICIAN) são criados pelo administrador.
    alert(`Bem-vindo de volta, ${formulario.email}!`);

    // A equipe segue para o painel de gerenciamento
    navigate("/gerenciamento");
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <Link to="/" className="btn-back">
          &larr; Voltar para Home
        </Link>

        <h1>Área da equipe</h1>
        <p>Acesso para atendentes, técnicos e administradores.</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>E-mail</label>
            <input
              type="email"
              name="email"
              value={formulario.email}
              onChange={handleChange}
              placeholder="voce@nexum.com.br"
            />
          </div>

          <div className="form-group">
            <label>Senha</label>
            <input
              type="password"
              name="senha"
              value={formulario.senha}
              onChange={handleChange}
              placeholder="Sua senha"
            />
          </div>

          <button type="submit" className="btn-submit">
            Entrar
          </button>
        </form>

        <p className="auth-switch">
          É cliente? <Link to="/acompanhar">Acompanhe seu pedido</Link>
        </p>
      </div>
    </div>
  );
}