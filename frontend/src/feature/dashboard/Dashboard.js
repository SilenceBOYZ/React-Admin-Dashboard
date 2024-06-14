import { useEffect, useState } from "react"
import Filter from "../../ui/Filter"
import Heading from "../../ui/Heading"
import ViewDataLayout from "../../ui/ViewDataLayout"
import OrderAnalysis from "./OrderAnalysis"
import { fetchItemOrders, fetchOrders } from "../../services/api-orders"
import { useSearchParams } from "react-router-dom"
import ItemPieChart from "./ItemPieChart"
import useFecthAllOrders from "../../hook/useFecthAllOrders"
import OrdersView from "./OrdersView"
import RevenueOfYearChart from "./RevenueOfYearChart"
import { year } from "../../utlis/formatDate"
import Spinner from "../../ui/Spinner"


function Dashboard() {
  const [itemQuantity, setItemQuantity] = useState([]);
  const [orders, setOrders] = useState([]);

  const [searchParams] = useSearchParams();
  const query = parseInt(searchParams.get("last")) || 90;
  // const { orders } = useFecthAllOrders();

  useEffect(() => {
    async function fetchData() {
      let dataItemOrders = await fetchItemOrders();
      let dataOrders = await fetchOrders();
      setItemQuantity(dataItemOrders);
      setOrders(dataOrders)
    }
    fetchData();
  }, [])

  if (!itemQuantity.length || !orders.length) return <Spinner />
  const orderSuccess = orders.filter(order => order.status.toLowerCase() === "thanhcong");

  return (
    <ViewDataLayout width="max-w-[80rem] space-y-5">
      <div className="pt-6 flex justify-between mb-10">
        <Heading type="h1">Thống kê</Heading>
        <Filter />
      </div>
      <OrderAnalysis orders={orderSuccess} query={query} />
      <div className="flex justify-between gap-6">
        <div className="w-1/2  bg-white rounded-md flex items-center justify-center">
          <ItemPieChart data={itemQuantity} query={query} />
        </div>
        <div className="w-1/2 h-64 bg-white rounded-md space-y-2 ">
          <OrdersView orders={orders} title="Order ngày hôm nay" />
        </div>
      </div>
      <div className="bg-white w-full rounded-md box-border p-8">
        <Heading position="mb-7">Thống kê doanh thu năm {year}</Heading>
        <RevenueOfYearChart data={orderSuccess} />
      </div>
    </ViewDataLayout>
  )
}

export default Dashboard
