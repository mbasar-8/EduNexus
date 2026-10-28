import axios from "axios";
import { useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { useNavigate } from "react-router-dom";

function CreateStudent() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    gender: "",
    status: "Active",
  });

  const navigate = useNavigate();

  const handleInputChange = (field, value) => {
    setFormData((previousData) => ({
      ...previousData,
      [field]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/students`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      console.log(response.data);

      navigate("/students");
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };
  return (
    <DashboardLayout>
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold text-slate-800">Add Student</h1>

        <p className="mt-2 text-gray-500">Create a new student.</p>

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
                <option value="Science">Science</option>
                <option value="Commerce">Commerce</option>
                <option value="Arts">Arts</option>
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
                className="rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700 transition hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                Save Student
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default CreateStudent;
