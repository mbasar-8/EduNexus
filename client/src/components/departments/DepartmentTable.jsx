function DepartmentTable({ departments, onDelete, onEdit }) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-4 text-left">ID</th>
            <th className="px-6 py-4 text-left">Department Name</th>
            <th className="px-6 py-4 text-left">Status</th>
            <th className="px-6 py-4 text-left">Action</th>
          </tr>
        </thead>

        <tbody>
          {departments.length === 0 ? (
            <tr>
              <td colSpan={4} className="px-6 py-10 text-center text-gray-500">
                No departments found.
              </td>
            </tr>
          ) : (
            departments.map((department) => (
              <tr key={department.id} className="border-t">
                <td className="px-6 py-4">{department.id}</td>

                <td className="px-6 py-4">{department.name}</td>

                <td className="px-6 py-4">{department.status}</td>

                <td className="flex gap-3 px-6 py-4">
                  <button
                    onClick={() => onEdit(department.id)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => onDelete(department.id)}
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

export default DepartmentTable;
