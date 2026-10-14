import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Management.css';

export function Management() {
  // Simulando dados vindos de um Banco de Dados (Ex: MongoDB ou PostgreSQL)
  const [pedidos] = useState([
    { id: 'NX-1042', cliente: 'Carlos Eduardo', modelo: 'Nike Air Force 1', servico: 'Lavagem Premium', status: 'Em Andamento', entrega: '2026-10-16' },
    { id: 'NX-1043', cliente: 'Mariana Costa', modelo: 'Yeezy Boost 350', servico: 'Lavagem Premium', status: 'Pendente', entrega: '2026-10-18' },
    { id: 'NX-1044', cliente: 'Rafael Souza', modelo: 'Air Jordan 1', servico: 'Pintura & Restauração', status: 'Concluído', entrega: '2026-10-14' },
    { id: 'NX-1045', cliente: 'Ana Lima', modelo: 'Vans Old Skool', servico: 'Customização', status: 'Atrasado', entrega: '2026-10-13' },
    { id: 'NX-1046', cliente: 'Lucas Silva', modelo: 'New Balance 550', servico: 'Troca de Solado', status: 'Pendente', entrega: '2026-10-20' },
  ]);

  // Algoritmos de redução (Reduce) para calcular os resumos métricos dinamicamente
  const totalPedidos = pedidos.length;
  const pendentes = pedidos.filter(p => p.status === 'Pendente' || p.status === 'Em Andamento').length;
  const concluidos = pedidos.filter(p => p.status === 'Concluído').length;

  // Função utilitária para retornar a classe CSS correta baseada no status
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Concluído': return 'badge-success';
      case 'Pendente': return 'badge-warning';
      case 'Em Andamento': return 'badge-info';
      case 'Atrasado': return 'badge-danger';
      default: return 'badge-default';
    }
  };

  return (
    <div className="management-container">
      {/* Cabeçalho */}
      <header className="management-header">
        <div className="header-titles">
          <Link to="/" className="btn-back">&larr; Voltar para Home</Link>
          <h1>Painel de Gerenciamento</h1>
          <p>Visão geral e controle de todas as ordens de serviço ativas.</p>
        </div>
        <div className="header-actions">
          {/* Este botão poderia redirecionar para a página de formulário que criamos antes */}
          <Link to="/#servicos" className="btn-primary">
            + Nova Ordem
          </Link>
        </div>
      </header>

      {/* Seção de Resumo (Métricas de BI - Business Intelligence básicas) */}
      <section className="summary-cards">
        <div className="summary-card">
          <h3>Total de Pedidos</h3>
          <span className="summary-value">{totalPedidos}</span>
        </div>
        <div className="summary-card">
          <h3>Em Andamento / Pendentes</h3>
          <span className="summary-value text-warning">{pendentes}</span>
        </div>
        <div className="summary-card">
          <h3>Concluídos (Mês)</h3>
          <span className="summary-value text-success">{concluidos}</span>
        </div>
      </section>

      {/* Tabela de Gerenciamento (Data Grid) */}
      <section className="management-table-section">
        <h2>Listagem de Serviços</h2>
        <div className="table-responsive">
          <table className="nexus-table">
            <thead>
              <tr>
                <th>ID do Pedido</th>
                <th>Cliente</th>
                <th>Modelo / Serviço</th>
                <th>Data de Entrega</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {pedidos.map((pedido) => (
                <tr key={pedido.id}>
                  <td className="fw-bold">{pedido.id}</td>
                  <td>{pedido.cliente}</td>
                  <td>
                    <div className="fw-bold">{pedido.modelo}</div>
                    <div className="text-muted">{pedido.servico}</div>
                  </td>
                  <td>{pedido.entrega}</td>
                  <td>
                    <span className={`status-badge ${getStatusBadge(pedido.status)}`}>
                      {pedido.status}
                    </span>
                  </td>
                  <td>
                    <button className="btn-action">Ver Detalhes</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}