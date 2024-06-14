import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import UserPage from "./page/UserPage"
import ItemPage from "./page/ItemPage"
import AppLayout from "./ui/AppLayout"
import DashBoardPage from "./page/DashBoardPage"
import Login from "./page/Login"
import Error from "./ui/Error"
import { AuthProvider } from "./context/Authencation"
import ProtectRoute from "./ui/ProtectRoute"
import SignUp from "./page/SignUp"
import SettingPage from "./page/SettingPage"
import OrdersPage from "./page/OrdersPage"

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="admin" element={<ProtectRoute><AppLayout /></ProtectRoute>} >
            <Route index element={<Navigate replace to="dashboard"/>}/>
            <Route path="dashboard" element={<DashBoardPage />} />
            <Route path="users" element={<UserPage />} />
            <Route path="setting/:account" element={<SettingPage />} />
            <Route path="items" element={<ItemPage />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="*" element={<Error />} />
          </Route>
          <Route path="/" index element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
