import React, { useState } from 'react';
import './WashService.css';

export function WashService() {
  // Lista inicial de pedidos de lavagem
  const [pedidos, setPedidos] = useState([
    {
      id: 'LAV-101',
      cliente: 'Carlos Eduardo',
      telefone: '(11) 98765-4321',
      modeloTenis: 'Nike Air Force 1',
      corTenis: 'Branco',
      material: 'Couro Liso',
      tipoLavagem: 'Ouro',
      nivelSujeira: 'Pesada (Lama/Gordura)',
      incluiPalmilhaCadarco: true,
      observacoes: 'Cuidado extra com a sola lateral amarelada.',
      status: 'Em Andamento',
      previsaoEntrega: '2026-10-03',
    },
    {
      id: 'LAV-102',
      cliente: 'Mariana Costa',
      telefone: '(11) 91234-5678',
      modeloTenis: 'Adidas Yeezy Boost 350',
      corTenis: 'Cinza',
      material: 'Tecido / Mesh',
      tipoLavagem: 'Lavagem Detalhada',
      nivelSujeira: 'Média',
      incluiPalmilhaCadarco: true,
      observacoes: 'Sem produtos à base de cloro.',
      status: 'Atrasado',
      previsaoEntrega: '2026-09-27',
    },
  ]);

  // Estado do formulário de novo pedido
  const [formulario, setFormulario] = useState({
    cliente: '',
    telefone: '',
    modeloTenis: '',
    corTenis: '',
    material: 'Tecido / Mesh',
    tipoLavagem: 'Ouro',
    nivelSujeira: 'Leve',
    incluiPalmilhaCadarco: true,
    observacoes: '',
    previsaoEntrega: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormulario((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formulario.cliente || !formulario.modeloTenis) {
      alert('Por favor, preencha o nome do cliente e o modelo do tênis.');
      return;
    }

    const novoPedido = {
      id: `LAV-${Math.floor(100 + Math.random() * 900)}`,
      ...formulario,
      status: 'Pendente',
    };

    setPedidos([novoPedido, ...pedidos]);

    // Reseta o formulário
    setFormulario({
      cliente: '',
      telefone: '',
      modeloTenis: '',
      corTenis: '',
      material: 'Tecido / Mesh',
      tipoLavagem: 'Ouro',
      nivelSujeira: 'Leve',
      incluiPalmilhaCadarco: true,
      observacoes: '',
      previsaoEntrega: '',
    });
  };

  const handleStatusChange = (id, novoStatus) => {
    setPedidos((prev) =>
      prev.map((pedido) =>
        pedido.id === id ? { ...pedido, status: novoStatus } : pedido
      )
    );
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Pendente':
        return 'badge-pendente';
      case 'Em Andamento':
        return 'badge-andamento';
      case 'Realizado':
        return 'badge-realizado';
      case 'Entregue':
        return 'badge-entregue';
      case 'Atrasado':
        return 'badge-atrasado';
      default:
        return '';
    }
  };
}