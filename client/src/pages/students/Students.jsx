import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import PageHeader from "../../components/ui/PageHeader";
import StudentTable from "../../components/students/StudentTable";

function Students() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/students`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      setStudents(response.data.students);
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  const editStudent = (id) => {
    navigate(`/students/${id}/edit`);
  };

  const deleteStudent = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this student?",
    );

    if (!confirmed) return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/students/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      fetchStudents();
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  const filteredStudents = students.filter((student) => {
    const searchTerm = search.toLowerCase();

    return (
      student.name?.toLowerCase().includes(searchTerm) ||
      student.email?.toLowerCase().includes(searchTerm) ||
      student.department?.toLowerCase().includes(searchTerm)
    );
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <PageHeader
          title="Students"
          description="Manage and monitor all students in your organization."
          buttonText="Add Student"
          searchPlaceholder="Search students..."
          searchValue={search}
          onSearchChange={setSearch}
          onButtonClick={() => navigate("/students/create")}
        />

        <StudentTable
          students={filteredStudents}
          onDelete={deleteStudent}
          onEdit={editStudent}
        />
      </div>
    </DashboardLayout>
  );
}

export default Students;
