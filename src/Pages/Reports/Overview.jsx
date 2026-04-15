import React from "react";
import TopHeader from "../../Layout/TopHeader";
import { FaUsers, FaBook, FaRupeeSign, FaChalkboardTeacher } from "react-icons/fa";

const Overview = () => {
  const stats = [
    {
      title: "Total Users",
      value: 120,
      icon: <FaUsers />,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Total Courses",
      value: 15,
      icon: <FaBook />,
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "Total Revenue",
      value: "₹50,000",
      icon: <FaRupeeSign />,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Instructors",
      value: 8,
      icon: <FaChalkboardTeacher />,
      color: "bg-orange-100 text-orange-600",
    },
  ];

  return (
    <>
      <TopHeader />

      <div className="p-6 bg-gray-50 min-h-screen">
        
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">
            Dashboard Overview
          </h1>
          <p className="text-gray-500 text-sm">
            Monitor your LMS performance
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((item, i) => (
            <div
              key={i}
              className="relative bg-white border border-gray-100 p-5 rounded-2xl shadow-sm hover:shadow-md hover:scale-[1.03] transition overflow-hidden"
            >
              {/* Glow Effect */}
              <div className="absolute -top-5 -right-5 w-24 h-24 bg-gray-200 rounded-full blur-2xl opacity-30"></div>

              {/* Icon */}
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-lg text-lg ${item.color}`}
              >
                {item.icon}
              </div>

              {/* Content */}
              <h3 className="text-gray-500 text-sm mt-3">
                {item.title}
              </h3>

              <p className="text-2xl font-semibold mt-1 text-gray-800">
                {item.value}
              </p>

              {/* Bottom bar */}
              <div className="mt-4 h-1 w-10 bg-gray-300 rounded-full"></div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Overview;