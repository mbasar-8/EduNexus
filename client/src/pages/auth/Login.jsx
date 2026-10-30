import axios from "axios";
import { useState } from "react";
import {
  Eye,
  EyeOff,
  Mail,
  LockKeyhole,
  GraduationCap,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import logo from "../../assets/images/edunexus-logo.png";
import { useNavigate } from "react-router-dom";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleInputChange = (field, value) => {
    if (field === "email") setEmail(value);
    if (field === "password") setPassword(value);

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

    if (Object.keys(newErrors).length > 0) return;

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
        setErrors({
          password: "Unable to sign in. Please try again.",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 lg:grid lg:grid-cols-2">
      {/* Left Branding Section */}
      <div className="relative hidden overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 p-12 text-white lg:flex lg:flex-col lg:justify-between xl:p-16">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-white/10" />
        <div className="absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-indigo-400/20" />

        <div className="relative z-10 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-lg">
            <img
              src={logo}
              alt="EduNexus"
              className="h-10 w-10 object-contain"
            />
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-tight">EduNexus</h1>
            <p className="text-xs text-blue-100">Smart School Management</p>
          </div>
        </div>

        <div className="relative z-10 max-w-xl">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
            <GraduationCap size={36} />
          </div>

          <h2 className="text-4xl font-bold leading-tight xl:text-5xl">
            Empowering Education,
            <br />
            Simplifying Management.
          </h2>

          <p className="mt-6 max-w-lg text-lg leading-relaxed text-blue-100">
            Manage students, teachers, departments and courses from one simple
            and powerful platform.
          </p>

          <div className="mt-10 flex items-center gap-3 text-sm text-blue-100">
            <ShieldCheck size={20} />
            Secure and reliable school management
          </div>
        </div>

        <div className="relative z-10 text-sm text-blue-100">
          © {currentYear} EduNexus. All rights reserved.
        </div>
      </div>

      {/* Right Login Section */}
      <div className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8 lg:px-12">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="mb-8 flex flex-col items-center lg:hidden">
            <div className="mb-3 flex h-20 w-20 items-center justify-center rounded-2xl bg-white shadow-md">
              <img
                src={logo}
                alt="EduNexus Logo"
                className="h-16 w-16 object-contain"
              />
            </div>

            <h1 className="text-2xl font-bold text-blue-700">EduNexus</h1>

            <p className="mt-1 text-sm text-slate-500">
              Smart School Management System
            </p>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-xl shadow-slate-200/60 sm:p-9">
            <div className="mb-8">
              <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-600">
                Welcome Back
              </p>

              <h2 className="text-3xl font-bold tracking-tight text-slate-800">
                Sign in to your account
              </h2>

              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                Enter your credentials to access your dashboard.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Email Address
                </label>

                <div
                  className={`flex items-center rounded-xl border bg-slate-50 transition focus-within:bg-white focus-within:ring-4 ${
                    errors.email
                      ? "border-red-400 focus-within:ring-red-100"
                      : "border-slate-200 focus-within:border-blue-500 focus-within:ring-blue-100"
                  }`}
                >
                  <Mail className="ml-4 shrink-0 text-slate-400" size={19} />

                  <input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    disabled={isLoading}
                    autoComplete="email"
                    onChange={(event) =>
                      handleInputChange("email", event.target.value)
                    }
                    className="w-full bg-transparent px-4 py-3.5 text-sm text-slate-800 outline-none placeholder:text-slate-400"
                  />
                </div>

                {errors.email && (
                  <p className="mt-2 text-xs font-medium text-red-600">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-sm font-semibold text-slate-700"
                  >
                    Password
                  </label>
                </div>

                <div
                  className={`flex items-center rounded-xl border bg-slate-50 transition focus-within:bg-white focus-within:ring-4 ${
                    errors.password
                      ? "border-red-400 focus-within:ring-red-100"
                      : "border-slate-200 focus-within:border-blue-500 focus-within:ring-blue-100"
                  }`}
                >
                  <LockKeyhole
                    className="ml-4 shrink-0 text-slate-400"
                    size={19}
                  />

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    disabled={isLoading}
                    autoComplete="current-password"
                    onChange={(event) =>
                      handleInputChange("password", event.target.value)
                    }
                    className="w-full min-w-0 bg-transparent px-4 py-3.5 text-sm text-slate-800 outline-none placeholder:text-slate-400"
                  />

                  <button
                    type="button"
                    disabled={isLoading}
                    onClick={() => setShowPassword(!showPassword)}
                    className="mr-4 shrink-0 text-slate-400 transition hover:text-blue-600"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                  </button>
                </div>

                {errors.password && (
                  <p className="mt-2 text-xs font-medium text-red-600">
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between gap-3">
                <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-600">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-slate-300 accent-blue-600"
                  />
                  Remember me
                </label>

                <button
                  type="button"
                  onClick={() => {}}
                  className="text-sm font-semibold text-blue-600 transition hover:text-blue-800 hover:underline"
                >
                  Forgot Password?
                </button>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 hover:shadow-blue-600/30 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? (
                  <>
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Signing In...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight size={19} />
                  </>
                )}
              </button>

              {/* Register */}
              <p className="pt-2 text-center text-sm text-slate-500">
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/register")}
                  className="font-semibold text-blue-600 transition hover:text-blue-800 hover:underline"
                >
                  Create Account
                </button>
              </p>
            </form>
          </div>

          <footer className="mt-7 text-center">
            <p className="text-xs text-slate-400">
              © {currentYear} EduNexus. All rights reserved.
            </p>
            <p className="mt-1 text-xs text-slate-400">Version 1.0.0</p>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default Login;
