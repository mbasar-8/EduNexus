import axios from "axios";
import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { useNavigate, useParams } from "react-router-dom";
import { BookOpen, ArrowLeft, Save, Loader2 } from "lucide-react";

function CreateCourse() {
  const [formData, setFormData] = useState({
    department_id: "",
    name: "",
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
          const courseResponse = await axios.get(`${API_URL}/courses/${id}`, {
            headers: authHeaders,
          });

          setFormData({
            department_id: String(courseResponse.data.course.department_id),
            name: courseResponse.data.course.name,
            status: courseResponse.data.course.status,
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

    if (!formData.department_id) {
      newErrors.department_id = "Please select a department.";
    }

    if (!formData.name.trim()) {
      newErrors.name = "Course name is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const url = id ? `${API_URL}/courses/${id}` : `${API_URL}/courses`;

      await axios({
        method: id ? "put" : "post",
        url,
        data: formData,
        headers: authHeaders,
      });

      navigate("/courses");
    } catch (error) {
      const validationErrors = error.response?.data?.errors;

      if (validationErrors) {
        setErrors({
          department_id: validationErrors.department_id?.[0] || "",
          name: validationErrors.name?.[0] || "",
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
            onClick={() => navigate("/courses")}
            className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-blue-600"
          >
            <ArrowLeft size={18} />
            Back to Courses
          </button>

          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
              <BookOpen size={24} />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">
                {id ? "Edit Course" : "Add New Course"}
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                {id
                  ? "Update the course information below."
                  : "Create and manage a new course."}
              </p>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-5 py-5 sm:px-8">
            <h2 className="font-semibold text-slate-800">Course Information</h2>

            <p className="mt-1 text-sm text-slate-500">
              Fill in the details to {id ? "update" : "create"} a course.
            </p>
          </div>

          {isLoading ? (
            <div className="flex min-h-64 items-center justify-center">
              <Loader2 className="animate-spin text-blue-600" size={32} />
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="space-y-6 px-5 py-7 sm:px-8">
                {/* Department */}
                <div>
                  <label
                    htmlFor="department_id"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Department <span className="text-red-500">*</span>
                  </label>

                  <select
                    id="department_id"
                    value={formData.department_id}
                    onChange={(event) =>
                      handleInputChange("department_id", event.target.value)
                    }
                    className={inputClass("department_id")}
                  >
                    <option value="">Select Department</option>

                    {departments.map((department) => (
                      <option key={department.id} value={department.id}>
                        {department.name}
                      </option>
                    ))}
                  </select>

                  {errors.department_id && (
                    <p className="mt-2 text-xs text-red-500">
                      {errors.department_id}
                    </p>
                  )}
                </div>

                {/* Course Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Course Name <span className="text-red-500">*</span>
                  </label>

                  <input
                    id="name"
                    type="text"
                    placeholder="Enter course name"
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
                    Choose whether this course is currently active.
                  </p>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex flex-col-reverse gap-3 border-t border-slate-100 bg-slate-50 px-5 py-5 sm:flex-row sm:justify-end sm:px-8">
                <button
                  type="button"
                  onClick={() => navigate("/courses")}
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
                      {id ? "Update Course" : "Save Course"}
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

export default CreateCourse;
