import { useEffect, useState } from "react";
import { fecthOrderData } from "../services/api-orders";

function useFetchOrders(pageNum) {
  const [orders, setOrders] = useState({});

  useEffect(() => {
    async function fetchData() {
      let requestOrder = await fecthOrderData(pageNum);
      setOrders(requestOrder);
    }
    fetchData()
  }, [pageNum])

  return orders;
}

export default useFetchOrders
