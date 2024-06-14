function Logo({ src, logoName, children }) {
  return (
    <div className="mx-auto my-6 mb-8 flex flex-col items-center">
      <img className={`w-[5.5rem] mb-2 h-[5.5rem] border-2 border-red-500 border-solid inline-block rounded-full`} src={src} alt={logoName} />
      {children ? <h3 className="text-lg font-medium">{children}</h3> : null}
    </div>
  )
}

export default Logo
