import { NavLink } from "react-router-dom"

function ListItem({ children, to }) {
  return (
    <NavLink className="flex mx-9 items-center cursor-pointer font-medium text-neutral-700 hover:bg-neutral-100 p-2 transition-all duration-300 link-nav" to={to}>
      {children}
    </NavLink>
  )
}

export default ListItem
