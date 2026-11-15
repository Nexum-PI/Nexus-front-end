import { Link } from "react-router-dom";
import { Logo } from "../../components/Logo";

// Selo + nome da loja. O selo é o mesmo do guia visual (src/components/Logo.jsx).
export function Wordmark({ size = 38, to = "/", sub = "NEXUM" }) {
  return (
    <Link to={to} className="v1-wordmark" aria-label="A Casa do Tênis, página inicial">
      <span className="v1-wordmark__seal" aria-hidden="true">
        <Logo size={size} />
      </span>
      <span className="v1-wordmark__text" aria-hidden="true">
        <span className="v1-wordmark__name">A Casa do Tênis</span>
        {sub && <span className="v1-wordmark__sub">{sub}</span>}
      </span>
    </Link>
  );
}
