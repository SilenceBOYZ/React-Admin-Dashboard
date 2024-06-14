import BoardStatics from "../../ui/BoardStatics";
import formatCurrency from "../../utlis/formatCurrency";
import { HiClipboardDocumentList, HiCreditCard, HiMiniBanknotes, HiCurrencyDollar } from "react-icons/hi2";
import { getDayAndPreviousDay } from "../../utlis/getDayAndPreviousDay";


function OrderAnalysis({ orders, query }) {
  const { dateAfter, today } = getDayAndPreviousDay(query);
  // Tính ra ngày cụ thể từ tổng số ngày trước đó (7, 30, 90), query là tổng số ngày
  let revenue = orders.map(x => {
    return {
      createdAt: new Date(x.createdAt),
      paymentMethod: x.paymentMethod,
      totalAmount: x.totalAmount,
      status: x.status
    }
  })
  revenue = revenue.map(order => order).filter(order => order.createdAt >= dateAfter && order.createdAt <= today && order.status.toLowerCase() === "thanhcong");
  let totalAmount = revenue.map(x => x.totalAmount).reduce((pre, cur) => pre + cur, 0);
  let totalCash = revenue.filter(x => x.paymentMethod === "cash").map(x => x.totalAmount).reduce((pre, cur) => pre + cur, 0);
  let totalTransfer = revenue.filter(x => x.paymentMethod === "transfer").map(x => x.totalAmount).reduce((pre, cur) => pre + cur, 0);

  return (
    <div className="flex gap-6">
      <BoardStatics title={"Tổng hóa đơn"} value={revenue.length} bgColor="bg-blue-200"> <HiClipboardDocumentList size={32} className="text-blue-700" /></BoardStatics>
      <BoardStatics title={"Tổng doanh thu"} value={formatCurrency(totalAmount)} bgColor="bg-red-200"> <HiCurrencyDollar size={32} className="text-red-700" /></BoardStatics>
      <BoardStatics title={"Tiền mặt"} value={formatCurrency(totalCash)} bgColor="bg-green-200"> <HiMiniBanknotes size={32} className="text-green-700" /></BoardStatics>
      <BoardStatics title={"Chuyển Khoản"} value={formatCurrency(totalTransfer)} bgColor="bg-yellow-200"> <HiCreditCard size={32} className="text-yellow-700" /></BoardStatics>
    </div>
  )
}

export default OrderAnalysis
