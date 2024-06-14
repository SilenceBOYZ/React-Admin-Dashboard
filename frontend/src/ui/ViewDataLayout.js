function ViewDataLayout({ children, width = "max-w-[70rem]" }) {
  return (
    <div className={`${width} p-4 pt-6 mx-auto box-border`}>
      {children}
    </div>
  )
}

export default ViewDataLayout
