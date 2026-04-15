import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import TopHeader from "../../../Layout/TopHeader";

const LearnerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Dummy Data (later API se replace karna)
  const learner = {
    id,
    name: "Muskan",
    email: "muskan@gmail.com",
    phone: "+91 9876543210",
    status: "Active",
    joined: "30 Mar 2026",
    courses: [
      { title: "React Basics", progress: 80 },
      { title: "JavaScript Advanced", progress: 60 },
      { title: "UI/UX Design", progress: 40 },
    ],
  };

  return (
    <>
    <TopHeader/>
      <div className="p-6 min-h-screen">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
      >
        ← Back
      </button>

      {/* Profile Card */}
      <div className="bg-white rounded-2xl shadow p-6 flex items-center gap-6">
        <div className="w-20 h-20 rounded-full bg-blue-500 text-white flex items-center justify-center text-2xl font-bold">
          {learner.name.charAt(0)}
        </div>

        <div>
          <h2 className="text-2xl font-semibold">{learner.name}</h2>
          <p className="text-gray-500">{learner.email}</p>
          <p className="text-gray-500">{learner.phone}</p>

          <span
            className={`inline-block mt-2 px-3 py-1 text-xs rounded-full ${
              learner.status === "Active"
                ? "bg-green-100 text-green-600"
                : "bg-red-100 text-red-600"
            }`}
          >
            {learner.status}
          </span>
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="bg-white p-4 rounded-2xl shadow">
          <p className="text-gray-500 text-sm">Total Courses</p>
          <h3 className="text-xl font-semibold">
            {learner.courses.length}
          </h3>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow">
          <p className="text-gray-500 text-sm">Joined Date</p>
          <h3 className="text-xl font-semibold">{learner.joined}</h3>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow">
          <p className="text-gray-500 text-sm">Average Progress</p>
          <h3 className="text-xl font-semibold">
            {Math.round(
              learner.courses.reduce((acc, c) => acc + c.progress, 0) /
                learner.courses.length
            )}
            %
          </h3>
        </div>
      </div>

      {/* Courses Section */}
      <div className="mt-6 bg-white rounded-2xl shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Enrolled Courses</h3>

        {learner.courses.map((course, index) => (
          <div key={index} className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span>{course.title}</span>
              <span>{course.progress}%</span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: `${course.progress}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  
  );
};

export default LearnerDetails;
