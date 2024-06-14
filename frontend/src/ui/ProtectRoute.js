import { useEffect } from "react";
import { useAuth } from "../context/Authencation"

function ProtectRoute({ children }) {
  const { handleCheckLogin, navigate } = useAuth();

  const authenticated = handleCheckLogin();

  useEffect(() => {
    if (!authenticated) navigate("/")
  }, [authenticated, navigate])

  if (authenticated) return children;

  return <div>Loading.......</div>

}

export default ProtectRoute
