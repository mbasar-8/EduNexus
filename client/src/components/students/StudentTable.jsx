function StudentTable() {
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
          <tr>
            <td colSpan={6} className="px-6 py-10 text-center text-gray-500">
              No students found.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default StudentTable;
