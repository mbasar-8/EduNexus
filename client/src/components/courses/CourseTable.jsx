import { Pencil, Trash2, BookOpen } from "lucide-react";

function CourseTable({ courses, onDelete, onEdit }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      {/* Desktop Table */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-sm text-gray-500">
            <tr>
              <th className="px-6 py-4 font-semibold">ID</th>
              <th className="px-6 py-4 font-semibold">Course Name</th>
              <th className="px-6 py-4 font-semibold">Department</th>
              <th className="px-6 py-4 font-semibold">Status</th>
              <th className="px-6 py-4 text-center font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {courses.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center">
                  <BookOpen size={36} className="mx-auto mb-3 text-gray-300" />
                  <p className="font-medium text-gray-600">No courses found</p>
                  <p className="mt-1 text-sm text-gray-400">
                    Try adding a new course.
                  </p>
                </td>
              </tr>
            ) : (
              courses.map((course) => (
                <tr key={course.id} className="transition hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-500">
                    #{course.id}
                  </td>

                  <td className="px-6 py-4">
                    <p className="font-semibold text-slate-800">
                      {course.name}
                    </p>
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-600">
                    {course.department?.name || "N/A"}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                        course.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {course.status}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => onEdit(course.id)}
                        aria-label={`Edit ${course.name}`}
                        className="rounded-lg p-2 text-blue-600 transition hover:bg-blue-50"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        onClick={() => onDelete(course.id)}
                        aria-label={`Delete ${course.name}`}
                        className="rounded-lg p-2 text-red-600 transition hover:bg-red-50"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="divide-y divide-gray-100 md:hidden">
        {courses.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <BookOpen size={36} className="mx-auto mb-3 text-gray-300" />
            <p className="font-medium text-gray-600">No courses found</p>
            <p className="mt-1 text-sm text-gray-400">
              Try adding a new course.
            </p>
          </div>
        ) : (
          courses.map((course) => (
            <div key={course.id} className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-xs text-gray-400">
                    Course ID: #{course.id}
                  </p>

                  <h3 className="mt-1 break-words font-semibold text-slate-800">
                    {course.name}
                  </h3>

                  <p className="mt-2 text-sm text-gray-500">
                    {course.department?.name || "N/A"}
                  </p>
                </div>

                <span
                  className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                    course.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {course.status}
                </span>
              </div>

              <div className="mt-4 flex justify-end gap-2 border-t border-gray-100 pt-3">
                <button
                  onClick={() => onEdit(course.id)}
                  className="flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-100"
                >
                  <Pencil size={15} />
                  Edit
                </button>

                <button
                  onClick={() => onDelete(course.id)}
                  className="flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100"
                >
                  <Trash2 size={15} />
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CourseTable;
