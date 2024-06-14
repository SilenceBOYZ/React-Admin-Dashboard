import { useEffect, useState } from "react";
import Heading from "../../ui/Heading";
import { fetchUsersData, fetchUsersRole } from "../../services/api-users";
import UserDataRow from "./UserDataRow";
import ViewDataLayout from "../../ui/ViewDataLayout"
import Pagination from "../../ui/Pagination";
import { HiFolderPlus } from "react-icons/hi2";
import Option from "../../ui/Option";
import Button from "../../ui/Button";
import CreateUserForm from "./CreateUserForm";
import { createPortal } from "react-dom";
import UpdateUserForm from "./UpdateUserForm";
import DeleteModal from "./DeleteModal";
import { useSearchParams } from "react-router-dom";
import Spinner from "../../ui/Spinner";


function UserFormData() {
  const [userData, setUserData] = useState([]);
  const [roleData, setRoleData] = useState([]);
  const [filterChar, setFilterChar] = useState("ASC")
  const [filterRole, setFilterRole] = useState("ALL");
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenUpdateForm, setIsOpenUpdateForm] = useState(false);
  const [isOpenDeleteBox, setIsOpenDeleteBox] = useState(false);
  const [searchParams] = useSearchParams();
  let pageNum = parseInt(searchParams.get("pageNum")) || 1;

  useEffect(() => {
    async function getData() {
      let fetchData = await fetchUsersData(pageNum);
      let fetchRoleUsers = await fetchUsersRole();
      setUserData(fetchData);
      setRoleData(fetchRoleUsers);
    }
    getData();
  }, [pageNum])


  if (!Object.entries(userData).length) return <Spinner />

  let userSelected = userData.dataSelected?.sort((a, b) => a.userName.localeCompare(b.userName) * (filterChar === "ASC" ? 1 : -1));
  userSelected = filterRole === "ALL" ? userSelected : userSelected.filter(x => x.roleName === filterRole);

  function handleOpenAddForm() {
    setIsOpen(open => !open);
  }

  function handleOpenUpdateForm() {
    setIsOpenUpdateForm(open => !open)
  }

  function handleOpenDeleteModal() {
    setIsOpenDeleteBox(open => !open);
  }

  return (
    <>
      <ViewDataLayout className="max-w-[65rem] mx-auto ">
        <div className="flex pe-2 justify-between">
          <div className="flex gap-4 ">
            <Heading>Quản lý người dùng</Heading>
            <select className="font-medium text-neutral-700 px-4" onChange={(e) => setFilterChar(e.target.value)} defaultValue="ASC">
              <Option value="ASC">Tìm thứ tự từ A đến Z </Option>
              <Option value="DES">Tìm thứ tự từ Z đến A </Option>
            </select>
            <select className="font-medium text-neutral-700 px-4" onChange={(e) => setFilterRole(e.target.value)} defaultValue="ALL">
              <Option value="ALL">Vai trò</Option>
              <Option value="ALL">Tất cả</Option>
              {!roleData ? null : roleData.map(role => <Option value={role.roleName} key={role.id}>{role.roleName}</Option>)}
            </select>
          </div>
          <Button onclick={() => handleOpenAddForm()}><HiFolderPlus className="text-violet-900 " size={32} /></Button>
        </div>
        <div role="table" className="my-6 rounded-md bg-slate-100 overflow-hidden shadow-lg">
          <header role="row" className="uppercase font-medium grid bg-white p-4 grid-cols-[9rem_repeat(2,_.5fr)_10rem_5rem] justify-between">
            <div>Hình ảnh</div>
            <div>Tên người dùng</div>
            <div>Email</div>
            <div>Vai trò</div>
            <div>Quản lý</div>
          </header>
          {!userSelected ? <span>Data is Loading....</span> : userSelected.map(user => <UserDataRow user={user} pageNum={pageNum} updateData={setUserData} onclick={handleOpenUpdateForm} onDelete={handleOpenDeleteModal} key={user.id} />)}
          {!userSelected?.length && <span>Không tìm thấy kết quả</span>}
        </div>
        <Pagination
          start={userData?.startIndex}
          end={
            userData?.lastIndex > userData.totalData
              ? userData.totalData
              : userData?.lastIndex
          }
          totalRecord={userData.totalData}
          prevPage={pageNum}
          nextPage={pageNum}
          endingLink={userData.totalLink}
        />
      </ViewDataLayout>

      {isOpen ?
        createPortal(
          <CreateUserForm updateData={setUserData} pageNum={pageNum} onClick={() => handleOpenAddForm()} />,
          document.body
        )
        : null}

      {isOpenUpdateForm ? createPortal(
        <UpdateUserForm updateData={setUserData} pageNum={pageNum} onclick={() => handleOpenUpdateForm()} />, document.body
      ) : null}

      {
        isOpenDeleteBox ? createPortal(
          <DeleteModal updateData={setUserData} pageNum={pageNum} title="tài khoản này ?" onclick={() => handleOpenDeleteModal()} />, document.getElementById("mainLayoutDataView")
        ) : null
      }
    </>
  )
}

export default UserFormData;
