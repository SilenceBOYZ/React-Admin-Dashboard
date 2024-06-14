import Heading from "../../ui/Heading"
import ListOrderStatus from "../../ui/ListOrderStatus"
import { formatDate } from "../../utlis/formatDate";
import { getDayAndPreviousDay } from "../../utlis/getDayAndPreviousDay";

function OrdersView({ orders, title = "" }) {
  const { fullMonthAndDay } = getDayAndPreviousDay();

  console.log(fullMonthAndDay);
console.log(orders);
  let currentOrders = orders.map(item => { return { ...item, createdAt: formatDate(item.createdAt) } })
  currentOrders = currentOrders.filter(item => item.createdAt === fullMonthAndDay);
  console.log(currentOrders);
  return (
    <>
      <Heading type="h2" color="primary" position="text-center pt-3">{title}</Heading>
      {!currentOrders.length ? <p className="w-full text-center text-xl">Hôm nay không có đơn hàng nào</p> :
        <>
          <ul className="space-y-4 overflow-y-scroll scrollbar h-44 px-4">
            {currentOrders.map(curOrder => <ListOrderStatus order={curOrder} key={curOrder.id} />)}
          </ul>
        </>
      }
    </>
  )
}

export default OrdersView
