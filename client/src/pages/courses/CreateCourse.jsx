import axios from "axios";
import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { useNavigate, useParams } from "react-router-dom";

function CreateCourse() {
  const [formData, setFormData] = useState({
    department_id: "",
    name: "",
    status: "Active",
  });

  const [departments, setDepartments] = useState([]);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchDepartments();

    if (id) {
      fetchCourse();
    }
  }, [id]);

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

      setDepartments(response.data.departments);
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  const fetchCourse = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/courses/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      setFormData({
        department_id: response.data.course.department_id,
        name: response.data.course.name,
        status: response.data.course.status,
      });
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const url = id
        ? `${import.meta.env.VITE_API_BASE_URL}/courses/${id}`
        : `${import.meta.env.VITE_API_BASE_URL}/courses`;

      const method = id ? "put" : "post";

      await axios({
        method,
        url,
        data: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      navigate("/courses");
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold text-slate-800">
          {id ? "Edit Course" : "Add Course"}
        </h1>

        <p className="mt-2 text-gray-500">
          {id ? "Update course information." : "Create a new course."}
        </p>

        <div className="mt-8 rounded-xl bg-white p-8 shadow-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="mb-2 block text-sm font-medium">
                Department
              </label>

              <select
                value={formData.department_id}
                onChange={(e) =>
                  handleInputChange("department_id", e.target.value)
                }
                className="w-full rounded-lg border px-4 py-3"
              >
                <option value="">Select Department</option>

                {departments.map((department) => (
                  <option key={department.id} value={department.id}>
                    {department.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Course Name
              </label>

              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="w-full rounded-lg border px-4 py-3"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Status</label>

              <select
                value={formData.status}
                onChange={(e) => handleInputChange("status", e.target.value)}
                className="w-full rounded-lg border px-4 py-3"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <div className="flex justify-end gap-4 pt-6">
              <button
                type="button"
                onClick={() => navigate("/courses")}
                className="rounded-lg border px-6 py-3"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="rounded-lg bg-blue-600 px-6 py-3 text-white"
              >
                {id ? "Update Course" : "Save Course"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default CreateCourse;
