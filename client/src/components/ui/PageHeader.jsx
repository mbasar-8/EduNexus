import { Search } from "lucide-react";

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
    <div className="mb-8 flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">{title}</h1>

        <p className="mt-2 text-gray-500">{description}</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            value={searchValue}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder={searchPlaceholder}
            className="w-72 rounded-lg border border-gray-300 py-3 pl-11 pr-4 outline-none transition focus:border-blue-600"
          />
        </div>

        <button
          onClick={onButtonClick}
          className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}

export default PageHeader;
