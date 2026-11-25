import { useCallback, useEffect, useId, useState } from "react";
import { Link } from "react-router-dom";
import { formatDate, isLate, normalizeCode } from "../../data/orders";
import { api } from "../api/client";
import { useAuth } from "../auth/useAuth";
import { Icon } from "../components/Icon";
import { SiteLayout } from "../components/SiteLayout";
import { StatusChip } from "../components/StatusChip";
import { StatusStepper } from "../components/StatusStepper";
import { STORE, mapsLink, whatsappLink } from "../data/store";
import "../styles/track.css";
import "../styles/account.css";

const firstName = (name = "") => name.trim().split(" ")[0];

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

function OrderCard({ order }) {
  const late = isLate(order);
  return (
    <article className="v1-acc-card">
      <div className="v1-acc-card__top">
        <div>
          <p className="v1-mono v1-acc-card__code">{order.code}</p>
          <p className="v1-display v1-acc-card__shoe">{order.items[0]?.shoe}</p>
          <p className="v1-acc-card__svc">
            {[...new Set(order.items.map((i) => i.service))].join(" · ")}
          </p>
        </div>
        <StatusChip status={order.status} />
      </div>

      <StatusStepper order={order} />

      {order.status === "READY" && (
        <p className="v1-acc-ready" role="status">
          <Icon name="check" size={18} />
          <span>
            <strong>Seu pedido está pronto.</strong> Retire na loja ou combine a entrega pelo{" "}
            <a href={whatsappLink(`Pedido ${order.code}`)} target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
            .
          </span>
        </p>
      )}
      {late && order.status !== "READY" && (
        <p className="v1-order__late" role="status">
          <Icon name="alert" size={18} />O prazo previsto já passou. Fale com a loja.
        </p>
      )}

      <div className="v1-acc-card__foot">
        <span>
          Previsão de entrega: <b>{formatDate(order.expectedAt)}</b>
        </span>
        <Link to={`/acompanhar/${order.code}`} className="v1-btn v1-btn--outline v1-btn--sm">
          Ver detalhes
        </Link>
      </div>
    </article>
  );
}

function ClaimForm({ onAdded }) {
  const id = useId();
  const [code, setCode] = useState("");
  const [msg, setMsg] = useState(null);
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!code.trim()) {
      setMsg({ type: "error", text: "Digite o código do comprovante." });
      return;
    }
    setBusy(true);
    setMsg(null);
    try {
      const added = await api("/api/me/orders", {
        method: "POST",
        body: { code: normalizeCode(code) },
      });
      setCode("");
      setMsg({ type: "ok", text: `Pedido ${added.code} adicionado à sua conta.` });
      onAdded();
    } catch (err) {
      setMsg({
        type: "error",
        text: err.status === 404 ? "Não encontramos esse código. Confira o comprovante." : err.message,
      });
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="v1-acc-box">
      <h2 className="v1-acc-box__title">Adicionar pedido</h2>
      <p className="v1-acc-box__text">
        Fez um pedido na loja e ele não apareceu aqui? Digite o código do comprovante.
      </p>
      <form className="v1-acc-claim" onSubmit={submit} noValidate>
        <label htmlFor={id} className="v1-sr-only">
          Código do pedido
        </label>
        <input
          id={id}
          className="v1-input v1-mono"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="NX-2026-000123"
          autoComplete="off"
        />
        <button type="submit" className="v1-btn v1-btn--primary v1-btn--sm" disabled={busy}>
          Adicionar
        </button>
      </form>
      {msg && (
        <p className={`v1-acc-msg is-${msg.type}`} role={msg.type === "error" ? "alert" : "status"}>
          {msg.text}
        </p>
      )}
    </section>
  );
}

function ProfileBox() {
  const { session, saveProfile, changePassword } = useAuth();
  const id = useId();
  const [mode, setMode] = useState(null); // null | "dados" | "senha"
  const [form, setForm] = useState({ name: "", phone: "", cep: "" });
  const [pw, setPw] = useState({ atual: "", nova: "" });
  const [msg, setMsg] = useState(null);
  const [busy, setBusy] = useState(false);

  const open = (next) => {
    setMsg(null);
    setForm({ name: session.name, phone: session.phone, cep: session.cep });
    setPw({ atual: "", nova: "" });
    setMode(next);
  };

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setMsg(null);
    try {
      if (mode === "dados") {
        await saveProfile(form);
        setMsg({ type: "ok", text: "Dados atualizados." });
      } else {
        await changePassword(pw.atual, pw.nova);
        setMsg({ type: "ok", text: "Senha alterada." });
      }
      setMode(null);
    } catch (err) {
      setMsg({ type: "error", text: err.message });
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="v1-acc-box">
      <h2 className="v1-acc-box__title">Meus dados</h2>

      {mode === null ? (
        <>
          <dl className="v1-acc-data">
            <div><dt>Nome</dt><dd>{session.name}</dd></div>
            <div><dt>E-mail</dt><dd>{session.email}</dd></div>
            <div><dt>Telefone</dt><dd>{session.phone || "—"}</dd></div>
            <div><dt>CEP</dt><dd>{session.cep || "—"}</dd></div>
          </dl>
          <p className="v1-acc-links">
            <button type="button" onClick={() => open("dados")}>Editar meus dados</button>
            <span aria-hidden="true">·</span>
            <button type="button" onClick={() => open("senha")}>Alterar senha</button>
          </p>
        </>
      ) : (
        <form className="v1-acc-form" onSubmit={submit} noValidate>
          {mode === "dados" ? (
            <>
              <div className="v1-field">
                <label htmlFor={`${id}-n`} className="v1-label">Nome</label>
                <input id={`${id}-n`} className="v1-input" value={form.name} autoComplete="name"
                  onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>
              <div className="v1-field">
                <label htmlFor={`${id}-t`} className="v1-label">Telefone</label>
                <input id={`${id}-t`} className="v1-input" value={form.phone} inputMode="tel" autoComplete="tel"
                  onChange={(e) => setForm({ ...form, phone: maskPhone(e.target.value) })} />
              </div>
              <div className="v1-field">
                <label htmlFor={`${id}-c`} className="v1-label">CEP</label>
                <input id={`${id}-c`} className="v1-input" value={form.cep} inputMode="numeric" autoComplete="postal-code"
                  onChange={(e) => setForm({ ...form, cep: maskCep(e.target.value) })} />
              </div>
            </>
          ) : (
            <>
              <div className="v1-field">
                <label htmlFor={`${id}-a`} className="v1-label">Senha atual</label>
                <input id={`${id}-a`} type="password" className="v1-input" value={pw.atual} autoComplete="current-password"
                  onChange={(e) => setPw({ ...pw, atual: e.target.value })} />
              </div>
              <div className="v1-field">
                <label htmlFor={`${id}-s`} className="v1-label">Nova senha (mín. 8 caracteres)</label>
                <input id={`${id}-s`} type="password" className="v1-input" value={pw.nova} autoComplete="new-password"
                  onChange={(e) => setPw({ ...pw, nova: e.target.value })} />
              </div>
            </>
          )}
          {msg?.type === "error" && <p className="v1-acc-msg is-error" role="alert">{msg.text}</p>}
          <div className="v1-acc-form__actions">
            <button type="submit" className="v1-btn v1-btn--primary v1-btn--sm" disabled={busy}>Salvar</button>
            <button type="button" className="v1-btn v1-btn--outline v1-btn--sm" onClick={() => setMode(null)}>
              Cancelar
            </button>
          </div>
        </form>
      )}
      {mode === null && msg?.type === "ok" && <p className="v1-acc-msg is-ok" role="status">{msg.text}</p>}
    </section>
  );
}

// Área do cliente: só os pedidos da conta dele, sem preços.
export function MyAccount() {
  const { session } = useAuth();
  const [orders, setOrders] = useState(null);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    try {
      setOrders(await api("/api/me/orders"));
      setError("");
    } catch (e) {
      setError(e.message);
      setOrders((current) => current ?? []);
    }
  }, []);

  useEffect(() => {
    // Busca inicial dos pedidos da conta
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, [load]);

  const active = (orders ?? []).filter((o) => o.status !== "DELIVERED" && o.status !== "CANCELED");
  const past = (orders ?? []).filter((o) => o.status === "DELIVERED" || o.status === "CANCELED");

  return (
    <SiteLayout>
      <div className="v1-theme-paper">
        <div className="v1-container v1-acc">
          <header className="v1-acc__hello">
            <div>
              <p className="v1-kicker">Área do cliente</p>
              <h1 className="v1-display v1-acc__title">Olá, {firstName(session.name)}.</h1>
            </div>
          </header>

          <div className="v1-acc__grid">
            <div className="v1-acc__main">
              <h2 className="v1-acc__h">
                Pedidos em andamento{orders ? ` · ${active.length}` : ""}
              </h2>

              {error && (
                <p className="v1-acc-msg is-error" role="alert">{error}</p>
              )}
              {orders === null && <p role="status">Carregando seus pedidos…</p>}
              {orders && active.length === 0 && (
                <div className="v1-acc-empty">
                  <p className="v1-acc-empty__title">Nenhum pedido em andamento.</p>
                  <p>
                    Quando a loja registrar um pedido com o seu e-mail ({session.email}), ele
                    aparece aqui. Se já tem um código, adicione ao lado.
                  </p>
                </div>
              )}
              {active.map((o) => <OrderCard key={o.code} order={o} />)}

              {past.length > 0 && (
                <>
                  <h2 className="v1-acc__h v1-acc__h--gap">Histórico</h2>
                  <ul className="v1-acc-past">
                    {past.map((o) => (
                      <li key={o.code}>
                        <div>
                          <Link to={`/acompanhar/${o.code}`} className="v1-mono v1-acc-card__code">
                            {o.code}
                          </Link>
                          <p>
                            <b>{o.items[0]?.shoe}</b> · {o.items[0]?.service}
                          </p>
                        </div>
                        <StatusChip status={o.status} />
                        <span className="v1-acc-card__svc">
                          {formatDate((o.deliveredAt ?? o.expectedAt)?.slice(0, 10))}
                        </span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>

            <aside className="v1-acc__side">
              <ClaimForm onAdded={load} />
              <ProfileBox />
              <section className="v1-acc-box">
                <h2 className="v1-acc-box__title">A loja</h2>
                <p className="v1-acc-box__text">
                  {STORE.address.street} · {STORE.address.complement}
                  <br />
                  {STORE.hours.map((row) => `${row.days}, ${row.time}`).join(" · ")}
                </p>
                <p className="v1-acc-links">
                  <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">WhatsApp</a>
                  <span aria-hidden="true">·</span>
                  <a href={mapsLink()} target="_blank" rel="noopener noreferrer">Como chegar</a>
                </p>
              </section>
            </aside>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
