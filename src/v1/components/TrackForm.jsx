import { useId, useState } from "react";
import { useNavigate } from "react-router-dom";
import { normalizeCode } from "../../data/orders";
import { Icon } from "./Icon";

// Campo de código do pedido. Leva a /acompanhar/:code.
export function TrackForm({ initialCode = "", buttonLabel = "Consultar", compact = false }) {
  const [code, setCode] = useState(initialCode);
  const navigate = useNavigate();
  const inputId = useId();
  const hintId = useId();

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = normalizeCode(code);
    if (!value) return;
    navigate(`/acompanhar/${encodeURIComponent(value)}`);
  };

  return (
    <form
      className={`v1-track-form ${compact ? "v1-track-form--compact" : ""}`}
      onSubmit={handleSubmit}
      role="search"
    >
      <label htmlFor={inputId} className="v1-label">
        Código do pedido
      </label>
      <div className="v1-track-form__row">
        <input
          id={inputId}
          type="text"
          className="v1-input v1-mono v1-track-form__input"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="NX-2026-000123"
          autoComplete="off"
          spellCheck="false"
          aria-describedby={hintId}
        />
        <button type="submit" className="v1-btn v1-btn--primary">
          {buttonLabel}
          <Icon name="arrowRight" size={18} />
        </button>
      </div>
      <p id={hintId} className="v1-track-form__hint">
        O código está no comprovante que você recebeu ao deixar o tênis.
      </p>
    </form>
  );
}
