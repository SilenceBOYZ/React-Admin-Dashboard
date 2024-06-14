import { useEffect, useState } from "react";
import { fetchCatergoryData } from "../services/api-items";

function useFetchCatergory() {
  const [catergory, setCatergory] = useState([]);

  useEffect(() => {
    async function fetchData() {
      let requestCatergoryData = await fetchCatergoryData();
      setCatergory(requestCatergoryData.dataSelected);
    }
    fetchData()
  }, [])
  
  return catergory;
}

export default useFetchCatergory
