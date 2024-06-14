import { HiArrowDownOnSquareStack } from "react-icons/hi2"
import { formatDate } from "../../utlis/formatDate";
import formatCurrency from "../../utlis/formatCurrency";
import Button from "../../ui/Button";
import { useState } from "react";
import OrderDetail from "./OrderDetail";
import { HiCalendarDays } from "react-icons/hi2";

function OrderRow({ order }) {
  const { id, userId, userName, totalAmount, paymentMethod, status, createdAt } = order;
  const [isDropdown, setIsDropdown] = useState(false);
  let colors;
  let statusVi;
  if (status.toLowerCase() === "thanhcong") {
    colors = "bg-blue-200 text-blue-700"
    statusVi = "Thành công"
  }
  if (status.toLowerCase() === "danggiaohang") {
    colors = "bg-yellow-200 text-yellow-700"
    statusVi = "Đang giao"
  }
  if (status.toLowerCase() === "khongthanhcong") {
    colors = "bg-red-200 text-red-700"
    statusVi = "Hủy đơn"
  }

  let payment = paymentMethod;

  if (payment === "transfer") payment = "Chuyển khoản";
  else payment = "Tiền mặt";

  function handleGetOrderDetail() {
    setIsDropdown(dropdown => !dropdown);
  }

  return (
    <section role="row" className="grid items-center bg-white grid-cols-[10rem_repeat(4,_8rem)_5rem] justify-between px-4 py-4 border-b-2 border-neutral-100 last:border-none font-medium text-neutral-600 gap-y-[1rem] transition-all duration-300">
      <div>{userName}</div>
      <div className="flex gap-2 items-center"><span><HiCalendarDays className="text-violet-600" size={26} /></span> {formatDate(createdAt)}</div>
      <div >{payment}</div>
      <div className={`p-1 ${colors} rounded-md text-center text-sm`}>{statusVi}</div>
      <div>{formatCurrency(totalAmount)}</div>
      <Button className="cursor-pointer" onclick={() => handleGetOrderDetail()}><HiArrowDownOnSquareStack size={24} className={`text-violet-700 ms-5 transition-all duration-[400ms] ${isDropdown ? "rotate-180" : ""}`} /></Button>
      {isDropdown ? <OrderDetail orderId={id} userId={userId} /> : null}
    </section >
  )
}

export default OrderRow