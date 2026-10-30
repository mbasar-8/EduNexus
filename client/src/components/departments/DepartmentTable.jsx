import { Pencil, Trash2, Building2 } from "lucide-react";

function DepartmentTable({ departments, onDelete, onEdit }) {
  const getStatusStyle = (status) => {
    return status === "Active"
      ? "bg-green-50 text-green-700 ring-green-600/20"
      : "bg-red-50 text-red-700 ring-red-600/20";
  };

  if (departments.length === 0) {
    return (
      <div className="flex min-h-72 flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white px-4 text-center shadow-sm">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-blue-600">
          <Building2 size={28} />
        </div>

        <h3 className="text-lg font-semibold text-slate-800">
          No Departments Found
        </h3>

        <p className="mt-2 max-w-sm text-sm text-gray-500">
          No departments are available to display. Try changing your search or
          add a new department.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      {/* Desktop Table */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-[600px] text-left">
          <thead className="bg-gray-50">
            <tr className="border-b border-gray-200">
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                ID
              </th>

              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Department
              </th>

              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Status
              </th>

              <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {departments.map((department) => (
              <tr
                key={department.id}
                className="transition hover:bg-gray-50/80"
              >
                <td className="px-6 py-4 text-sm text-gray-500">
                  #{department.id}
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                      <Building2 size={19} />
                    </div>

                    <p className="text-sm font-semibold text-slate-800">
                      {department.name}
                    </p>
                  </div>
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${getStatusStyle(department.status)}`}
                  >
                    {department.status}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => onEdit(department.id)}
                      aria-label={`Edit ${department.name}`}
                      title="Edit Department"
                      className="rounded-lg p-2 text-blue-600 transition hover:bg-blue-50"
                    >
                      <Pencil size={17} />
                    </button>

                    <button
                      type="button"
                      onClick={() => onDelete(department.id)}
                      aria-label={`Delete ${department.name}`}
                      title="Delete Department"
                      className="rounded-lg p-2 text-red-600 transition hover:bg-red-50"
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="divide-y divide-gray-100 md:hidden">
        {departments.map((department) => (
          <div key={department.id} className="p-4 sm:p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                  <Building2 size={21} />
                </div>

                <div className="min-w-0">
                  <h3 className="break-words font-semibold text-slate-800">
                    {department.name}
                  </h3>

                  <p className="mt-1 text-xs text-gray-400">
                    Department ID: #{department.id}
                  </p>
                </div>
              </div>

              <span
                className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${getStatusStyle(department.status)}`}
              >
                {department.status}
              </span>
            </div>

            <div className="mt-4 flex justify-end gap-2 border-t border-gray-100 pt-3">
              <button
                type="button"
                onClick={() => onEdit(department.id)}
                className="inline-flex items-center gap-2 rounded-lg bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 transition hover:bg-blue-100"
              >
                <Pencil size={15} />
                Edit
              </button>

              <button
                type="button"
                onClick={() => onDelete(department.id)}
                className="inline-flex items-center gap-2 rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-700 transition hover:bg-red-100"
              >
                <Trash2 size={15} />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DepartmentTable;
