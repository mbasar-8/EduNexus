import axios from "axios";
import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { useNavigate, useParams } from "react-router-dom";
import { UserRound, ArrowLeft, Save, Loader2 } from "lucide-react";

function CreateTeacher() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    gender: "",
    status: "Active",
  });

  const [departments, setDepartments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const { id } = useParams();

  const API_URL = import.meta.env.VITE_API_BASE_URL;

  const authHeaders = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const initializeForm = async () => {
      setIsLoading(true);

      try {
        const departmentResponse = await axios.get(`${API_URL}/departments`, {
          headers: authHeaders,
        });

        setDepartments(departmentResponse.data.departments);

        if (id) {
          const teacherResponse = await axios.get(`${API_URL}/teachers/${id}`, {
            headers: authHeaders,
          });

          const teacher = teacherResponse.data.teacher;

          setFormData({
            name: teacher.name || "",
            email: teacher.email || "",
            phone: teacher.phone || "",
            department: teacher.department || "",
            gender: teacher.gender || "",
            status: teacher.status || "Active",
          });
        }
      } catch (error) {
        console.error(error.response?.data || error.message);
      } finally {
        setIsLoading(false);
      }
    };

    initializeForm();
  }, [id]);

  const handleInputChange = (field, value) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [field]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const url = id ? `${API_URL}/teachers/${id}` : `${API_URL}/teachers`;

      await axios({
        method: id ? "put" : "post",
        url,
        data: formData,
        headers: authHeaders,
      });

      navigate("/teachers");
    } catch (error) {
      const validationErrors = error.response?.data?.errors;

      if (validationErrors) {
        setErrors({
          name: validationErrors.name?.[0] || "",
          email: validationErrors.email?.[0] || "",
        });
      } else {
        console.error(error.response?.data || error.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = (field) =>
    `w-full rounded-lg border px-4 py-3 text-sm text-slate-700 outline-none transition
    focus:border-blue-500 focus:ring-4 focus:ring-blue-100
    ${
      errors[field]
        ? "border-red-400 bg-red-50"
        : "border-slate-200 bg-white hover:border-slate-300"
    }`;

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-3xl">
        {/* Page Header */}
        <div className="mb-8">
          <button
            type="button"
            onClick={() => navigate("/teachers")}
            className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-blue-600"
          >
            <ArrowLeft size={18} />
            Back to Teachers
          </button>

          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
              <UserRound size={24} />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">
                {id ? "Edit Teacher" : "Add New Teacher"}
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                {id
                  ? "Update teacher information."
                  : "Create a new teacher profile."}
              </p>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-5 py-5 sm:px-8">
            <h2 className="font-semibold text-slate-800">
              Teacher Information
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Enter the teacher's personal and professional details.
            </p>
          </div>

          {isLoading ? (
            <div className="flex min-h-64 items-center justify-center">
              <Loader2 size={32} className="animate-spin text-blue-600" />
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="space-y-6 px-5 py-7 sm:px-8">
                {/* Full Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Full Name <span className="text-red-500">*</span>
                  </label>

                  <input
                    id="name"
                    type="text"
                    placeholder="Enter teacher's full name"
                    value={formData.name}
                    onChange={(event) =>
                      handleInputChange("name", event.target.value)
                    }
                    className={inputClass("name")}
                  />

                  {errors.name && (
                    <p className="mt-2 text-xs text-red-500">{errors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Email Address <span className="text-red-500">*</span>
                  </label>

                  <input
                    id="email"
                    type="email"
                    placeholder="Enter teacher's email"
                    value={formData.email}
                    onChange={(event) =>
                      handleInputChange("email", event.target.value)
                    }
                    className={inputClass("email")}
                  />

                  {errors.email && (
                    <p className="mt-2 text-xs text-red-500">{errors.email}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Phone Number
                  </label>

                  <input
                    id="phone"
                    type="tel"
                    placeholder="Enter phone number"
                    value={formData.phone}
                    onChange={(event) =>
                      handleInputChange("phone", event.target.value)
                    }
                    className={inputClass("phone")}
                  />
                </div>

                {/* Department */}
                <div>
                  <label
                    htmlFor="department"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Department
                  </label>

                  <select
                    id="department"
                    value={formData.department}
                    onChange={(event) =>
                      handleInputChange("department", event.target.value)
                    }
                    className={inputClass("department")}
                  >
                    <option value="">Select Department</option>

                    {departments.map((department) => (
                      <option key={department.id} value={department.name}>
                        {department.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Gender */}
                <div>
                  <label className="mb-3 block text-sm font-semibold text-slate-700">
                    Gender
                  </label>

                  <div className="flex flex-wrap gap-6">
                    {["Male", "Female"].map((gender) => (
                      <label
                        key={gender}
                        className="flex cursor-pointer items-center gap-2 text-sm text-slate-600"
                      >
                        <input
                          type="radio"
                          name="gender"
                          value={gender}
                          checked={formData.gender === gender}
                          onChange={(event) =>
                            handleInputChange("gender", event.target.value)
                          }
                          className="h-4 w-4 accent-blue-600"
                        />

                        {gender}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Status */}
                <div>
                  <label
                    htmlFor="status"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Status
                  </label>

                  <select
                    id="status"
                    value={formData.status}
                    onChange={(event) =>
                      handleInputChange("status", event.target.value)
                    }
                    className={inputClass("status")}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>

                  <p className="mt-2 text-xs text-slate-400">
                    Choose the current employment status.
                  </p>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex flex-col-reverse gap-3 border-t border-slate-100 bg-slate-50 px-5 py-5 sm:flex-row sm:justify-end sm:px-8">
                <button
                  type="button"
                  onClick={() => navigate("/teachers")}
                  disabled={isSubmitting}
                  className="rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save size={18} />
                      {id ? "Update Teacher" : "Save Teacher"}
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

        <p className="mt-5 text-center text-xs text-slate-400">
          Fields marked with <span className="text-red-500">*</span> are
          required.
        </p>
      </div>
    </DashboardLayout>
  );
}

export default CreateTeacher;
