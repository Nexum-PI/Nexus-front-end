import { useId, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import { Icon } from "../components/Icon";
import { ImageSlot } from "../components/ImageSlot";
import { Wordmark } from "../components/Wordmark";
import { MEDIA } from "../data/media";
import "../styles/site.css";
import "../styles/login.css";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Etapas do card de demonstração (mesma sequência do acompanhamento do cliente)
const DEMO_STEPS = ["Recebido", "Higienização", "Pronto", "Entregue"];

// Validação no front só para dar retorno rápido a quem digita.
// Quem decide se a pessoa entra é o auth-service (e-mail, senha e conta ativa).
const validate = ({ email, senha }) => {
  const errors = {};
  if (!email.trim()) errors.email = "Informe o seu e-mail.";
  else if (!EMAIL_RE.test(email.trim()))
    errors.email = "Digite um e-mail válido, como nome@acasadotenis.com.br.";
  if (!senha) errors.senha = "Informe a sua senha.";
  return errors;
};

// Área da equipe. Cliente não tem conta.
// Envia e-mail e senha ao auth-service, que devolve o token (JWT) da sessão.
export function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  // Volta para a tela que a pessoa tentou abrir antes de entrar
  const from = location.state?.from;
  const destino = from
    ? `${from.pathname}${from.search ?? ""}${from.hash ?? ""}`
    : "/gerenciamento";

  const uid = useId();
  const emailRef = useRef(null);
  const senhaRef = useRef(null);

  const [formulario, setFormulario] = useState({ email: "", senha: "" });
  const [tocados, setTocados] = useState({});
  const [verSenha, setVerSenha] = useState(false);
  const [capsLock, setCapsLock] = useState(false);
  const [erro, setErro] = useState("");
  const [tremer, setTremer] = useState(false);
  const [enviando, setEnviando] = useState(false);

  const errors = validate(formulario);
  const mostrar = (campo) => (tocados[campo] ? errors[campo] : undefined);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario((prev) => ({ ...prev, [name]: value }));
    if (erro) setErro("");
  };

  const handleBlur = (e) => setTocados((prev) => ({ ...prev, [e.target.name]: true }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTocados({ email: true, senha: true });

    if (errors.email || errors.senha) {
      setTremer(true);
      (errors.email ? emailRef : senhaRef).current?.focus();
      return;
    }

    setEnviando(true);
    setErro("");
    try {
      await login(formulario.email.trim(), formulario.senha);
      navigate(destino, { replace: true });
    } catch (err) {
      setErro(err.message);
      setTremer(true);
    } finally {
      setEnviando(false);
    }
  };

  const emailErro = mostrar("email");
  const senhaErro = mostrar("senha");

  return (
    <div className="v1 v1-site v1-login">
      <aside className="v1-login__media" aria-label="A Casa do Tênis">
        <ImageSlot slot={MEDIA.login} fill eager showLabel={false} />
        <div className="v1-login__veil" aria-hidden="true" />
        <div className="v1-login__sweep" aria-hidden="true" />

        <div className="v1-login__media-copy">
          <p className="v1-kicker v1-login__rise" style={{ "--d": "100ms" }}>
            Bancada
          </p>
          <p className="v1-display v1-login__quote v1-login__rise" style={{ "--d": "220ms" }}>
            Cada par registrado. Cada etapa visível.
          </p>

          {/* Card de demonstração: o cliente acompanha assim */}
          <div
            className="v1-login__demo v1-login__rise"
            style={{ "--d": "420ms" }}
            role="img"
            aria-label="Exemplo do acompanhamento de um pedido, passando de recebido a entregue"
          >
            <div className="v1-login__demo-head">
              <span className="v1-mono v1-login__demo-code">NX-2026-000123</span>
              <span className="v1-login__demo-chip">
                {DEMO_STEPS.map((label, i) => (
                  <span key={label} className={`v1-login__demo-chip-text is-${i + 1}`}>
                    {label}
                  </span>
                ))}
              </span>
            </div>
            <div className="v1-login__demo-track">
              <span className="v1-login__demo-fill" />
              {DEMO_STEPS.map((label, i) => (
                <span key={label} className={`v1-login__demo-dot is-${i + 1}`}>
                  <i />
                  <b>{label}</b>
                </span>
              ))}
            </div>
            <p className="v1-login__demo-note">
              <Icon name="track" size={14} /> O cliente acompanha cada etapa pelo código do pedido
            </p>
          </div>
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
          <p className="v1-kicker v1-login__rise" style={{ "--d": "80ms" }}>
            Área da equipe
          </p>
          <h1 className="v1-display v1-login__title v1-login__rise" style={{ "--d": "160ms" }}>
            Entrar
          </h1>
          <p className="v1-login__sub v1-login__rise" style={{ "--d": "240ms" }}>
            Acesso para atendentes, técnicos e administradores.
          </p>
          {from && (
            <p className="v1-login__notice v1-login__rise" style={{ "--d": "280ms" }} role="status">
              Entre para acessar o painel da equipe.
            </p>
          )}

          <form
            className={`v1-login__form v1-login__rise ${tremer ? "is-shake" : ""}`}
            style={{ "--d": "320ms" }}
            onAnimationEnd={(e) => e.animationName === "v1-login-shake" && setTremer(false)}
            onSubmit={handleSubmit}
            noValidate
          >
            <div className={`v1-field ${emailErro ? "has-error" : ""}`}>
              <label htmlFor={`${uid}-email`} className="v1-label">
                E-mail
              </label>
              <div className="v1-input-wrap">
                <Icon name="mail" size={18} className="v1-input-wrap__icon" />
                <input
                  ref={emailRef}
                  id={`${uid}-email`}
                  type="email"
                  name="email"
                  className="v1-input v1-input--icon"
                  value={formulario.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="voce@acasadotenis.com.br"
                  autoComplete="username"
                  aria-invalid={Boolean(emailErro)}
                  aria-describedby={emailErro ? `${uid}-email-erro` : undefined}
                />
              </div>
              {emailErro && (
                <p id={`${uid}-email-erro`} className="v1-field__error" role="alert">
                  {emailErro}
                </p>
              )}
            </div>

            <div className={`v1-field ${senhaErro ? "has-error" : ""}`}>
              <label htmlFor={`${uid}-senha`} className="v1-label">
                Senha
              </label>
              <div className="v1-input-wrap">
                <Icon name="lock" size={18} className="v1-input-wrap__icon" />
                <input
                  ref={senhaRef}
                  id={`${uid}-senha`}
                  type={verSenha ? "text" : "password"}
                  name="senha"
                  className="v1-input v1-input--icon v1-input--action"
                  value={formulario.senha}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onKeyUp={(e) => setCapsLock(e.getModifierState?.("CapsLock") ?? false)}
                  placeholder="Sua senha"
                  autoComplete="current-password"
                  aria-invalid={Boolean(senhaErro)}
                  aria-describedby={senhaErro ? `${uid}-senha-erro` : undefined}
                />
                <button
                  type="button"
                  className="v1-input-wrap__action"
                  onClick={() => setVerSenha((v) => !v)}
                  aria-label={verSenha ? "Ocultar senha" : "Mostrar senha"}
                  aria-pressed={verSenha}
                >
                  <Icon name={verSenha ? "eyeOff" : "eye"} size={18} />
                </button>
              </div>
              {senhaErro && (
                <p id={`${uid}-senha-erro`} className="v1-field__error" role="alert">
                  {senhaErro}
                </p>
              )}
              {capsLock && !senhaErro && (
                <p className="v1-field__hint" role="status">
                  <Icon name="alert" size={14} /> Caps Lock está ativado.
                </p>
              )}
            </div>

            {erro && (
              <p className="v1-login__error" role="alert">
                <Icon name="alert" size={18} />
                {erro}
              </p>
            )}

            <button
              type="submit"
              className="v1-btn v1-btn--primary v1-btn--block v1-login__submit"
              disabled={enviando}
            >
              {enviando ? (
                <>
                  <span className="v1-spinner" aria-hidden="true" /> Entrando…
                </>
              ) : (
                <>
                  Entrar
                  <Icon name="arrowRight" size={18} />
                </>
              )}
            </button>
          </form>

          <p className="v1-login__switch v1-login__rise" style={{ "--d": "400ms" }}>
            É cliente? <Link to="/acompanhar">Acompanhe seu pedido</Link>
          </p>

          <p className="v1-login__secure v1-login__rise" style={{ "--d": "460ms" }}>
            <Icon name="shield" size={16} />
            Acesso restrito à equipe. A sessão expira em 10 horas.
          </p>
        </div>
      </main>
    </div>
  );
}
