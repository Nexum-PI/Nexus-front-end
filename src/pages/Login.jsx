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

    // Em um cenário real, aqui entraria um fetch() ou axios.post() para a API.
    alert(`Bem-vindo de volta, ${formulario.email}!`);

    // Redireciona para a Home após o login
    navigate("/");
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <Link to="/" className="btn-back">
          &larr; Voltar para Home
        </Link>

        <h1>Entrar</h1>
        <p>Acesse sua conta para abrir e acompanhar seus pedidos.</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>E-mail</label>
            <input
              type="email"
              name="email"
              value={formulario.email}
              onChange={handleChange}
              placeholder="voce@email.com"
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
          Ainda não tem conta? <Link to="/cadastro">Cadastre-se</Link>
        </p>
      </div>
    </div>
  );
}