function  Select({ children, register, type="default", width = "w-full", errorMessage, name }) {
  const base = 'font-medium text-neutral-700 px-3';

  const styles = {
    default: base,
    customStyle1:  'border-2 px-3 py-2 rounded-md text-neutral-500 focus:border-violet-700 target:border-violet-700 mt-3 ' + base +  ` ${width}`
  }

  return (
    <>
    <select name={name} className={`${styles[type]}`} {...register} onChange={(e) => e.target.value}>
      {children}
    </select>
    {!errorMessage ? null : <p className="ps-3 mt-1 text-sm text-red-600">{errorMessage[`${name}`]?.message}</p>}
    </>
  )
}

export default Select
