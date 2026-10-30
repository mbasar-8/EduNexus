import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  Building2,
  BookOpen,
  LogOut,
  X,
} from "lucide-react";

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setSidebarOpen(false);

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  const navigationItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Students",
      path: "/students",
      icon: Users,
    },
    {
      name: "Teachers",
      path: "/teachers",
      icon: GraduationCap,
    },
    {
      name: "Departments",
      path: "/departments",
      icon: Building2,
    },
    {
      name: "Courses",
      path: "/courses",
      icon: BookOpen,
    },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-x-0 bottom-0 top-16 z-40 bg-slate-950/50 backdrop-blur-[2px] transition-opacity md:hidden"
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-16 z-50
          flex h-[calc(100dvh-4rem)] w-72 max-w-[85vw] flex-col
          bg-slate-900 text-white shadow-xl
          transition-transform duration-300 ease-in-out

          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}

          md:sticky md:top-16 md:h-[calc(100vh-4rem)]
          md:w-64 md:max-w-none md:shrink-0
          md:translate-x-0 md:shadow-none
        `}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between border-b border-slate-700 px-5 py-5">
          <div>
            <h2 className="text-lg font-bold tracking-wide text-white">
              Navigation
            </h2>

            <p className="mt-1 text-xs text-slate-400">
              Manage your institution
            </p>
          </div>

          {/* Mobile Close Button */}
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close navigation menu"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-300 transition hover:bg-slate-800 hover:text-white md:hidden"
          >
            <X size={21} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 space-y-2 overflow-y-auto px-4 py-6">
          <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
            Main Menu
          </p>

          {navigationItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-blue-600 text-white shadow-md shadow-blue-900/20"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`
                }
              >
                <Icon
                  size={20}
                  className="shrink-0 transition-transform duration-200 group-hover:scale-110"
                />

                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="border-t border-slate-700 p-4">
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center justify-center gap-3 rounded-xl bg-red-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-slate-900"
          >
            <LogOut size={19} />
            <span>Logout</span>
          </button>

          <p className="mt-4 text-center text-xs text-slate-500">
            EduNexus · Version 1.0.0
          </p>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
