import { Pencil, Trash2, Users } from "lucide-react";

function StudentTable({ students, onDelete, onEdit }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      {/* Table Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 px-5 py-5 sm:px-6">
        <div>
          <h2 className="text-lg font-bold text-slate-800">Student List</h2>

          <p className="mt-1 text-sm text-gray-500">
            Manage all registered students.
          </p>
        </div>

        <span className="rounded-full bg-blue-50 px-3 py-1.5 text-sm font-semibold text-blue-600">
          {students.length} Students
        </span>
      </div>

      {/* Responsive Table */}
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[750px] text-left">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                ID
              </th>

              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Student
              </th>

              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Email Address
              </th>

              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Department
              </th>

              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Status
              </th>

              <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-gray-500">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {students.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-16 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                    <Users size={26} />
                  </div>

                  <h3 className="mt-4 font-semibold text-slate-700">
                    No students found
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Try adjusting your search or add a new student.
                  </p>
                </td>
              </tr>
            ) : (
              students.map((student) => (
                <tr key={student.id} className="transition hover:bg-blue-50/40">
                  {/* ID */}
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-500">
                    #{student.id}
                  </td>

                  {/* Student Name */}
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold uppercase text-blue-600">
                        {student.name?.charAt(0) || "S"}
                      </div>

                      <span className="text-sm font-semibold text-slate-800">
                        {student.name}
                      </span>
                    </div>
                  </td>

                  {/* Email */}
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                    {student.email}
                  </td>

                  {/* Department */}
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                    {student.department || "—"}
                  </td>

                  {/* Status */}
                  <td className="whitespace-nowrap px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                        student.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          student.status === "Active"
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      />

                      {student.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => onEdit(student.id)}
                        aria-label={`Edit ${student.name}`}
                        title="Edit student"
                        className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition hover:bg-blue-600 hover:text-white"
                      >
                        <Pencil size={16} />
                      </button>

                      <button
                        onClick={() => onDelete(student.id)}
                        aria-label={`Delete ${student.name}`}
                        title="Delete student"
                        className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-600 transition hover:bg-red-600 hover:text-white"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Table Footer */}
      <div className="border-t border-gray-100 bg-gray-50/70 px-5 py-4 sm:px-6">
        <p className="text-xs text-gray-500">
          Showing{" "}
          <span className="font-semibold text-slate-700">
            {students.length}
          </span>{" "}
          students
        </p>
      </div>
    </div>
  );
}

export default StudentTable;
