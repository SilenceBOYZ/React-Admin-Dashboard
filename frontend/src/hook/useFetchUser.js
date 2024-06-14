import { useEffect, useState } from "react";
import { fetchUser } from "../services/api-users";

function useFetchUser(userId) {
  const [userInfor, setUserInfor] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchUserData() {
      setIsLoading(true);
      if (!userId) return;
      let userData = await fetchUser(userId);
      setUserInfor(userData.dataSelected);
      setIsLoading(false);
    }
    fetchUserData();
  }, [userId]);

  return { userInfor, isLoading }
}

export default useFetchUser
