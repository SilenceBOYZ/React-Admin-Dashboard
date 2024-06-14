import { useEffect, useState } from "react";
import { fetchOrders } from "../services/api-orders";

function useFecthAllOrders() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    async function fetchOrderData() {
      let data = await fetchOrders();
      setOrders(data)
    }
    fetchOrderData();
  }, [])

  return { orders }
}

export default useFecthAllOrders;
