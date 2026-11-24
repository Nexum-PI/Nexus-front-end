import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import { AuthShell } from "../components/AuthShell";
import { Icon } from "../components/Icon";
import { ResendConfirmation } from "../components/ResendConfirmation";

// Página aberta pelo link do e-mail (/confirmar-email?token=...). Confirma a conta e já entra.
export function ConfirmEmail() {
  const [params] = useSearchParams();
  const token = params.get("token");
  const navigate = useNavigate();
  const { confirmEmail } = useAuth();
  const [state, setState] = useState(token ? "loading" : "error");
  const [error, setError] = useState(token ? "" : "Link incompleto. Abra o link direto do e-mail.");
  const [email, setEmail] = useState("");
  const started = useRef(false);

  useEffect(() => {
    // O link vale uma vez só: evita a segunda chamada do modo de desenvolvimento
    if (!token || started.current) return;
    started.current = true;
    confirmEmail(token)
      .then(() => {
        setState("ok");
        setTimeout(() => navigate("/minha-conta", { replace: true }), 1400);
      })
      .catch((err) => {
        setError(err.message);
        setState("error");
      });
  }, [token, confirmEmail, navigate]);

  return (
    <AuthShell demoNote="Com a conta, você acompanha todos os pedidos num só lugar">
      <p className="v1-kicker v1-login__rise" style={{ "--d": "80ms" }}>Sua conta</p>

      {state === "loading" && (
        <>
          <h1 className="v1-display v1-login__title v1-login__rise" style={{ "--d": "160ms" }}>
            Confirmando…
          </h1>
          <p className="v1-login__sub" role="status">
            <span className="v1-spinner" aria-hidden="true" /> Só um instante.
          </p>
        </>
      )}

      {state === "ok" && (
        <>
          <h1 className="v1-display v1-login__title v1-login__rise" style={{ "--d": "160ms" }}>
            E-mail confirmado!
          </h1>
          <p className="v1-login__sub" role="status">
            <Icon name="check" size={18} /> Sua conta está ativa. Levando você para a sua área…
          </p>
        </>
      )}

      {state === "error" && (
        <>
          <h1 className="v1-display v1-login__title v1-login__rise" style={{ "--d": "160ms" }}>
            Link inválido
          </h1>
          <p className="v1-login__error" role="alert">
            <Icon name="alert" size={18} />
            {error}
          </p>
          <div className="v1-field">
            <label htmlFor="confirm-email" className="v1-label">
              Seu e-mail de cadastro
            </label>
            <input
              id="confirm-email"
              type="email"
              className="v1-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="voce@email.com"
              autoComplete="email"
            />
          </div>
          <ResendConfirmation email={email} />
          <p className="v1-login__switch">
            Já confirmou? <Link to="/login">Entrar</Link>
          </p>
        </>
      )}
    </AuthShell>
  );
}
