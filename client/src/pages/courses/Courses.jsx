import { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../../layouts/DashboardLayout";
import PageHeader from "../../components/ui/PageHeader";
import CourseTable from "../../components/courses/CourseTable";
import { useNavigate } from "react-router-dom";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/courses`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      setCourses(response.data.courses);
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  const editCourse = (id) => {
    navigate(`/courses/${id}/edit`);
  };

  const deleteCourse = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this course?",
    );

    if (!confirmed) return;

    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/courses/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      fetchCourses();
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  const filteredCourses = courses.filter((course) => {
    return (
      course.name.toLowerCase().includes(search.toLowerCase()) ||
      course.department.name.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <DashboardLayout>
      <PageHeader
        title="Courses"
        description="Manage all courses in your organization."
        buttonText="+ Add Course"
        searchPlaceholder="Search courses..."
        searchValue={search}
        onSearchChange={setSearch}
        onButtonClick={() => navigate("/courses/create")}
      />

      <CourseTable
        courses={filteredCourses}
        onDelete={deleteCourse}
        onEdit={editCourse}
      />
    </DashboardLayout>
  );
}

export default Courses;
