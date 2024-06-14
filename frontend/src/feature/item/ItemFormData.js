import { HiFolderPlus } from "react-icons/hi2";
import Button from "../../ui/Button";
import Spinner from "../../ui/Spinner";
import ViewDataLayout from "../../ui/ViewDataLayout";
import ItemDataRow from "./ItemDataRow";
import Option from "../../ui/Option";
import Heading from "../../ui/Heading";
import { useEffect, useState } from "react";
import { fetchCatergoryData, fetchItemsData } from "../../services/api-items";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../ui/Pagination";
import { createPortal } from "react-dom";
import CreateItemForm from "./CreateItemForm";
import UpdateUserForm from "./UpdateItemForm";
import DeleteModal from "./DeleteModal";

function ItemFormData() {
  const [items, setItems] = useState([]);
  const [catergory, setCatergory] = useState([]);
  const [filterChar, setFilterChar] = useState("ASC")
  const [filterRole, setFilterRole] = useState("ALL");
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenUpdateForm, setIsOpenUpdateForm] = useState(false);
  const [isOpenDeleteBox, setIsOpenDeleteBox] = useState(false);
  const [searchParams] = useSearchParams();
  let pageNum = parseInt(searchParams.get("pageNum")) || 1;

  let itemsSelected = items.dataSelected?.sort((a, b) => a.foodName.localeCompare(b.foodName) * (filterChar === "ASC" ? 1 : -1));
  itemsSelected = filterRole === "ALL" ? itemsSelected : itemsSelected.filter(x => x.catergoryName === filterRole);


  useEffect(() => {
    async function fetchData() {
      let requestItemData = await fetchItemsData(pageNum);
      let requestCatergoryData = await fetchCatergoryData();
      setCatergory(requestCatergoryData.dataSelected);
      setItems(requestItemData)
    }
    fetchData()
  }, [pageNum])

  if (!Object.entries(items).length) return <Spinner />

  return (
    <>
      <ViewDataLayout>
        <div className="flex pe-2 justify-between">
          <div className="flex gap-4 ">
            <Heading>Quản lý sản phẩm</Heading>
            <select className="font-medium text-neutral-700 px-4" onChange={(e) => setFilterChar(e.target.value)} defaultValue="ASC">
              <Option value="ASC">Tìm thứ tự từ A đến Z </Option>
              <Option value="DES">Tìm thứ tự từ Z đến A </Option>
            </select>
            <select className="font-medium text-neutral-700 px-4" onChange={(e) => setFilterRole(e.target.value)} defaultValue="ALL">
              <Option value="ALL">Danh mục</Option>
              {!catergory.length ? <Option>Loading...data</Option> : catergory.map(catergory => <Option value={catergory.catergoryName} key={catergory.id}>{catergory.catergoryName}</Option>)}
            </select>
          </div>
          <Button onclick={() => setIsOpen(open => !open)}><HiFolderPlus className="text-violet-900 " size={32} /></Button>
        </div>
        <div role="table" className="my-6 rounded-md bg-slate-100 overflow-hidden shadow-lg">
          <header role="row" className="uppercase font-medium grid bg-white p-4 grid-cols-[9rem_repeat(3,_.5fr)_10rem_5rem] justify-between">
            <div>Hình ảnh</div>
            <div>Tên sản phẩm</div>
            <div>Giá sản phẩm</div>
            <div>Mô tả</div>
            <div>Loại</div>
            <div>Quản lý</div>
          </header>
          {!itemsSelected?.length && <span>No item have found....</span>}
          {!itemsSelected ? <span>Data is Loading....</span> : itemsSelected.map(item => <ItemDataRow item={item} key={item.id} onclick={() => setIsOpenUpdateForm(open => !open)} onDelete={() => setIsOpenDeleteBox(open => !open)} pageNum={pageNum} />)}
        </div>
        <Pagination
          start={items?.startIndex}
          end={
            items?.lastIndex > items.totalData
              ? items.totalData
              : items?.lastIndex
          }
          totalRecord={items.totalData}
          prevPage={pageNum}
          nextPage={pageNum}
          endingLink={items.totalLink}
        />
      </ViewDataLayout>

      {isOpen ?
        createPortal(
          <CreateItemForm pageNum={pageNum} updateData={setItems} onClick={() => setIsOpen(open => !open)} />,
          document.body
        )
        : null}

      {isOpenUpdateForm ? createPortal(
        <UpdateUserForm updateData={setItems} pageNum={pageNum} onclick={() => setIsOpenUpdateForm(open => !open)} />, document.body
      ) : null}


      {
        isOpenDeleteBox ? createPortal(
          <DeleteModal updateData={setItems} pageNum={pageNum} title="sản phẩm ?" onclick={() => setIsOpenDeleteBox(open => !open)} />, document.getElementById("mainLayoutDataView")
        ) : null
      }
    </>
  )
}

export default ItemFormData;
