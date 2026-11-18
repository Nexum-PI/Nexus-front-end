import { useCallback, useMemo, useState } from "react";
import { OrdersContext } from "./OrdersContext";
import { buildSampleOrders } from "../data/orders";

// Guarda os pedidos em memória para o painel da equipe e a consulta do cliente
// enxergarem os mesmos dados. Quando o pedidos-service existir, as leituras e o
// changeStatus passam a chamar a API.
export function OrdersProvider({ children }) {
  const [orders, setOrders] = useState(() => buildSampleOrders());

  // Toda mudança de status gera uma linha de histórico (order_status_history).
  const changeStatus = useCallback((code, status, note = "") => {
    const now = new Date().toISOString();
    setOrders((current) =>
      current.map((order) => {
        if (order.code !== code || order.status === status) return order;
        return {
          ...order,
          status,
          deliveredAt: status === "DELIVERED" ? now : null,
          history: [...order.history, { status, changedAt: now, note }],
        };
      }),
    );
  }, []);

  const value = useMemo(() => ({ orders, changeStatus }), [orders, changeStatus]);

  return (
    <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>
  );
}
