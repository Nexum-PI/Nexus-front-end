import { useCallback, useEffect, useMemo, useState } from "react";
import { OrdersContext } from "../../context/OrdersContext";
import { api } from "../api/client";
import { isStaffRole } from "../auth/roles";
import { useAuth } from "../auth/useAuth";

// Pedidos vindos do pedidos-service. Usa o mesmo OrdersContext do front, então as
// telas continuam com useOrders(): { orders, changeStatus } + loading, error,
// createOrder e refresh. Só carrega a lista quando a equipe está logada.
export function ApiOrdersProvider({ children }) {
  const { session } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      setOrders(await api("/api/orders"));
      setError(null);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Só a equipe lista pedidos da loja; o cliente usa /api/me/orders na própria área
    if (!session || !isStaffRole(session.role)) return undefined;
    let cancelled = false;
    api("/api/orders")
      .then((data) => {
        if (!cancelled) {
          setOrders(data);
          setError(null);
        }
      })
      .catch((e) => !cancelled && setError(e.message));
    return () => {
      cancelled = true;
    };
  }, [session]);

  const changeStatus = useCallback(async (code, status, note) => {
    try {
      const updated = await api(`/api/orders/${encodeURIComponent(code)}/status`, {
        method: "PATCH",
        body: { status, note },
      });
      setOrders((current) => current.map((o) => (o.code === code ? updated : o)));
      setError(null);
    } catch (e) {
      setError(e.message);
    }
  }, []);

  const createOrder = useCallback(async (payload) => {
    const created = await api("/api/orders", { method: "POST", body: payload });
    setOrders((current) => [...current, created]);
    return created;
  }, []);

  const value = useMemo(
    () => ({ orders: session ? orders : [], changeStatus, createOrder, refresh, loading, error }),
    [session, orders, changeStatus, createOrder, refresh, loading, error],
  );

  return <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>;
}
