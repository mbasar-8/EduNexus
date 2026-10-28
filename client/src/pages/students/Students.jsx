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

      <StudentTable students={students} />
    </DashboardLayout>
  );
}

export default Students;
