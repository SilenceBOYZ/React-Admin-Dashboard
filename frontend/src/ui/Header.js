import { HiUser, HiMiniArrowRightOnRectangle } from "react-icons/hi2";
import Button from "./Button";
import { useAuth } from "../context/Authencation";
import { useEffect, useState } from "react";

function Header() {
  const { handleLogout, getUserData } = useAuth();
  const [userInfor, setUserInfor] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      let request = await getUserData();
      setUserInfor(request);
    }
    fetchUser();
  }, [getUserData])

  if (!userInfor) return <div className="flex justify-center items-center"></div> 

  let [{ id, userImage }] = userInfor;

  return (
    <header className="bg-white">
      <div className="p-1 pe-8 flex gap-4 justify-end items-center">
        <img src={`http://localhost:8080/img/uploads/userImages/${userImage}`} alt="User" className="border-solid p-1 border-spacing-1 rounded-full border-2 w-14 h-14" />
        <Button type="link" to={`setting/${id}`}>
          <HiUser className="hover:bg-slate-200 rounded-sm p-1 transition duration-300 " size={32} />
        </Button>
        <Button onclick={() => handleLogout()}>
          <HiMiniArrowRightOnRectangle className="hover:bg-slate-200 rounded-sm p-1 transition duration-300" size={32} />
        </Button>
      </div>
    </header>
  )
}

export default Header;
