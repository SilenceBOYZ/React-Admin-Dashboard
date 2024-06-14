import { useState } from "react"
import { HiEye, HiEyeSlash } from "react-icons/hi2"

function Input({ placeholder = "Ex: Type any value", name = "default", type = "text", label = "Custom your input label", width = "w-full", handleFormValue }) {
  const [isOpen, setIsOpen] = useState(false);
  if (type === "file") {
    return (
      <input type="file" name={name} onChange={(e) => handleFormValue(e.target.value)} 
        className="block w-full border-2 rounded-md text-sm text-slate-500 mb-5
               file:mr-4 file:py-2 file:px-4
               file:rounded-md file:border-0
               file:text-sm file:font-semibold
             file:bg-violet-700 file:text-white
               hover:file:cursor-pointer "/>
    )
  }


  if (type === "password") {
    return (
      <div className={`flex items-center gap-2 relative transition-all duration-300 mb-5 ${width}`}>
        <input required id={name} type={!isOpen ? "password" : "text"} placeholder={placeholder} onChange= {(e) => handleFormValue(e.target.value)} name={name} className={`py-2 px-3 border-2 w-full rounded-md tracking-wider transition-all duration-300 text-neutral-500 focus:border-violet-700 target:border-violet-700 outline-violet-700 peer`}/>
        <label htmlFor={name} className="trasition-all duration-300 absolute z-50 inline-block opacity-0 invisible bg-white ms-3.5 tracking-wider peer-[:target]:text-violet-700 peer-[:focus]:text-violet-700 peer-[:target]:-translate-y-5 peer-[:focus]:-translate-y-6 peer-[:focus]:opacity-100 peer-[:focus]:visible">{label}</label>
        <button type="button" onClick={() => setIsOpen(open => !open)} className="absolute right-4"> {isOpen ? <HiEye size={20} /> : <HiEyeSlash size={20} />} </button>
      </div>
    )
  }


  return (
    <div className="flex items-center gap-2 relative transition-all duration-300 mb-5 w-full">
      <input 
      required 
      id={name} 
      type={type} 
      placeholder={placeholder} name={name} 
      className={`py-2 px-3 border-2 ${width} rounded-md tracking-wider transition-all duration-300 text-neutral-500 focus:border-violet-700 target:border-violet-700 outline-violet-700 peer`} 
      onChange= {(e) => handleFormValue(e.target.value)} />
      <label htmlFor={name} className="trasition-all duration-300 absolute z-50 inline-block opacity-0 invisible bg-white ms-3.5 tracking-wider peer-[:target]:text-violet-700 peer-[:focus]:text-violet-700 peer-[:target]:-translate-y-5 peer-[:focus]:-translate-y-6 peer-[:focus]:opacity-100 peer-[:focus]:visible">{label}</label>
    </div>
  )
}

export default Input
