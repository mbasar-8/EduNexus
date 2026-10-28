import { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../../layouts/DashboardLayout";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [statistics, setStatistics] = useState({
    total_students: 0,
    active_students: 0,
    inactive_students: 0,
  });

  const fetchStatistics = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/dashboard/statistics`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      console.log(response.data);

      setStatistics(response.data);
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchStatistics();
  }, []);

  if (!user) {
    return <h1>User not found.</h1>;
  }

  return (
    <DashboardLayout>
      <h1 className="text-4xl font-bold text-blue-600">
        Welcome, {user.name} 👋
      </h1>
      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="text-gray-500">Total Students</h2>

          <p className="mt-2 text-4xl font-bold text-slate-800">
            {statistics.total_students}
          </p>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="text-gray-500">Active Students</h2>

          <p className="mt-2 text-4xl font-bold text-green-600">
            {statistics.active_students}
          </p>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="text-gray-500">Inactive Students</h2>

          <p className="mt-2 text-4xl font-bold text-red-600">
            {statistics.inactive_students}
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
