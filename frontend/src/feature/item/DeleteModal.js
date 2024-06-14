import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "../../ui/Button"
import { HiOutlineXCircle } from "react-icons/hi2";
import { deleteItem, fetchItemsData } from "../../services/api-items";


function DeleteModal({ title, onclick, updateData, pageNum }) {
  const [searchParams] = useSearchParams();
  const itemId = parseInt(searchParams.get("item-selected"));
  const navigate = useNavigate();

  function handleDeleteUser(id) {
    let deleteUserRequest = deleteItem(id);
    deleteUserRequest
      .then(result => {
        if (result.errCode === 0) {
          onclick();
          let request = fetchItemsData(pageNum);
          request.then(data => {
            navigate(`?pageNum=${pageNum}`)
            updateData(data)
          });
        }
        if (result.errCode === 1) console.log(result.errMessage);
      })
  }

  return (
    <div className="absolute top-20 left-[50%] z-[1000] w-96 h-44  bg-white rounded-lg shadow-xl box-border py-4 px-5 flex flex-col items-start -translate-x-[50%] animate-[floatDown_.8s_ease-in-out]">
      <Button position="self-end" onclick={onclick}><HiOutlineXCircle className="text-violet-700" size={30} /></Button>
      <h2 className="text-lg text-neutral-500 mb-1">Bạn chắc chắn muốn xóa {title}</h2>
      <span className="text-neutral-400 mb-2">Hãy nhấn nút xác nhận để xóa</span>
      <div className="flex gap-2 mt-auto self-end">
        <Button onclick={onclick} variation="primary">Hủy</Button>
        <Button onclick={() => { handleDeleteUser(itemId) }} variation="danger">Xóa</Button>
      </div>
    </div>
  )
}

export default DeleteModal


