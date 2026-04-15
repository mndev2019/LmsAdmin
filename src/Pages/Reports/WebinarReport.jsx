import React, { useState } from "react";
import TopHeader from "../../Layout/TopHeader";

const WebinarReport = () => {
  const [activeTab, setActiveTab] = useState("past");

  const stats = [
    { title: "Registrations", value: 120 },
    { title: "Participants", value: 80 },
    { title: "Total Revenue", value: "₹12,000" },
  ];

  const webinars = [
    {
      title: "React Masterclass",
      registrations: 100,
      attendees: 70,
      revenue: 7000,
      status: "past",
    },
    {
      title: "UI/UX Bootcamp",
      registrations: 50,
      attendees: 30,
      revenue: 5000,
      status: "upcoming",
    },
  ];

  const filteredWebinars = webinars.filter(
    (w) => w.status === activeTab
  );

  return (
    <>
    <TopHeader/>
     <div className="p-6 min-h-screen">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Webinars</h1>
        <p className="text-gray-500">Analytics & performance</p>
      </div>

      {/* 🔥 Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm hover:shadow-md transition relative overflow-hidden"
          >
            {/* Soft glow */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-100 rounded-full blur-2xl opacity-40"></div>

            <p className="text-sm text-gray-500">{item.title}</p>
            <h2 className="text-2xl font-semibold mt-2 text-gray-800">
              {item.value}
            </h2>

            <div className="mt-4 h-1 w-12 bg-blue-400 rounded-full"></div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab("upcoming")}
          className={`px-4 py-2 rounded-full text-sm transition ${
            activeTab === "upcoming"
              ? "bg-blue-500 text-white shadow"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          Upcoming
        </button>

        <button
          onClick={() => setActiveTab("past")}
          className={`px-4 py-2 rounded-full text-sm transition ${
            activeTab === "past"
              ? "bg-blue-500 text-white shadow"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          Past
        </button>
      </div>

      {/* Webinar Cards */}
      {filteredWebinars.length === 0 ? (
        <div className="text-center py-10 text-gray-400 bg-white rounded-xl shadow-sm">
          No webinars found
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {filteredWebinars.map((webinar, index) => (
            <div
              key={index}
              className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:scale-[1.02] transition"
            >
              {/* Title */}
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                {webinar.title}
              </h3>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 text-center text-sm mb-4">
                <div className="bg-blue-50 p-2 rounded-lg">
                  <p className="text-gray-500">Regs</p>
                  <p className="font-semibold text-gray-700">
                    {webinar.registrations}
                  </p>
                </div>

                <div className="bg-green-50 p-2 rounded-lg">
                  <p className="text-gray-500">Attend</p>
                  <p className="font-semibold text-gray-700">
                    {webinar.attendees}
                  </p>
                </div>

                <div className="bg-purple-50 p-2 rounded-lg">
                  <p className="text-gray-500">Revenue</p>
                  <p className="font-semibold text-gray-700">
                    ₹{webinar.revenue}
                  </p>
                </div>
              </div>

              {/* Progress */}
              <div className="h-2 bg-gray-100 rounded-full">
                <div
                  className="h-2 bg-blue-400 rounded-full"
                  style={{
                    width: `${
                      (webinar.attendees / webinar.registrations) *
                      100
                    }%`,
                  }}
                ></div>
              </div>

              {/* Footer */}
              <div className="flex justify-between items-center mt-4 text-xs text-gray-500">
                <span>
                  {webinar.status === "past"
                    ? "Completed"
                    : "Upcoming"}
                </span>

                {/* <button className="text-blue-500 hover:underline">
                  View Details
                </button> */}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </>
   
  );
};

export default WebinarReport;