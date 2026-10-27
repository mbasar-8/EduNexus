function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6 shadow-sm">
      <h1 className="text-xl font-bold text-blue-600">EduNexus</h1>

      <div className="text-sm font-medium text-gray-700">👋 {user?.name}</div>
    </header>
  );
}

export default Navbar;
