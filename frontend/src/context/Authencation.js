import { createContext, useContext  } from "react";
import { useNavigate } from "react-router-dom";
import { getUserId } from "../services/api-auth";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const navigate = useNavigate();

  async function getUserData() {
    try {
      let token = localStorage.getItem("user");
      let data = await getUserId(token);
      return data.dataSelected;
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error; 
    }
  }

  function handleCheckLogin() {
    return localStorage.getItem("user");
  }

  function backToHomePage() {
    navigate(-1)
  }

  function handleSetToken(userToken) {
    localStorage.setItem("user", userToken)
  }

  function handleLogout() {
    localStorage.clear();
    navigate("/")
  }

  return <AuthContext.Provider value={{
    handleCheckLogin,
    handleSetToken,
    handleLogout,
    navigate,
    getUserData,
    backToHomePage
  }}>
    {children}
  </AuthContext.Provider>
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error("Context is use outside");
  return context;
}

export { AuthProvider, useAuth }