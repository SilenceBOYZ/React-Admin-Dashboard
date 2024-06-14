function Heading({ children, type = "h1", style = "default", color = "secondary", position = "text-left" }) {
  const styles = {
    default: "font-bold"
  }
  const colorType = {
    primary: "text-violet-700",
    secondary: "text-neutral-600",
    teriary: "text-neutral-500"
  }

  if (type === "h1")
    return (
      <h1 className={`text-3xl ${styles[style]} ${colorType[color]} ${position}`}>
        {children}
      </h1>
    )
  if (type === "h2")
    return <h2 className={`text-xl ${styles[style]} ${colorType[color]} ${position}`} >{children}</h2>

  if (type === "h3")
    return <h3 className={`text-lg ${styles[style]} ${colorType[color]} ${position}`}>{children}</h3>

  if (type === "h4")
    return <h4 className={`text-sm ${styles[style]} ${colorType[color]} ${position}`}>{children}</h4>
}

export default Heading
