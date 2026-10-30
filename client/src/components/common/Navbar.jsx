import { Menu, UserCircle2 } from "lucide-react";

function Navbar({ onMenuClick }) {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-gray-200 bg-white px-3 shadow-sm sm:px-5 lg:px-6">
      {/* Left: Menu + Brand */}
      <div className="flex min-w-0 items-center gap-2 sm:gap-4">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open navigation menu"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-gray-600 transition hover:bg-gray-100 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 md:hidden"
        >
          <Menu size={23} />
        </button>

        <h1 className="truncate text-lg font-bold tracking-tight text-blue-600 sm:text-xl">
          EduNexus
        </h1>
      </div>

      {/* Right: User Profile */}
      <div className="flex min-w-0 items-center gap-2 rounded-lg py-2 pl-2 sm:gap-3 sm:pl-3">
        <UserCircle2
          size={24}
          className="shrink-0 text-gray-500 sm:h-7 sm:w-7"
        />

        <span className="max-w-[120px] truncate text-sm font-semibold text-gray-700 sm:max-w-[200px] sm:text-base">
          {user?.name}
        </span>
      </div>
    </header>
  );
}

export default Navbar;
