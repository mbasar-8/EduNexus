import { useEffect, useState } from "react";
import axios from "axios";
import {
  Users,
  UserCheck,
  UserX,
  ArrowUpRight,
  GraduationCap,
} from "lucide-react";
import DashboardLayout from "../../layouts/DashboardLayout";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [statistics, setStatistics] = useState({
    total_students: 0,
    active_students: 0,
    inactive_students: 0,
  });

  const [isLoading, setIsLoading] = useState(true);

  const fetchStatistics = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/dashboard/statistics`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      setStatistics(response.data);
    } catch (error) {
      console.error(error.response?.data || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStatistics();
  }, []);

  if (!user) {
    return <h1>User not found.</h1>;
  }

  const cards = [
    {
      title: "Total Students",
      value: statistics.total_students,
      icon: Users,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      description: "All registered students",
    },
    {
      title: "Active Students",
      value: statistics.active_students,
      icon: UserCheck,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      description: "Currently active students",
    },
    {
      title: "Inactive Students",
      value: statistics.inactive_students,
      icon: UserX,
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
      description: "Currently inactive students",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white shadow-lg sm:p-8">
          <div className="relative z-10 max-w-2xl">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/20">
              <GraduationCap size={28} />
            </div>

            <p className="text-sm font-medium text-blue-100">
              Welcome to EduNexus
            </p>

            <h1 className="mt-2 text-2xl font-bold sm:text-3xl lg:text-4xl">
              Hello, {user.name}!
            </h1>

            <p className="mt-3 max-w-lg text-sm leading-relaxed text-blue-100 sm:text-base">
              Manage your school efficiently with EduNexus. Keep track of
              students, teachers, departments and courses from one place.
            </p>
          </div>

          <div className="pointer-events-none absolute -right-12 -top-16 h-64 w-64 rounded-full bg-white/10" />

          <div className="pointer-events-none absolute -bottom-24 right-24 h-56 w-56 rounded-full bg-white/10" />

          <GraduationCap
            size={150}
            className="pointer-events-none absolute bottom-3 right-5 hidden text-white/10 sm:block"
          />
        </div>

        {/* Statistics Heading */}
        <div>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold text-slate-800 sm:text-2xl">
                Overview
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Here is what's happening in your organization.
              </p>
            </div>

            <span className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-600">
              Student Statistics
            </span>
          </div>

          {/* Statistics Cards */}
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {cards.map((card) => {
              const Icon = card.icon;

              return (
                <div
                  key={card.title}
                  className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        {card.title}
                      </p>

                      <h3 className="mt-3 text-3xl font-bold tracking-tight text-slate-800">
                        {isLoading ? (
                          <span className="inline-block h-9 w-16 animate-pulse rounded-md bg-gray-200" />
                        ) : (
                          card.value
                        )}
                      </h3>
                    </div>

                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl ${card.iconBg} ${card.iconColor}`}
                    >
                      <Icon size={24} />
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4">
                    <p className="text-xs text-gray-500">{card.description}</p>

                    <ArrowUpRight
                      size={18}
                      className="text-gray-400 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-blue-600"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
