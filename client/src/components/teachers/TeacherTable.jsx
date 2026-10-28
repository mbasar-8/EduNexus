function TeacherTable({ teachers, onDelete, onEdit }) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-4 text-left">ID</th>
            <th className="px-6 py-4 text-left">Name</th>
            <th className="px-6 py-4 text-left">Email</th>
            <th className="px-6 py-4 text-left">Department</th>
            <th className="px-6 py-4 text-left">Status</th>
            <th className="px-6 py-4 text-left">Action</th>
          </tr>
        </thead>

        <tbody>
          {teachers.length === 0 ? (
            <tr>
              <td colSpan={6} className="px-6 py-10 text-center text-gray-500">
                No teachers found.
              </td>
            </tr>
          ) : (
            teachers.map((teacher) => (
              <tr key={teacher.id} className="border-t">
                <td className="px-6 py-4">{teacher.id}</td>

                <td className="px-6 py-4">{teacher.name}</td>

                <td className="px-6 py-4">{teacher.email}</td>

                <td className="px-6 py-4">{teacher.department}</td>

                <td className="px-6 py-4">{teacher.status}</td>

                <td className="px-6 py-4 flex gap-3">
                  <button
                    onClick={() => onEdit(teacher.id)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => onDelete(teacher.id)}
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

export default TeacherTable;
