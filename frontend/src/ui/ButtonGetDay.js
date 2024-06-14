import { NavLink, useSearchParams } from "react-router-dom"

function ButtonGetDay({ children, day = null, onSetParam, query, disabled }) {
  const [searchParams] = useSearchParams();
  const currentFilter = parseInt(searchParams.get(query)) || 90;

  return (
    <button
      id={day}
      className={`hover:bg-violet-700 hover:text-white rounded-md transition-all duration-300 box-border disabled:bg-violet-700 disabled:text-white`}
      onClick={() => onSetParam(query, day)}
      disabled={day === currentFilter}
    >
      <span className="block px-4 text-lg">{children}</span>
    </button>
  )
}

export default ButtonGetDay
