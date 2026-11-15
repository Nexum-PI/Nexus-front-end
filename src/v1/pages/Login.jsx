import { useId, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "../components/Icon";
import { ImageSlot } from "../components/ImageSlot";
import { Wordmark } from "../components/Wordmark";
import { MEDIA } from "../data/media";
import "../styles/site.css";
import "../styles/login.css";

// Área da equipe. O login continua simulado, como nas telas atuais:
// valida os campos e segue para o painel. Cliente não tem conta.
export function Login() {
  const navigate = useNavigate();
  const emailId = useId();
  const passwordId = useId();

  const [formulario, setFormulario] = useState({ email: "", senha: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formulario.email || !formulario.senha) {
      alert("Por favor, preencha o e-mail e a senha.");
      return;
    }

    // Em um cenário real, aqui entraria a chamada ao auth-service.
    // Os perfis da equipe (ADMIN, ATTENDANT e TECHNICIAN) são criados pelo administrador.
    alert(`Bem-vindo de volta, ${formulario.email}!`);
    navigate("/gerenciamento");
  };

  return (
    <div className="v1 v1-site v1-login">
      <aside className="v1-login__media">
        <ImageSlot slot={MEDIA.login} fill eager />
        <div className="v1-login__media-copy">
          <p className="v1-kicker">Bancada</p>
          <p className="v1-display v1-login__quote">Cada par registrado. Cada etapa visível.</p>
        </div>
      </aside>

      <main className="v1-login__main">
        <div className="v1-login__top">
          <Wordmark />
          <Link to="/" className="v1-login__back">
            <Icon name="arrowLeft" size={16} /> Voltar ao site
          </Link>
        </div>

        <div className="v1-login__panel">
          <p className="v1-kicker">Área da equipe</p>
          <h1 className="v1-display v1-login__title">Entrar</h1>
          <p className="v1-login__sub">Acesso para atendentes, técnicos e administradores.</p>

          <form className="v1-login__form" onSubmit={handleSubmit}>
            <div className="v1-field">
              <label htmlFor={emailId} className="v1-label">
                E-mail
              </label>
              <input
                id={emailId}
                type="email"
                name="email"
                className="v1-input"
                value={formulario.email}
                onChange={handleChange}
                placeholder="voce@nexum.com.br"
                autoComplete="username"
              />
            </div>

            <div className="v1-field">
              <label htmlFor={passwordId} className="v1-label">
                Senha
              </label>
              <input
                id={passwordId}
                type="password"
                name="senha"
                className="v1-input"
                value={formulario.senha}
                onChange={handleChange}
                placeholder="Sua senha"
                autoComplete="current-password"
              />
            </div>

            <button type="submit" className="v1-btn v1-btn--primary v1-btn--block">
              Entrar
              <Icon name="arrowRight" size={18} />
            </button>
          </form>

          <p className="v1-login__switch">
            É cliente? <Link to="/acompanhar">Acompanhe seu pedido</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
