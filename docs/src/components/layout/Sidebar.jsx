import { NavLink } from "react-router-dom";
import { FaChartPie, FaExchangeAlt, FaBullseye, FaChartBar } from "react-icons/fa";

export default function Sidebar() {
  const baseStyle =
    "flex items-center gap-3 p-3 rounded-lg transition";

  const activeStyle = "bg-[#00D4FF] text-black";
  const inactiveStyle = "text-[#A5B5BF] hover:bg-[#1B2A3A] hover:text-white";

  return (
    <aside className="w-64 bg-[#0B1220] border-r border-[#1B2A3A] p-4">

      <h1 className="text-2xl font-bold text-[#00D4FF] mb-8">
        FlowCash
      </h1>

      <nav className="flex flex-col gap-4">

        <NavLink
          to="/"
          className={({ isActive }) =>
            `${baseStyle} ${isActive ? activeStyle : inactiveStyle}`
          }
        >
          <FaChartPie />
          Dashboard
        </NavLink>

        <NavLink
          to="/transactions"
          className={({ isActive }) =>
            `${baseStyle} ${isActive ? activeStyle : inactiveStyle}`
          }
        >
          <FaExchangeAlt />
          Transacciones
        </NavLink>

        <NavLink
          to="/goals"
          className={({ isActive }) =>
            `${baseStyle} ${isActive ? activeStyle : inactiveStyle}`
          }
        >
          <FaBullseye />
          Metas
        </NavLink>

        <NavLink
          to="/charts"
          className={({ isActive }) =>
            `${baseStyle} ${isActive ? activeStyle : inactiveStyle}`
          }
        >
          <FaChartBar />
          Gráficas
        </NavLink>

      </nav>
    </aside>
  );
}