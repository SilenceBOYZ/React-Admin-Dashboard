import Heading from "./Heading"

function BoardStatics({ title, value, children, bgColor = "bg-white" }) {
  return (
    <div className={`w-1/4 bg-white flex items-center box-border px-4 py-4  rounded-md gap-3 `}>
      <div className={`flex justify-center items-center rounded-full ${bgColor} w-16 h-16`}>
        {children}
      </div>
      
      <div>
        <Heading type="h4" color="teriary">{title}</Heading>
        <span className="text-2xl">{value}</span>
      </div>
    </div>
  )
}

export default BoardStatics
