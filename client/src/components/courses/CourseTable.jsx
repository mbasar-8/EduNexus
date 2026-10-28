function CourseTable({ courses, onDelete, onEdit }) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-4 text-left">ID</th>
            <th className="px-6 py-4 text-left">Course Name</th>
            <th className="px-6 py-4 text-left">Department</th>
            <th className="px-6 py-4 text-left">Status</th>
            <th className="px-6 py-4 text-left">Action</th>
          </tr>
        </thead>

        <tbody>
          {courses.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-6 py-10 text-center text-gray-500">
                No courses found.
              </td>
            </tr>
          ) : (
            courses.map((course) => (
              <tr key={course.id} className="border-t">
                <td className="px-6 py-4">{course.id}</td>

                <td className="px-6 py-4">{course.name}</td>

                <td className="px-6 py-4">{course.department?.name}</td>

                <td className="px-6 py-4">{course.status}</td>

                <td className="flex gap-3 px-6 py-4">
                  <button
                    onClick={() => onEdit(course.id)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => onDelete(course.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default CourseTable;
