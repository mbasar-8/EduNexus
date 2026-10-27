function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <h1>User not found.</h1>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-4xl font-bold text-blue-600">
        Welcome, {user.name} 👋
      </h1>
    </div>
  );
}

export default Dashboard;
