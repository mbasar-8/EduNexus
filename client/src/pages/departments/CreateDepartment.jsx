import axios from "axios";
import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { useNavigate, useParams } from "react-router-dom";

function CreateDepartment() {
  const [formData, setFormData] = useState({
    name: "",
    status: "Active",
  });

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
        ? `${import.meta.env.VITE_API_BASE_URL}/departments/${id}`
        : `${import.meta.env.VITE_API_BASE_URL}/departments`;

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

      navigate("/departments");
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  useEffect(() => {
    if (!id) return;

    fetchDepartment();
  }, [id]);

  const fetchDepartment = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/departments/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      console.log(response.data);

      setFormData(response.data.department);
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold text-slate-800">
          {id ? "Edit Department" : "Add Department"}
        </h1>

        <p className="mt-2 text-gray-500">
          {id ? "Update department information." : "Create a new department."}
        </p>

        <div className="mt-8 rounded-xl bg-white p-8 shadow-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Department Name <span className="text-red-500">*</span>
              </label>

              <input
                id="name"
                type="text"
                placeholder="Enter department name"
                value={formData.name}
                onChange={(event) =>
                  handleInputChange("name", event.target.value)
                }
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-600"
              />
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
                onClick={() => navigate("/departments")}
                className="rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700 transition hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                {id ? "Update Department" : "Save Department"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default CreateDepartment;
