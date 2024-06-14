import { useAuth } from "../context/Authencation"
import Heading from "./Heading"

function Error() {
  const { backToHomePage } = useAuth();
  return (
    <div className="w-full h-screen relative">
      <div className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col items-center justify-center uppercase">
        <span className="text-[14rem]">404</span>
        <Heading position="mb-4">Trang không tồn tại</Heading>
        <p className="cursor-pointer text-violet-700 pb-2  border-b-2 border-transparent hover:border-violet-700 transition-all duration-300" onClick={() => backToHomePage()}>Vui Lòng quay về trang chủ </p>
      </div>
    </div>
  )
}

export default Error
