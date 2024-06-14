import { Link } from "react-router-dom"

function Button({ onclick, children, type = "button", variation, to = "", position = "relative" }) {
  const styles = {
    default: `` + position,
    normal: 'px-4 py-1.5 border-2 rounded-md tracking-wide',
    danger: `px-4 py-1.5 bg-red-500 rounded-md text-white tracking-wide ` + position,
    primary: `px-4 py-1.5 bg-violet-600 rounded-md text-white tracking-wide ` + position,
    link: "font-medium px-2 py-1 rounded-md border-2 border-neutral-200 hover:border-violet-800 trasition-all duration-300 " + position
  }

  if (type === "button" || type === "submit") {
    return <button type={type} className={!styles[variation] ? styles.default : styles[variation]} onClick={onclick}>
      {children}
    </button>
  }

  return (
    <Link className={!styles[variation] ? styles.default : styles[variation]} to={to}>
      {children}
    </Link>
  )
}

export default Button;
