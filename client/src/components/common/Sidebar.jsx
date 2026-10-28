import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <aside className="h-[calc(100vh-64px)] w-64 bg-slate-800 text-white">
      <div className="p-6">
        <h2 className="text-lg font-semibold">Navigation</h2>

        <nav className="mt-6 space-y-3">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `block rounded-lg px-4 py-2 transition ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-slate-700"
              }`
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/students"
            className={({ isActive }) =>
              `block rounded-lg px-4 py-2 transition ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-slate-700"
              }`
            }
          >
            Students
          </NavLink>

          <NavLink
            to="/teachers"
            className={({ isActive }) =>
              `block rounded-lg px-4 py-2 transition ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-slate-700"
              }`
            }
          >
            Teachers
          </NavLink>

          <NavLink
            to="/departments"
            className={({ isActive }) =>
              `block rounded-lg px-4 py-2 transition ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-slate-700"
              }`
            }
          >
            Departments
          </NavLink>

          <NavLink
            to="/courses"
            className={({ isActive }) =>
              `block rounded-lg px-4 py-2 transition ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-slate-700"
              }`
            }
          >
            Courses
          </NavLink>
        </nav>
        <button
          onClick={handleLogout}
          className="w-full rounded-lg bg-red-600 px-4 py-2 font-medium text-white transition hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
