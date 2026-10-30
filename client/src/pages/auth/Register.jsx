import axios from "axios";
import { useState } from "react";
import { Eye, EyeOff, User, Mail, Lock } from "lucide-react";
import logo from "../../assets/images/edunexus-logo.png";
import { useNavigate } from "react-router-dom";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleInputChange = (field, value) => {
    const setters = {
      name: setName,
      email: setEmail,
      password: setPassword,
      confirmPassword: setConfirmPassword,
    };

    setters[field](value);

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

    if (!name.trim()) {
      newErrors.name = "Full name is required";
    }

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

    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = "Confirm password is required";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Password and confirm password do not match";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    try {
      setIsLoading(true);

      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/register`, {
        name,
        email,
        password,
        password_confirmation: confirmPassword,
      });

      setSuccessMessage(
        "Account created successfully. Please sign in with your new account.",
      );

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      if (error.response?.data?.errors) {
        const validationErrors = error.response.data.errors;

        setErrors({
          name: validationErrors.name?.[0] || "",
          email: validationErrors.email?.[0] || "",
          password: validationErrors.password?.[0] || "",
          confirmPassword: validationErrors.password_confirmation?.[0] || "",
        });
      } else if (error.response?.data?.message) {
        setErrors({
          email: error.response.data.message,
        });
      } else {
        console.error(error.response?.data || error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass = (field) =>
    `w-full rounded-xl border bg-gray-50 py-3 pl-11 pr-12 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:bg-white focus:ring-4 focus:ring-blue-100 ${
      errors[field]
        ? "border-red-400 focus:border-red-500"
        : "border-gray-200 focus:border-blue-500"
    }`;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-gray-50 to-indigo-100 px-4 py-10">
      <div className="w-full max-w-md">
        {/* Register Card */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-xl shadow-slate-200/60 sm:p-8">
          {/* Logo */}
          <div className="mb-5 flex justify-center">
            <img
              src={logo}
              alt="EduNexus Logo"
              className="h-20 w-20 object-contain sm:h-24 sm:w-24"
            />
          </div>

          {/* Heading */}
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-slate-800">
              EduNexus
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Create your EduNexus account
            </p>
          </div>

          {/* Success Message */}
          {successMessage && (
            <div className="mt-6 rounded-xl border border-green-200 bg-green-50 p-4 text-center">
              <p className="text-sm font-medium text-green-700">
                {successMessage}
              </p>
              <p className="mt-1 text-xs text-green-600">
                Redirecting to login page...
              </p>
            </div>
          )}

          {/* Register Form */}
          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Full Name
                <span className="ml-1 text-red-500">*</span>
              </label>

              <div className="relative">
                <User
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  disabled={isLoading || !!successMessage}
                  onChange={(event) =>
                    handleInputChange("name", event.target.value)
                  }
                  className={inputClass("name")}
                />
              </div>

              {errors.name && (
                <p className="mt-1.5 text-xs text-red-600">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Email Address
                <span className="ml-1 text-red-500">*</span>
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  disabled={isLoading || !!successMessage}
                  onChange={(event) =>
                    handleInputChange("email", event.target.value)
                  }
                  className={inputClass("email")}
                />
              </div>

              {errors.email && (
                <p className="mt-1.5 text-xs text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Password
                <span className="ml-1 text-red-500">*</span>
              </label>

              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  value={password}
                  disabled={isLoading || !!successMessage}
                  onChange={(event) =>
                    handleInputChange("password", event.target.value)
                  }
                  className={inputClass("password")}
                />

                <button
                  type="button"
                  disabled={isLoading || !!successMessage}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-blue-600"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>

              {errors.password && (
                <p className="mt-1.5 text-xs text-red-600">{errors.password}</p>
              )}

              <p className="mt-1.5 text-xs text-gray-400">
                Password must contain at least 8 characters.
              </p>
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Confirm Password
                <span className="ml-1 text-red-500">*</span>
              </label>

              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Re-enter your password"
                  value={confirmPassword}
                  disabled={isLoading || !!successMessage}
                  onChange={(event) =>
                    handleInputChange("confirmPassword", event.target.value)
                  }
                  className={inputClass("confirmPassword")}
                />

                <button
                  type="button"
                  disabled={isLoading || !!successMessage}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-blue-600"
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>
              </div>

              {errors.confirmPassword && (
                <p className="mt-1.5 text-xs text-red-600">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !!successMessage}
              className="w-full rounded-xl bg-blue-600 py-3.5 font-semibold text-white shadow-lg shadow-blue-200 transition duration-200 hover:bg-blue-700 hover:shadow-blue-300 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </button>

            {/* Login Link */}
            <p className="pt-2 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="font-semibold text-blue-600 transition hover:text-blue-800 hover:underline"
              >
                Sign In
              </button>
            </p>
          </form>

          {/* Footer */}
          <footer className="mt-8 border-t border-gray-100 pt-6 text-center">
            <p className="text-xs text-gray-500">
              © {currentYear} EduNexus. All rights reserved.
            </p>

            <p className="mt-2 text-xs text-gray-400">Version 1.0.0</p>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default Register;
