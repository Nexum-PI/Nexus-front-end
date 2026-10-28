import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

export function Register() {
  const navigate = useNavigate();

  const [formulario, setFormulario] = useState({
    nome: "",
    email: "",
    telefone: "",
    senha: "",
    confirmarSenha: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validações simples (front-end)
    if (!formulario.nome || !formulario.email || !formulario.senha) {
      alert("Por favor, preencha nome, e-mail e senha.");
      return;
    }

    if (formulario.senha.length < 6) {
      alert("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    if (formulario.senha !== formulario.confirmarSenha) {
      alert("As senhas não coincidem.");
      return;
    }

    // Em um cenário real, aqui entraria um fetch() ou axios.post() para a API.
    alert(`Conta de ${formulario.nome} criada com sucesso!`);

    // Depois de cadastrar, leva o usuário para a tela de Login
    navigate("/login");
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <Link to="/" className="btn-back">
          &larr; Voltar para Home
        </Link>

        <h1>Criar conta</h1>
        <p>Preencha os dados abaixo para se cadastrar.</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Nome completo</label>
            <input
              type="text"
              name="nome"
              value={formulario.nome}
              onChange={handleChange}
              placeholder="Seu nome e sobrenome"
            />
          </div>

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
            <label>Senha</label>
            <input
              type="password"
              name="senha"
              value={formulario.senha}
              onChange={handleChange}
              placeholder="Mínimo de 6 caracteres"
            />
          </div>

          <div className="form-group">
            <label>Confirmar senha</label>
            <input
              type="password"
              name="confirmarSenha"
              value={formulario.confirmarSenha}
              onChange={handleChange}
              placeholder="Repita a senha"
            />
          </div>

          <button type="submit" className="btn-submit">
            Criar conta
          </button>
        </form>

        <p className="auth-switch">
          Já tem conta? <Link to="/login">Entrar</Link>
        </p>
      </div>
    </div>
  );
}