import { useEffect, useState } from "react";
import { fetchUsersRole } from "../services/api-users";

function useFetchRole() {
  const [roleData, setRoleData] = useState([]);
  
  useEffect(() => {
    async function getData() {
      let fetchRoleUsers = await fetchUsersRole();
      setRoleData(fetchRoleUsers);
    }
    getData();
  }, []);

  return roleData;
}

export default useFetchRole
