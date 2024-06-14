
import Logo from "./Logo"
import { HiNewspaper, HiMiniSquare3Stack3D, HiUser, HiMiniPresentationChartBar, HiMiniKey } from "react-icons/hi2";
import ListItem from "./ListItem";
import { useAuth } from "../context/Authencation";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";


function Sidebar() {
  const { handleLogout, getUserData } = useAuth();
  const [user, setUser] = useState([]);

  useEffect(() => {
    async function fetchUser() {
      let request = await getUserData();
      setUser(request);
    }
    fetchUser();
  }, [getUserData])


  return (
    <nav className="h-screen bg-white w-1/5 flex flex-col ">
      <Logo src="http://localhost:8080/img/Pizza.png">Admin DashBoard</Logo>

      {!user.length ? <div className="self-center ">Loading....</div> :
        <ul className="flex flex-col font-normal text-xl mt-8 space-y-4 capitalize">
          <ListItem to="dashboard">
            <HiMiniPresentationChartBar className="text-violet-700" size={28} />
            <span className="ms-5" >dashboard</span>
          </ListItem>
          {user[0].roleId === 0 ?
            <ListItem to="users">
              <HiUser className="text-violet-700" size={28} />
              <span className="ms-5">users</span>
            </ListItem> : null
          }
          <ListItem to="items">
            <HiMiniSquare3Stack3D className="text-violet-700" size={28} />
            <span className="ms-5" >items</span>
          </ListItem>
          <ListItem to="orders">
            <HiNewspaper className="text-violet-700" size={28} />
            <span className="ms-5" >Orders</span>
          </ListItem>
        </ul>
      }
    </nav>
  )
}

export default Sidebar
