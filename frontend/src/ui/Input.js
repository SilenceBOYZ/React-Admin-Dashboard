import { useState } from "react"
import { HiEye, HiEyeSlash } from "react-icons/hi2"


function Input({
  placeholder = "Ex: Type any value",
  name = "default",
  type = "text",
  label = "Custom your input label",
  width = "w-full",
  register,
  errorMessage,
  disable = false,
}) {
  const [isOpen, setIsOpen] = useState(false);
  if (type === "file") {
    return (
      <>
        <input
          type="file"
          name={name}
          {...register}
          disabled={disable}
          className="block w-full border-2 rounded-md text-sm text-slate-500 my-1
        file:mr-4 file:py-2 file:px-4
        file:rounded-md file:border-0
        file:text-sm file:font-semibold
        file:bg-violet-700 file:text-white
        hover:file:cursor-pointer "/>
        {!errorMessage ? null : <p className="ps-3 text-sm mt-1 text-red-600">{errorMessage[`${name}`]?.message}</p>}
      </>
    )
  }


  if (type === "password") {
    return (
      <div className={`gap-2 relative transition-all duration-300 mb-2 ${width}`}>
        <input required id={name} type={!isOpen ? "password" : "text"} placeholder={placeholder} {...register} name={name} disabled={disable} className={`py-2 px-3 border-2 w-full rounded-md tracking-wider transition-all duration-300 text-neutral-500 focus:border-violet-700 target:border-violet-700 outline-violet-700 peer`} />
        <label htmlFor={name} className="trasition-all left-2 top-3 duration-300 absolute z-50 inline-block opacity-0 invisible bg-white ms-1 tracking-wider peer-[:target]:text-violet-700 peer-[:focus]:text-violet-700 peer-[:target]:-translate-y-5 peer-[:focus]:-translate-y-6 peer-[:focus]:opacity-100 peer-[:focus]:visible">{label}</label>
        <button type="button" onClick={() => setIsOpen(open => !open)} className="absolute right-4 top-3"> {isOpen ? <HiEye size={20} /> : <HiEyeSlash size={20} />} </button>
        {!errorMessage ? null : <p className="ps-3 mt-1 text-sm text-red-600">{errorMessage[`${name}`]?.message}</p>}
      </div>
    )
  }


  return (
    <div className="gap-2 relative transition-all duration-300 mb-2 w-full">
      <input
        id={name}
        type={type}
        disabled={disable}
        placeholder={placeholder}
        {...register}
        className={`py-2 px-3 border-2 ${width} rounded-md tracking-wider transition-all duration-300 text-neutral-500 focus:border-violet-700 target:border-violet-700 outline-violet-700 peer`}
      />
      <label htmlFor={name} className="trasition-all left-2 top-3 duration-300 absolute z-50 inline-block opacity-0 invisible bg-white ms-1 tracking-wider peer-[:target]:text-violet-700 peer-[:focus]:text-violet-700 peer-[:target]:-translate-y-5 peer-[:focus]:-translate-y-6 peer-[:focus]:opacity-100 peer-[:focus]:visible">{label}</label>
      {!errorMessage ? null : <p className="ps-3 mt-1 text-sm text-red-600">{errorMessage[`${name}`]?.message}</p>}
    </div>
  )
}

export default Input
