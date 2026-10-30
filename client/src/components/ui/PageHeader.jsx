import { Search, Plus, X } from "lucide-react";

function PageHeader({
  title,
  description,
  buttonText,
  onButtonClick,
  searchPlaceholder,
  searchValue,
  onSearchChange,
}) {
  return (
    <div className="mb-6 space-y-5">
      {/* Page Title and Description */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl">
          {title}
        </h1>

        <p className="mt-2 text-sm text-gray-500 sm:text-base">{description}</p>
      </div>

      {/* Search and Action */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Search Input */}
        <div className="relative w-full sm:max-w-sm">
          <Search
            size={19}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            value={searchValue}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder={searchPlaceholder || "Search..."}
            className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-11 text-sm text-slate-700 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
          />

          {searchValue && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
            >
              <X size={17} />
            </button>
          )}
        </div>

        {/* Add Button */}
        <button
          type="button"
          onClick={onButtonClick}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 active:scale-[0.98] sm:w-auto"
        >
          <Plus size={19} />
          {buttonText?.replace(/^\+\s*/, "") || "Add New"}
        </button>
      </div>
    </div>
  );
}

export default PageHeader;
