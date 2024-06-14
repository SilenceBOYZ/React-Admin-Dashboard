import { useEffect, useState } from "react"
import { fetchUserOrderDetail } from "../../services/api-orders";
import ItemDetail from "./ItemDetail";
import formatCurrency from "../../utlis/formatCurrency";

function OrderDetail({ orderId, userId }) {
  const [orderDetail, setOrderDetail] = useState(null);
  useEffect(() => {
    async function fetchOrderDetail() {
      let data = await fetchUserOrderDetail(orderId, userId);
      setOrderDetail(data);
    }
    fetchOrderDetail();
  }, [orderId, userId])

  const totalQuantity = orderDetail?.map(order => order.quantity)?.reduce((prev, cur) => prev + cur , 0);
  const totalAmount = orderDetail?.map(order => order.quantity * order.unitPrice)?.reduce((prev, cur) => prev + cur , 0);

  return (
    <>
      {!orderDetail ? <div>Data is loading.....</div> :
        <div role="table" className="col-start-1 col-end-7 w-[96%] rounded-lg border-2 box-border pt-4 pb-3 px-4">
          <div className="mb-4 flex gap-4">
            <div className="text-neutral-500">Mã đơn hàng: <span>AGHSD022{orderDetail[0].id}</span></div>
            <span> | </span>
            <div className="text-neutral-500">Địa chỉ: <span>{orderDetail[0].address}</span></div>
          </div>
          <header role="rowheader" className="grid grid-cols-[6rem_1fr_repeat(3,_8rem)] pb-1 border-b-2 border-neutral-400 mb-4">
            <div>#</div>
            <div>Tên sản phẩm</div>
            <div>Số lượng</div>
            <div>Giá</div>
            <div>Tổng tiền</div>
          </header>

          {orderDetail.map(item => <ItemDetail item={item} key={item.id} />)}

          <div className="grid grid-cols-[6rem_1fr_repeat(3,_8rem)] mt-4">
            <div className="col-start-2 col-end-6 space-y-1.5 row-start-1 text-neutral-600">
              <div>Tổng cổng: </div>
            </div>
            <div className="col-start-3 col-end-4 space-y-1.5 row-start-1 text-neutral-600">
              <div>{totalQuantity}</div>
            </div>
            <div className="col-start-5 col-end-6 space-y-1.5 row-start-1 text-neutral-600">
              <div>{formatCurrency(totalAmount)}</div>
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default OrderDetail
