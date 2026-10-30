import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout";
import PageHeader from "../../components/ui/PageHeader";
import DepartmentTable from "../../components/departments/DepartmentTable";

function Departments() {
  const [departments, setDepartments] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const fetchDepartments = useCallback(async () => {
    try {
      setIsLoading(true);
      setError("");

      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/departments`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      setDepartments(response.data.departments || []);
    } catch (error) {
      console.error(error.response?.data || error.message);

      setError(
        error.response?.data?.message ||
          "Unable to load departments. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDepartments();
  }, [fetchDepartments]);

  const handleEdit = (id) => {
    navigate(`/departments/${id}/edit`);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this department?",
    );

    if (!confirmed) return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/departments/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      await fetchDepartments();
    } catch (error) {
      console.error(error.response?.data || error.message);

      setError(
        error.response?.data?.message ||
          "Unable to delete department. Please try again.",
      );
    }
  };

  const filteredDepartments = departments.filter((department) => {
    const searchTerm = search.trim().toLowerCase();

    return (
      department.name?.toLowerCase().includes(searchTerm) ||
      department.status?.toLowerCase().includes(searchTerm)
    );
  });

  return (
    <DashboardLayout>
      <div className="mx-auto w-full max-w-7xl">
        <PageHeader
          title="Departments"
          description="Manage and organize all departments in your organization."
          buttonText="+ Add Department"
          searchPlaceholder="Search departments..."
          searchValue={search}
          onSearchChange={setSearch}
          onButtonClick={() => navigate("/departments/create")}
        />

        {/* Error Message */}
        {error && (
          <div className="mb-6 flex flex-col gap-3 rounded-xl border border-red-200 bg-red-50 p-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-red-600">{error}</p>

            <button
              onClick={fetchDepartments}
              className="w-fit text-sm font-semibold text-red-700 transition hover:text-red-900"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Loading State */}
        {isLoading ? (
          <div className="flex min-h-60 items-center justify-center rounded-xl border border-gray-200 bg-white">
            <div className="flex flex-col items-center gap-3">
              <div className="h-9 w-9 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600" />

              <p className="text-sm text-gray-500">Loading departments...</p>
            </div>
          </div>
        ) : (
          <>
            {/* Department Table */}
            <DepartmentTable
              departments={filteredDepartments}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />

            {/* Department Count */}
            <div className="mt-4 flex flex-col gap-1 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between">
              <p>
                Showing {filteredDepartments.length} of {departments.length}{" "}
                departments
              </p>

              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="w-fit font-medium text-blue-600 transition hover:text-blue-800"
                >
                  Clear search
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}

export default Departments;
