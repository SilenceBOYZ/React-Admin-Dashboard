import formatCurrency from "../../utlis/formatCurrency";

function ItemDetail({ item }) {
  const { foodName, foodImage, quantity, unitPrice } = item;

  return (
    <section role="row" className="grid grid-cols-[6rem_1fr_repeat(3,_8rem)] items-center mb-3 pb-3 border-b-2 border-neutral-200 ">
      <div className="w-[4rem] h-[4rem] p-2 rounded-xl overflow-hidden border-2"><img className="w-[128px] " src={`http://localhost:8080/img/uploads/itemImages/${foodImage}`} alt="item" /></div>
      <div>{foodName}</div>
      <div>{quantity}</div>
      <div>{formatCurrency(unitPrice)}</div>
      <div>{formatCurrency(quantity * unitPrice)}</div>
    </section>
  )
}

export default ItemDetail
