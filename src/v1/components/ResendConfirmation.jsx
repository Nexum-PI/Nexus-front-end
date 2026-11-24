import { useEffect, useState } from "react";
import { useAuth } from "../auth/useAuth";

const WAIT = 60;

// Botão "Reenviar e-mail de confirmação". A API só reenvia a cada 60s, então a tela espera
// o mesmo tempo para não prometer um envio que não vai acontecer.
export function ResendConfirmation({ email, startWaiting = false }) {
  const { resendConfirmation } = useAuth();
  const [wait, setWait] = useState(startWaiting ? WAIT : 0);
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (wait <= 0) return undefined;
    const id = setTimeout(() => setWait((w) => w - 1), 1000);
    return () => clearTimeout(id);
  }, [wait]);

  const resend = async () => {
    setBusy(true);
    setMsg("");
    try {
      await resendConfirmation(email);
      setMsg("Se a conta existe, enviamos um novo e-mail. Veja também o spam.");
      setWait(WAIT);
    } catch (err) {
      setMsg(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="v1-confirm__resend">
      <button
        type="button"
        className="v1-btn v1-btn--outline v1-btn--sm"
        onClick={resend}
        disabled={busy || wait > 0}
      >
        {wait > 0 ? `Reenviar em ${wait}s` : "Reenviar e-mail"}
      </button>
      {msg && (
        <p className="v1-field__hint" role="status">
          {msg}
        </p>
      )}
    </div>
  );
}
