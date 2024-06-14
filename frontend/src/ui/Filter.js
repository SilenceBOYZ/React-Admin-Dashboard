import { useSearchParams } from "react-router-dom"
import ButtonGetDay from "./ButtonGetDay"


function Filter() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  function handleSearchParam (query, value) {
    searchParams.set(query, value);
    setSearchParams(searchParams);
  }

  return (
    <div className="flex items-center bg-white px-2 gap-1 rounded-md shadow-md">
      <ButtonGetDay query={"last"} onSetParam={handleSearchParam} day={7}>7 ngày</ButtonGetDay>
      <ButtonGetDay query={"last"} onSetParam={handleSearchParam} day={30}>30 ngày</ButtonGetDay>
      <ButtonGetDay query={"last"} onSetParam={handleSearchParam} day={90}>90 ngày</ButtonGetDay>
    </div>
  )
}

export default Filter
