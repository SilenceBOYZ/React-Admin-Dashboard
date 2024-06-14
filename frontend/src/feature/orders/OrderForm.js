import ViewDataLayout from "../../ui/ViewDataLayout"
import useFetchOrders from "../../hook/useFecthOrder";
import OrderRowData from "./OrderRow";
import Pagination from "../../ui/Pagination";
import { useSearchParams } from "react-router-dom";
import Heading from "../../ui/Heading";
import Spinner from "../../ui/Spinner";

function OrderForm() {
  const [searchParams] = useSearchParams();
  let pageNum = parseInt(searchParams.get("pageNum")) || 1;
  const orders = useFetchOrders(pageNum);

  if (!Object.entries(orders).length) return <Spinner />

  return (
    <ViewDataLayout>
      <div className="flex justify-between">
        <Heading>Quản lý đơn hàng</Heading>
      </div>
        <>
          <div role="table" className="my-6 rounded-md bg-slate-100 overflow-hidden shadow-lg">
            <header role="row" className="uppercase font-medium grid bg-white p-4 grid-cols-[10rem_repeat(4,_8rem)_5rem] justify-between">
              <div>Tên khách hàng</div>
              <div>Ngày mua</div>
              <div>Thanh toán</div>
              <div>Trạng thái</div>
              <div>Tổng tiền</div>
              <div>Chi tiết</div>
            </header>
            {!orders.dataSelected.length ? <div>Data is loading</div> : orders.dataSelected.map(order => <OrderRowData key={order.id} order={order} />)}
          </div>
          <Pagination
            start={orders?.startIndex}
            end={
              orders?.lastIndex > orders.totalData
                ? orders.totalData
                : orders?.lastIndex
            }
            totalRecord={orders.totalData}
            prevPage={pageNum}
            nextPage={pageNum}
            endingLink={orders.totalLink}
          />
        </>
    </ViewDataLayout>
  )
}

export default OrderForm
