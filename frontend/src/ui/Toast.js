import { createPortal } from "react-dom"

function Toast({ icon, message, status = 'success' }) {
  let bgColor = {
    success: "before:bg-violet-600",
    failed: "before:bg-red-600"
  }

  let borderColor = {
    success: "border-violet-600",
    failed: "border-red-600"
  }

  let textColor = {
    success: 'text-violet-600',
    failed: 'text-red-600'
  }

  let beforeClass = `before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-full before:h-[3px] ${bgColor[status]} before:animate-[rollingBack_2s_ease-in_forwards]`

  return (
    <>
      {createPortal(
        <div className={`absolute w-[20rem] left-[50%] top-8 -translate-x-1/2 bg-white shadow-md rounded-md p-4 box-border flex items-center gap-3 border-s-[3px] ${borderColor[status]} overflow-hidden animate-[floatDown_1s_ease-in-out] ${beforeClass}`}>
          {icon}
          <h3 className={`${textColor[status]}`}>{message}</h3>
        </div>, document.body
      )}
    </>
  )
}

export default Toast
