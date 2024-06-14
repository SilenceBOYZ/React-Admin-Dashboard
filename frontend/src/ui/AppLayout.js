import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom"

function AppLayout() {
  return (
    <div className="flex h-full">
      <Sidebar />
      <main id="mainLayoutDataView" className="w-full bg-zinc-100">
        <Header />
        <Outlet />
      </main>
    </div>
  )
}

export default AppLayout;
