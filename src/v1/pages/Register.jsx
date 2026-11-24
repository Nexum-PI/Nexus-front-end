import { useId, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import { AuthShell } from "../components/AuthShell";
import { Icon } from "../components/Icon";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const maskPhone = (v) => {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
};
const maskCep = (v) => {
  const d = v.replace(/\D/g, "").slice(0, 8);
  return d.length > 5 ? `${d.slice(0, 5)}-${d.slice(5)}` : d;
};

// Validação só para dar retorno rápido; quem decide é o auth-service.
const validate = (f) => {
  const e = {};
  if (!f.nome.trim()) e.nome = "Informe o seu nome.";
  if (!f.email.trim()) e.email = "Informe o seu e-mail.";
  else if (!EMAIL_RE.test(f.email.trim())) e.email = "Digite um e-mail válido, como nome@email.com.";
  const tel = f.telefone.replace(/\D/g, "");
  if (tel.length < 10) e.telefone = "Telefone com DDD, ex.: (11) 90000-0000.";
  if (f.cep.replace(/\D/g, "").length !== 8) e.cep = "O CEP deve ter 8 números.";
  if (f.senha.length < 8) e.senha = "A senha deve ter pelo menos 8 caracteres.";
  if (f.confirmar !== f.senha) e.confirmar = "As senhas não são iguais.";
  if (!f.aceite) e.aceite = "É preciso aceitar a política de privacidade.";
  return e;
};

// Cadastro público: cria sempre uma conta de cliente e já entra na área dele.
export function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const uid = useId();
  const formRef = useRef(null);

  const [f, setF] = useState({
    nome: "", email: "", telefone: "", cep: "", senha: "", confirmar: "", aceite: false,
  });
  const [tocados, setTocados] = useState({});
  const [verSenha, setVerSenha] = useState(false);
  const [erro, setErro] = useState("");
  const [tremer, setTremer] = useState(false);
  const [enviando, setEnviando] = useState(false);

  const errors = validate(f);
  const mostrar = (campo) => (tocados[campo] ? errors[campo] : undefined);

  const set = (name, value) => {
    setF((prev) => ({ ...prev, [name]: value }));
    if (erro) setErro("");
  };
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") return set(name, checked);
    if (name === "telefone") return set(name, maskPhone(value));
    if (name === "cep") return set(name, maskCep(value));
    return set(name, value);
  };
  const handleBlur = (e) => setTocados((prev) => ({ ...prev, [e.target.name]: true }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTocados({ nome: true, email: true, telefone: true, cep: true, senha: true, confirmar: true, aceite: true });
    const first = Object.keys(errors)[0];
    if (first) {
      setTremer(true);
      formRef.current?.querySelector(`[name="${first}"]`)?.focus();
      return;
    }
    setEnviando(true);
    setErro("");
    try {
      await register({
        name: f.nome.trim(),
        email: f.email.trim(),
        phone: f.telefone,
        cep: f.cep,
        password: f.senha,
        acceptTerms: f.aceite,
      });
      navigate("/minha-conta", { replace: true });
    } catch (err) {
      setErro(
        err.status === 409
          ? "Já existe uma conta com esse e-mail. Tente entrar."
          : [401, 403, 404].includes(err.status)
            ? "O cadastro não está disponível neste servidor. Atualize o back-end (git pull e docker compose up -d --build)."
            : err.message,
      );
      setTremer(true);
    } finally {
      setEnviando(false);
    }
  };

  const field = (name, label, props, opts = {}) => {
    const msg = mostrar(name);
    return (
      <div className={`v1-field ${msg ? "has-error" : ""}`}>
        <label htmlFor={`${uid}-${name}`} className="v1-label">{label}</label>
        <div className="v1-input-wrap">
          {opts.icon && <Icon name={opts.icon} size={18} className="v1-input-wrap__icon" />}
          <input
            id={`${uid}-${name}`}
            name={name}
            value={f[name]}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`v1-input ${opts.icon ? "v1-input--icon" : ""} ${opts.action ? "v1-input--action" : ""}`}
            aria-invalid={Boolean(msg)}
            aria-describedby={msg ? `${uid}-${name}-erro` : undefined}
            {...props}
          />
          {opts.action}
        </div>
        {msg && (
          <p id={`${uid}-${name}-erro`} className="v1-field__error" role="alert">{msg}</p>
        )}
      </div>
    );
  };

  const toggleSenha = (
    <button
      type="button"
      className="v1-input-wrap__action"
      onClick={() => setVerSenha((v) => !v)}
      aria-label={verSenha ? "Ocultar senha" : "Mostrar senha"}
      aria-pressed={verSenha}
    >
      <Icon name={verSenha ? "eyeOff" : "eye"} size={18} />
    </button>
  );

  return (
    <AuthShell demoNote="Com a conta, você acompanha todos os pedidos num só lugar">
      <p className="v1-kicker v1-login__rise" style={{ "--d": "80ms" }}>Sua conta</p>
      <h1 className="v1-display v1-login__title v1-login__rise" style={{ "--d": "160ms" }}>
        Criar conta
      </h1>
      <p className="v1-login__sub v1-login__rise" style={{ "--d": "240ms" }}>
        Gratuita. Acompanhe cada etapa do seu tênis.
      </p>

      <form
        ref={formRef}
        className={`v1-login__form v1-register__form v1-login__rise ${tremer ? "is-shake" : ""}`}
        style={{ "--d": "320ms" }}
        onAnimationEnd={(e) => e.animationName === "v1-login-shake" && setTremer(false)}
        onSubmit={handleSubmit}
        noValidate
      >
        {field("nome", "Nome completo", { type: "text", autoComplete: "name", placeholder: "Seu nome" })}
        {field("email", "E-mail", { type: "email", autoComplete: "email", placeholder: "voce@email.com" }, { icon: "mail" })}
        <div className="v1-register__row">
          {field("telefone", "Telefone", { type: "tel", inputMode: "tel", autoComplete: "tel", placeholder: "(11) 90000-0000" })}
          {field("cep", "CEP", { type: "text", inputMode: "numeric", autoComplete: "postal-code", placeholder: "01310-100" })}
        </div>
        {field("senha", "Senha", { type: verSenha ? "text" : "password", autoComplete: "new-password", placeholder: "Mínimo de 8 caracteres" }, { icon: "lock", action: toggleSenha })}
        {field("confirmar", "Confirmar senha", { type: verSenha ? "text" : "password", autoComplete: "new-password", placeholder: "Repita a senha" }, { icon: "lock" })}

        <div className={`v1-field ${mostrar("aceite") ? "has-error" : ""}`}>
          <label className="v1-register__check">
            <input
              type="checkbox"
              name="aceite"
              checked={f.aceite}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <span>
              Concordo em ter meus dados tratados pela loja para atender meus pedidos, conforme a
              política de privacidade.
            </span>
          </label>
          {mostrar("aceite") && <p className="v1-field__error" role="alert">{errors.aceite}</p>}
        </div>

        {erro && (
          <p className="v1-login__error" role="alert">
            <Icon name="alert" size={18} />
            {erro}
          </p>
        )}

        <button type="submit" className="v1-btn v1-btn--primary v1-btn--block v1-login__submit" disabled={enviando}>
          {enviando ? (
            <><span className="v1-spinner" aria-hidden="true" /> Criando…</>
          ) : (
            <>Criar minha conta <Icon name="arrowRight" size={18} /></>
          )}
        </button>
      </form>

      <p className="v1-login__switch v1-login__rise" style={{ "--d": "400ms" }}>
        Já tem conta? <Link to="/login">Entrar</Link>
      </p>
    </AuthShell>
  );
}
