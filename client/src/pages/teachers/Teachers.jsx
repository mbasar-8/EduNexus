import { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../../layouts/DashboardLayout";
import PageHeader from "../../components/ui/PageHeader";
import TeacherTable from "../../components/teachers/TeacherTable";

import { useNavigate } from "react-router-dom";

function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/teachers`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      console.log(response.data);

      setTeachers(response.data.teachers);
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  const editTeacher = (id) => {
    navigate(`/teachers/${id}/edit`);
  };

  const deleteTeacher = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this teacher?",
    );

    if (!confirmed) return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/teachers/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      fetchTeachers();
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  const filteredTeachers = teachers.filter((teacher) => {
    return (
      teacher.name.toLowerCase().includes(search.toLowerCase()) ||
      teacher.email.toLowerCase().includes(search.toLowerCase()) ||
      teacher.department.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <DashboardLayout>
      <PageHeader
        title="Teachers"
        description="Manage all teachers in your organization."
        buttonText="+ Add Teacher"
        searchPlaceholder="Search teachers..."
        searchValue={search}
        onSearchChange={setSearch}
        onButtonClick={() => navigate("/teachers/create")}
      />

      <TeacherTable
        teachers={filteredTeachers}
        onDelete={deleteTeacher}
        onEdit={editTeacher}
      />
    </DashboardLayout>
  );
}

export default Teachers;
