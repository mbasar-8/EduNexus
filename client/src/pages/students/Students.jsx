import { useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";
import PageHeader from "../../components/ui/PageHeader";
import StudentTable from "../../components/students/StudentTable";

import { useNavigate } from "react-router-dom";

function Students() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  return (
    <DashboardLayout>
      <PageHeader
        title="Students"
        description="Manage all students in your organization."
        buttonText="+ Add Student"
        searchPlaceholder="Search students..."
        searchValue={search}
        onSearchChange={setSearch}
        onButtonClick={() => navigate("/students/create")}
      />

      <StudentTable />
    </DashboardLayout>
  );
}

export default Students;
