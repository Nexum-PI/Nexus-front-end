import { useParams, Link } from "react-router-dom";

export function ServiceDetails() {
  // O hook useParams extrai o valor da URL.
  // Ex: Se a URL for /servicos/lavagem-premium, o 'slug' será 'lavagem-premium'.
  const { slug } = useParams();

  return (
    <div
      style={{ padding: "40px", textAlign: "center", color: "var(--text-h)" }}
    >
      <h1>Detalhes do Serviço</h1>

      {/* Exibindo dinamicamente o parâmetro da URL */}
      <p
        style={{
          fontSize: "1.2rem",
          marginBottom: "30px",
          color: "var(--accent)",
        }}
      >
        Você acessou a rota: /servicos/{slug}
      </p>

      <Link
        to="/"
        style={{
          color: "#fff",
          backgroundColor: "var(--accent)",
          padding: "10px 20px",
          textDecoration: "none",
          borderRadius: "8px",
        }}
      >
        &larr; Voltar para o Início
      </Link>
    </div>
  );
}
