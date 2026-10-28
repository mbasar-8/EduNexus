import { Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ProtectedRoute from "./routes/ProtectedRoute";
import Dashboard from "./pages/dashboard/Dashboard";
import Students from "./pages/students/Students";
import Teachers from "./pages/teachers/Teachers";
import Departments from "./pages/departments/Departments";
import CreateStudent from "./pages/students/CreateStudent";
import CreateTeacher from "./pages/teachers/CreateTeacher";
import CreateDepartment from "./pages/departments/CreateDepartment";
import Courses from "./pages/courses/Courses";
import CreateCourse from "./pages/courses/CreateCourse";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/students"
        element={
          <ProtectedRoute>
            <Students />
          </ProtectedRoute>
        }
      />

      <Route
        path="/teachers"
        element={
          <ProtectedRoute>
            <Teachers />
          </ProtectedRoute>
        }
      />

      <Route
        path="/departments"
        element={
          <ProtectedRoute>
            <Departments />
          </ProtectedRoute>
        }
      />

      <Route
        path="/students/create"
        element={
          <ProtectedRoute>
            <CreateStudent />
          </ProtectedRoute>
        }
      />

      <Route
        path="/students/:id/edit"
        element={
          <ProtectedRoute>
            <CreateStudent />
          </ProtectedRoute>
        }
      />

      <Route
        path="/teachers/create"
        element={
          <ProtectedRoute>
            <CreateTeacher />
          </ProtectedRoute>
        }
      />

      <Route
        path="/teachers/:id/edit"
        element={
          <ProtectedRoute>
            <CreateTeacher />
          </ProtectedRoute>
        }
      />

      <Route
        path="/departments/create"
        element={
          <ProtectedRoute>
            <CreateDepartment />
          </ProtectedRoute>
        }
      />

      <Route
        path="/departments/:id/edit"
        element={
          <ProtectedRoute>
            <CreateDepartment />
          </ProtectedRoute>
        }
      />

      <Route
        path="/courses"
        element={
          <ProtectedRoute>
            <Courses />
          </ProtectedRoute>
        }
      />

      <Route
        path="/courses/create"
        element={
          <ProtectedRoute>
            <CreateCourse />
          </ProtectedRoute>
        }
      />

      <Route
        path="/courses/:id/edit"
        element={
          <ProtectedRoute>
            <CreateCourse />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
