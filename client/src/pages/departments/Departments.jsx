import { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../../layouts/DashboardLayout";
import PageHeader from "../../components/ui/PageHeader";
import DepartmentTable from "../../components/departments/DepartmentTable";
import { useNavigate } from "react-router-dom";

function Departments() {
  const [departments, setDepartments] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/departments`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      console.log(response.data);

      setDepartments(response.data.departments);
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  const editDepartment = (id) => {
    navigate(`/departments/${id}/edit`);
  };

  const deleteDepartment = async (id) => {
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

      fetchDepartments();
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  const filteredDepartments = departments.filter((department) => {
    return (
      department.name.toLowerCase().includes(search.toLowerCase()) ||
      department.status.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <DashboardLayout>
      <PageHeader
        title="Departments"
        description="Manage all departments in your organization."
        buttonText="+ Add Department"
        searchPlaceholder="Search departments..."
        searchValue={search}
        onSearchChange={setSearch}
        onButtonClick={() => navigate("/departments/create")}
      />

      <DepartmentTable
        departments={filteredDepartments}
        onDelete={deleteDepartment}
        onEdit={editDepartment}
      />
    </DashboardLayout>
  );
}

export default Departments;
