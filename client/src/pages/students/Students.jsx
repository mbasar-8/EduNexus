import { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../../layouts/DashboardLayout";
import PageHeader from "../../components/ui/PageHeader";
import StudentTable from "../../components/students/StudentTable";

import { useNavigate } from "react-router-dom";

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

      console.log(response.data);

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
    return (
      student.name.toLowerCase().includes(search.toLowerCase()) ||
      student.email.toLowerCase().includes(search.toLowerCase()) ||
      student.department.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <DashboardLayout>
      <PageHeader
        title="Students"
        description="Manage all students in your organization."
        buttonText="+ Add Student"
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
    </DashboardLayout>
  );
}

export default Students;
