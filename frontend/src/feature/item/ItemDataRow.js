import { HiPencil, HiTrash } from "react-icons/hi2";
import { Link } from "react-router-dom";
import formatCurrency from "../../utlis/formatCurrency";

function ItemDataRow({ item, onclick, pageNum, onDelete }) {
  const { id, foodName, foodPrice, foodDesc, foodImage, catergoryName } = item;
  return (
    <section role="row" className="grid items-center bg-white grid-cols-[9rem_repeat(3,_.5fr)_10rem_5rem] px-4 py-1 border-b-2 border-neutral-100 last:border-none font-medium text-neutral-600">
      <div className="w-[5rem] h-18 p-2 rounded-full overflow-hidden"><img className="w-[64px] h-[64px]" src={`http://localhost:8080/img/uploads/itemImages/${foodImage}`} alt="item" /></div>
      <div>{foodName}</div>
      <div>{formatCurrency(foodPrice)}</div>
      <div>{foodDesc}</div>
      <div>{catergoryName}</div>
      <div className="flex gap-4">
        <Link onClick={onclick} to={`?pageNum=${pageNum}&item-selected=${id}`}><HiPencil className="text-violet-800" size={22} /></Link>
        <Link onClick={onDelete} to={`?pageNum=${pageNum}&item-selected=${id}`}><HiTrash className="text-violet-800 " size={22} /></Link>
      </div>
    </section>
  )
}

export default ItemDataRow;
