import { useId, useState } from "react";
import { Icon } from "../components/Icon";
import { PanelLayout } from "../components/PanelLayout";
import { StatusChip } from "../components/StatusChip";
import { ROLES, ROLE_KEYS } from "../data/staff";
import { useStaff } from "../staff/useStaff";

// Cadastro de funcionários (área da equipe). Os perfis seguem o auth-service:
// Administrador, Atendente e Técnico. Ainda sem API: os dados ficam na memória.
const EMPTY = { name: "", email: "", role: "ATTENDANT" };

export function Staff() {
  const { staff, saveMember, toggleActive } = useStaff();
  const [form, setForm] = useState(EMPTY);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const uid = useId();
  const id = (n) => `${uid}-${n}`;
  const editing = Boolean(form.id);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = form.email.trim().toLowerCase();
    if (!form.name.trim() || !email) {
      setError("Preencha o nome e o e-mail.");
      return;
    }
    if (staff.some((m) => m.email === email && m.id !== form.id)) {
      setError("Já existe um funcionário com esse e-mail.");
      return;
    }
    saveMember({ ...form, name: form.name.trim(), email });
    setError("");
    setForm(EMPTY);
  };

  const term = search.trim().toLowerCase();
  const visible = staff.filter(
    (m) => !term || m.name.toLowerCase().includes(term) || m.email.includes(term),
  );

  return (
    <PanelLayout
      active="staff"
      search={search}
      onSearch={setSearch}
      searchPlaceholder="Buscar funcionário por nome ou e-mail"
    >
      <div className="v1-panel__head">
        <div>
          <p className="v1-kicker">Painel da equipe</p>
          <h1 className="v1-panel__title">Equipe</h1>
          <p className="v1-panel__date">
            {staff.filter((m) => m.active).length} ativos de {staff.length} cadastrados
          </p>
        </div>
      </div>

      <section className="v1-card" aria-labelledby={id("form-title")}>
        <header className="v1-card__head">
          <h2 id={id("form-title")} className="v1-card__title">
            {editing ? "Editar funcionário" : "Cadastrar funcionário"}
          </h2>
        </header>
        <form className="v1-staff-form" onSubmit={handleSubmit} noValidate>
          <div className="v1-field">
            <label htmlFor={id("name")} className="v1-label">
              Nome
            </label>
            <input
              id={id("name")}
              name="name"
              className="v1-input"
              value={form.name}
              onChange={handleChange}
              placeholder="Nome completo"
              autoComplete="off"
            />
          </div>
          <div className="v1-field">
            <label htmlFor={id("email")} className="v1-label">
              E-mail
            </label>
            <input
              id={id("email")}
              name="email"
              type="email"
              className="v1-input"
              value={form.email}
              onChange={handleChange}
              placeholder="nome@acasadotenis.com.br"
              autoComplete="off"
            />
          </div>
          <div className="v1-field">
            <label htmlFor={id("role")} className="v1-label">
              Perfil
            </label>
            <select
              id={id("role")}
              name="role"
              className="v1-input v1-select"
              value={form.role}
              onChange={handleChange}
            >
              {ROLE_KEYS.map((key) => (
                <option key={key} value={key}>
                  {ROLES[key].label}
                </option>
              ))}
            </select>
          </div>
          <div className="v1-staff-form__actions">
            <button type="submit" className="v1-btn v1-btn--primary">
              <Icon name={editing ? "check" : "plus"} size={18} />
              {editing ? "Salvar" : "Cadastrar"}
            </button>
            {editing && (
              <button
                type="button"
                className="v1-btn v1-btn--outline"
                onClick={() => {
                  setForm(EMPTY);
                  setError("");
                }}
              >
                Cancelar
              </button>
            )}
          </div>
          {error && (
            <p className="v1-staff-form__error" role="alert">
              {error}
            </p>
          )}
        </form>
        <p className="v1-staff-note">
          A senha de acesso será definida pelo próprio funcionário no primeiro login, quando o
          sistema de autenticação estiver ligado.
        </p>
      </section>

      <section className="v1-card v1-orders" aria-labelledby={id("list-title")}>
        <header className="v1-orders__head">
          <h2 id={id("list-title")} className="v1-card__title">
            Funcionários
          </h2>
        </header>
        <div className="v1-table-wrap">
          <table className="v1-table">
            <thead>
              <tr>
                <th scope="col">Nome</th>
                <th scope="col">E-mail</th>
                <th scope="col">Perfil</th>
                <th scope="col">Situação</th>
                <th scope="col">
                  <span className="v1-sr-only">Ações</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {visible.map((m) => (
                <tr key={m.id} className={m.active ? "" : "is-inactive"}>
                  <td data-label="Nome" className="v1-staff-name">
                    {m.name}
                  </td>
                  <td data-label="E-mail">{m.email}</td>
                  <td data-label="Perfil">
                    <StatusChip tone={ROLES[m.role].tone}>{ROLES[m.role].label}</StatusChip>
                  </td>
                  <td data-label="Situação">
                    <StatusChip tone={m.active ? "green" : "gray"}>
                      {m.active ? "Ativo" : "Inativo"}
                    </StatusChip>
                  </td>
                  <td data-label="Ações" className="v1-staff-actions">
                    <button
                      type="button"
                      className="v1-table__link"
                      onClick={() => {
                        setForm({ id: m.id, name: m.name, email: m.email, role: m.role });
                        setError("");
                      }}
                    >
                      Editar<span className="v1-sr-only"> {m.name}</span>
                    </button>
                    <button
                      type="button"
                      className="v1-table__link"
                      onClick={() => toggleActive(m.id)}
                    >
                      {m.active ? "Desativar" : "Reativar"}
                      <span className="v1-sr-only"> {m.name}</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {visible.length === 0 && (
            <p className="v1-orders__empty">Nenhum funcionário encontrado.</p>
          )}
        </div>
      </section>
    </PanelLayout>
  );
}
