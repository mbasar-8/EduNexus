import axios from "axios";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import logo from "../../assets/images/edunexus-logo.png";
import { useNavigate } from "react-router-dom";

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const [password, setPassword] = useState("");

  const [email, setEmail] = useState("");

  const currentYear = new Date().getFullYear();

  const [errors, setErrors] = useState({});

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (field, value) => {
    if (field === "email") {
      setEmail(value);
    }

    if (field === "password") {
      setPassword(value);
    }

    if (errors[field]) {
      setErrors((previousErrors) => ({
        ...previousErrors,
        [field]: "",
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailPattern.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/login`,
        {
          email,
          password,
        },
      );

      localStorage.setItem("token", response.data.token);

      localStorage.setItem("user", JSON.stringify(response.data.user));

      navigate("/dashboard");
    } catch (error) {
      if (error.response?.data?.errors) {
        const validationErrors = error.response.data.errors;

        setErrors({
          email: validationErrors.email?.[0] || "",
          password: validationErrors.password?.[0] || "",
        });
      } else if (error.response?.data?.message) {
        setErrors({
          email: "",
          password: error.response.data.message,
        });
      } else {
        console.log(error.response?.data || error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        {/* Logo */}
        <div className="mb-6 flex justify-center">
          <img
            src={logo}
            alt="EduNexus Logo"
            className="h-24 w-24 object-contain"
          />
        </div>

        {/* Heading */}
        <h1 className="text-center text-3xl font-bold text-gray-500">
          EduNexus
        </h1>

        <p className="mt-2 text-center text-gray-500">
          Smart School Management System
        </p>

        {/* Login form */}
        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              disabled={isLoading}
              onChange={(event) =>
                handleInputChange("email", event.target.value)
              }
              className={`w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-600 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />

            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Password
            </label>

            <div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  disabled={isLoading}
                  onChange={(event) =>
                    handleInputChange("password", event.target.value)
                  }
                  className={`w-full rounded-lg border px-4 py-3 pr-12 outline-none focus:border-blue-600 ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                />

                <button
                  type="button"
                  disabled={isLoading}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm text-gray-600">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-blue-600"
              />
              Remember Me
            </label>

            <a
              href="#"
              className="text-sm font-medium text-blue-600 hover:underline"
            >
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <footer>
          <div className="mt-8 border-t border-gray-200 pt-6 text-center">
            <p className="text-sm text-gray-500">
              © {currentYear} EduNexus. All rights reserved.
            </p>

            <p className="mt-2 text-xs text-gray-400">Version 1.0.0</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Login;
