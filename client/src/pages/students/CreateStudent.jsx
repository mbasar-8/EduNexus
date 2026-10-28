import axios from "axios";
import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { useNavigate, useParams } from "react-router-dom";

function CreateStudent() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    gender: "",
    status: "Active",
  });

  const [departments, setDepartments] = useState([]);

  const navigate = useNavigate();
  const { id } = useParams();

  const handleInputChange = (field, value) => {
    setFormData((previousData) => ({
      ...previousData,
      [field]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const url = id
        ? `${import.meta.env.VITE_API_BASE_URL}/students/${id}`
        : `${import.meta.env.VITE_API_BASE_URL}/students`;

      const method = id ? "put" : "post";

      const response = await axios({
        method,
        url,
        data: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      console.log(response.data);

      navigate("/students");
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

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

  useEffect(() => {
    fetchDepartments();

    if (id) {
      fetchStudent();
    }
  }, [id]);

  const fetchStudent = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/students/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      console.log(response.data);

      setFormData(response.data.student);
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };
  return (
    <DashboardLayout>
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold text-slate-800">
          {id ? "Edit Student" : "Add Student"}
        </h1>

        <p className="mt-2 text-gray-500">
          {id ? "Update student information." : "Create a new student."}
        </p>

        <div className="mt-8 rounded-xl bg-white p-8 shadow-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Full Name <span className="text-red-500">*</span>
              </label>

              <input
                id="name"
                type="text"
                placeholder="Enter student's full name"
                value={formData.name}
                onChange={(event) =>
                  handleInputChange("name", event.target.value)
                }
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-600"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Email <span className="text-red-500">*</span>
              </label>

              <input
                id="email"
                type="email"
                placeholder="Enter student's email"
                value={formData.email}
                onChange={(event) =>
                  handleInputChange("email", event.target.value)
                }
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-600"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Phone
              </label>

              <input
                id="phone"
                type="text"
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={(event) =>
                  handleInputChange("phone", event.target.value)
                }
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-600"
              />
            </div>

            <div>
              <label
                htmlFor="department"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Department
              </label>

              <select
                id="department"
                value={formData.department}
                onChange={(event) =>
                  handleInputChange("department", event.target.value)
                }
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-600"
              >
                <option value="">Select Department</option>

                {departments.map((department) => (
                  <option key={department.id} value={department.name}>
                    {department.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Gender
              </label>

              <div className="flex gap-6">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    checked={formData.gender === "Male"}
                    onChange={(event) =>
                      handleInputChange("gender", event.target.value)
                    }
                  />
                  Male
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    checked={formData.gender === "Female"}
                    onChange={(event) =>
                      handleInputChange("gender", event.target.value)
                    }
                  />
                  Female
                </label>
              </div>
            </div>

            <div>
              <label
                htmlFor="status"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Status
              </label>

              <select
                id="status"
                value={formData.status}
                onChange={(event) =>
                  handleInputChange("status", event.target.value)
                }
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-600"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <div className="flex justify-end gap-4 border-t border-gray-200 pt-6">
              <button
                type="button"
                onClick={() => navigate("/students")}
                className="rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700 transition hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                {id ? "Update Student" : "Save Student"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default CreateStudent;
