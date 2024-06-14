function ListOrderStatus({ order }) {
  const { id, status } = order;
  let color = "#60a5fa";
  let statusOrder = "Đang xử lý";
  const orderStatusStyle = {
    delivering: "bg-yellow-200",
    success: "bg-green-200",
    reject: "bg-red-200"
  }

  if (status.toLowerCase() === "danggiaohang") {
    color = orderStatusStyle["delivering"];
    statusOrder = "Đang giao";
  }
  if (status.toLowerCase() === "thanhcong") {
    color = orderStatusStyle["success"];
    statusOrder = "Thành công";
  }
  if (status.toLowerCase() === "khongthanhcong") {
    color = orderStatusStyle["reject"];
    statusOrder = "Hủy đơn"
  }

  return (
    <li>
      <div className="flex items-center box-border px-6 gap-3">
        <span className="w-[10%]">MSND{id}</span>
        <span className="block w-[70%] border-[1px] h-[1px] border-dashed"></span>
        <span className={`w-[20%] p-1 ${color} rounded-md text-neutral-600 text-center text-sm`}>{statusOrder}</span>
      </div>
    </li>
  )
}

export default ListOrderStatus
