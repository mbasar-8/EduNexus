import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Building2, ArrowLeft } from "lucide-react";

import DashboardLayout from "../../layouts/DashboardLayout";

function CreateDepartment() {
  const [formData, setFormData] = useState({
    name: "",
    status: "Active",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  const API_URL = import.meta.env.VITE_API_BASE_URL;

  const handleInputChange = (field, value) => {
    setFormData((previousData) => ({
      ...previousData,
      [field]: value,
    }));

    setErrors((previousErrors) => ({
      ...previousErrors,
      [field]: "",
    }));

    setSubmitError("");
  };

  const fetchDepartment = async () => {
    try {
      setIsFetching(true);

      const response = await axios.get(`${API_URL}/departments/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setFormData({
        name: response.data.department.name || "",
        status: response.data.department.status || "Active",
      });
    } catch (error) {
      console.error(error.response?.data || error.message);

      setSubmitError(
        error.response?.data?.message ||
          "Unable to load department information.",
      );
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchDepartment();
    }
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Department name is required.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {
      setIsLoading(true);
      setSubmitError("");

      const url = id
        ? `${API_URL}/departments/${id}`
        : `${API_URL}/departments`;

      const method = id ? "put" : "post";

      await axios({
        method,
        url,
        data: {
          name: formData.name.trim(),
          status: formData.status,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      navigate("/departments");
    } catch (error) {
      console.error(error.response?.data || error.message);

      if (error.response?.data?.errors) {
        const validationErrors = error.response.data.errors;

        setErrors({
          name: validationErrors.name?.[0] || "",
        });
      } else {
        setSubmitError(
          error.response?.data?.message ||
            "Something went wrong. Please try again.",
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="mx-auto w-full max-w-3xl">
        {/* Back Button */}
        <button
          type="button"
          onClick={() => navigate("/departments")}
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-blue-600"
        >
          <ArrowLeft size={18} />
          Back to Departments
        </button>

        {/* Page Heading */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
              <Building2 size={24} />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">
                {id ? "Edit Department" : "Add Department"}
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                {id
                  ? "Update your department information."
                  : "Create a new department for your organization."}
              </p>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-100 px-5 py-5 sm:px-8">
            <h2 className="font-semibold text-slate-800">
              Department Information
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Fill in the details below.
            </p>
          </div>

          {isFetching ? (
            <div className="flex min-h-60 items-center justify-center">
              <div className="flex flex-col items-center gap-3">
                <div className="h-9 w-9 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600" />

                <p className="text-sm text-gray-500">Loading department...</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="space-y-6 p-5 sm:p-8">
                {/* API Error */}
                {submitError && (
                  <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                    <p className="text-sm text-red-600">{submitError}</p>
                  </div>
                )}

                {/* Department Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Department Name
                    <span className="ml-1 text-red-500">*</span>
                  </label>

                  <input
                    id="name"
                    type="text"
                    placeholder="Enter department name"
                    value={formData.name}
                    disabled={isLoading}
                    onChange={(event) =>
                      handleInputChange("name", event.target.value)
                    }
                    className={`w-full rounded-xl border px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-50 ${
                      errors.name ? "border-red-500" : "border-gray-300"
                    }`}
                  />

                  {errors.name && (
                    <p className="mt-2 text-sm text-red-600">{errors.name}</p>
                  )}
                </div>

                {/* Status */}
                <div>
                  <label
                    htmlFor="status"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Department Status
                  </label>

                  <select
                    id="status"
                    value={formData.status}
                    disabled={isLoading}
                    onChange={(event) =>
                      handleInputChange("status", event.target.value)
                    }
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-50"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>

                  <p className="mt-2 text-xs text-gray-400">
                    Choose whether this department is currently active.
                  </p>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex flex-col-reverse gap-3 border-t border-gray-100 bg-gray-50 px-5 py-5 sm:flex-row sm:justify-end sm:px-8">
                <button
                  type="button"
                  disabled={isLoading}
                  onClick={() => navigate("/departments")}
                  className="rounded-xl border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isLoading || isFetching}
                  className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isLoading
                    ? "Saving..."
                    : id
                      ? "Update Department"
                      : "Save Department"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default CreateDepartment;
