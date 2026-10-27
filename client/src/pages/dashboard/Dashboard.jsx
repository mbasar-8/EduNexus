import DashboardLayout from "../../layouts/DashboardLayout";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <h1>User not found.</h1>;
  }

  return (
    <DashboardLayout>
      <h1 className="text-4xl font-bold text-blue-600">
        Welcome, {user.name} 👋
      </h1>
    </DashboardLayout>
  );
}

export default Dashboard;
