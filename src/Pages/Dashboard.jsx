// import React, { useEffect, useState } from "react";
// import axios from "axios";

// import robot from "../assets/Image/robot.png";
// import { Base_Url } from "../API/Base_Url";

// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   CartesianGrid,
//   Cell,
// } from "recharts";

// const Dashboard = () => {
//   const [growthData, setGrowthData] = useState([]);
//   const [activity, setActivity] = useState([]);

//   // ✅ STATS
//   const [stats, setStats] = useState({
//     students: 0,
//     courses: 0,
//     revenue: 0,
//     activeUsers: 0,
//   });

//   const [loading, setLoading] = useState(true);

//   // ✅ DATE FILTER
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");

//   // 🔥 DASHBOARD API
//   useEffect(() => {
//     const getDashboard = async () => {
//       try {
//         const res = await axios.get(`${Base_Url}/dashboard`);
//         setStats(res.data.data);
//       } catch (err) {
//         console.log(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     getDashboard();
//   }, []);

//   // 🔥 GROWTH API
//   useEffect(() => {
//     const getGrowth = async () => {
//       try {
//         let url = `${Base_Url}/student-growth`;

//         if (startDate && endDate) {
//           url += `?startDate=${startDate}&endDate=${endDate}`;
//         }

//         const res = await axios.get(url);

//         const formatted = res.data.data.map((item) => ({
//           date: item._id,
//           students: item.students, // ✅ FIXED
//         }));

//         setGrowthData(formatted);
//       } catch (err) {
//         console.log(err);
//       }
//     };

//     getGrowth();
//   }, [startDate, endDate]);

//   useEffect(() => {
//     const getActivity = async () => {
//       try {
//         const res = await axios.get(`${Base_Url}/activity`);
//         setActivity(res.data.data);
//       } catch (err) {
//         console.log(err);
//       }
//     };

//     getActivity();
//   }, []);

//   // 🔥 TODAY HIGHLIGHT
//   const today = new Date().toLocaleDateString("en-GB", {
//     day: "2-digit",
//     month: "short",
//   });

//   return (
//     <div className="relative p-6 min-h-screen bg-gradient-to-br from-[#fdfbff] via-[#f3f4ff] to-[#eef2ff] overflow-hidden">

//       {/* 🔥 Background Glow */}
//       <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-purple-300 opacity-30 rounded-full blur-3xl"></div>
//       <div className="absolute bottom-[-100px] right-[-100px] w-[300px] h-[300px] bg-indigo-300 opacity-30 rounded-full blur-3xl"></div>

//       {/* 🔹 Header */}
//       <div className="relative z-10 mb-8 flex justify-between items-center">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-800">
//             Dashboard 👋
//           </h1>
//           <p className="text-gray-500 text-sm">
//             Welcome back, manage your LMS
//           </p>
//         </div>

//         <div className="px-4 py-2 rounded-xl bg-white/60 backdrop-blur-md shadow-sm text-sm text-gray-600">
//           Today: <span className="font-semibold">Overview</span>
//         </div>
//       </div>

//       {/* 🔹 Stats Cards */}
//       <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         {[
//           {
//             title: "Students",
//             value: loading ? "..." : stats.students,
//             color: "from-indigo-500 to-purple-500",
//           },
//           {
//             title: "Courses",
//             value: loading ? "..." : stats.courses,
//             color: "from-pink-500 to-rose-500",
//           },
//           {
//             title: "Revenue",
//             value: loading ? "..." : `₹${stats.revenue}`,
//             color: "from-green-400 to-emerald-500",
//           },
//           {
//             title: "Active",
//             value: loading ? "..." : stats.activeUsers,
//             color: "from-orange-400 to-amber-500",
//           },
//         ].map((item, i) => (
//           <div
//             key={i}
//             className="relative p-5 rounded-2xl bg-white/50 backdrop-blur-xl border border-white/40 shadow-lg hover:scale-[1.02] transition"
//           >
//             <div
//               className={`absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r ${item.color} rounded-t-2xl`}
//             ></div>

//             <p className="text-sm text-gray-500">{item.title}</p>
//             <h2 className="text-2xl font-bold text-gray-800 mt-2">
//               {item.value}
//             </h2>

//             <p className="text-xs text-green-500 mt-1">
//               +12% this week
//             </p>
//           </div>
//         ))}
//       </div>

//       {/* 🔹 Middle Section */}
//       <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-6">

//         {/* 📊 Graph */}
//         <div className="lg:col-span-2 p-6 rounded-2xl bg-white/50 backdrop-blur-xl border border-white/40 shadow-lg">

//           {/* 🔥 Header + Date Filter */}
//           <div className="flex justify-between items-center mb-5">
//             <h2 className="text-lg font-semibold text-gray-700">
//               Student Growth
//             </h2>

//             <div className="flex gap-2">
//               <input
//                 type="date"
//                 value={startDate}
//                 onChange={(e) => setStartDate(e.target.value)}
//                 className="text-sm px-2 py-1 rounded-lg bg-white border text-gray-500"
//               />

//               <input
//                 type="date"
//                 value={endDate}
//                 onChange={(e) => setEndDate(e.target.value)}
//                 className="text-sm px-2 py-1 rounded-lg bg-white border text-gray-500"
//               />
//             </div>
//           </div>

//           {/* 🌈 BAR CHART */}
//           <ResponsiveContainer width="100%" height={260}>
//             <BarChart data={growthData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="date" />
//               <YAxis />
//               <Tooltip />

//               <Bar dataKey="students" radius={[10, 10, 0, 0]}>
//                 {growthData.map((entry, index) => (
//                   <Cell
//                     key={index}
//                     fill={
//                       entry.date === today
//                         ? "#22c55e" // 🟢 today
//                         : ["#6366f1", "#a855f7", "#ec4899", "#f59e0b"][index % 4]
//                     }
//                   />
//                 ))}
//               </Bar>
//             </BarChart>
//           </ResponsiveContainer>
//         </div>

//         {/* ⚡ Course Tools */}
//         <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-xl border border-white/30 shadow-lg hover:shadow-xl transition">

//           <h2 className="text-lg font-semibold text-gray-700 mb-3">
//             Course Tools 🎯
//           </h2>

//           <p className="text-xs text-gray-500 mb-4">
//             Manage your courses, lectures and students
//           </p>

//           <div className="flex justify-center">
//             <div className="w-60 md:w-72 opacity-95 hover:scale-105 transition duration-500 animate-pulse">
//               <img
//                 src={robot}
//                 alt="course tools"
//                 className="rounded-xl drop-shadow-lg"
//               />
//             </div>
//           </div>

//           <div className="mt-5">
//             <button className="w-full py-2 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white text-sm font-semibold shadow-md hover:shadow-lg hover:scale-[1.03] transition duration-300">
//               + Create Course
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* 🔹 Bottom Section */}
//       <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">

//         <div className="p-6 rounded-2xl bg-white/50 backdrop-blur-xl border border-white/40 shadow-lg">
//           <h2 className="text-lg font-semibold text-gray-700 mb-4">
//             Revenue Overview
//           </h2>

//           <div className="h-[200px] flex items-center justify-center text-gray-400">
//             💰 Chart Coming Soon
//           </div>
//         </div>

//         <div className="p-6 rounded-2xl bg-white/50 backdrop-blur-xl border border-white/40 shadow-lg">
//           <h2 className="text-lg font-semibold text-gray-700 mb-4">
//             Recent Activity
//           </h2>

//           <ul className="space-y-4 text-sm text-gray-600">
//             {activity.length === 0 ? (
//               <p className="text-gray-400 text-sm">No recent activity</p>
//             ) : (
//               activity.map((item, i) => (
//                 <li key={i} className="flex justify-between">
//                   <span>{item.text}</span>
//                   <span className="text-xs text-gray-400">
//                     {new Date(item.time).toLocaleString()}
//                   </span>
//                 </li>
//               ))
//             )}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useEffect, useState } from 'react'
import darkcircle from '../assets/Image/darkcircle.png'
import lightcircle from '../assets/Image/lightcircle.png'
import lmslaptop from '../assets/Image/lmslaptop.png'
import { Link, useNavigate } from 'react-router-dom'
import dash2 from '../assets/Image/dash-2.png'
import card from '../assets/Image/card.png'
import axios from 'axios'
import { Base_Url } from '../API/Base_Url'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const Dashboard = () => {
  const navigate = useNavigate("");
  // ✅ STATS
  const [stats, setStats] = useState({
    students: 0,
    courses: 0,
    revenue: 0,
    activeUsers: 0,
  });

  const [loading, setLoading] = useState(true);
  const [growthData, setGrowthData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [activity, setActivity] = useState([]);
  // 🔥 DASHBOARD API
  useEffect(() => {
    const getDashboard = async () => {
      try {
        const res = await axios.get(`${Base_Url}/dashboard`);
        setStats(res.data.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    getDashboard();
  }, []);
  const [course, setCourse] = useState(null);

  const getCourse = async () => {
    try {
      const res = await axios.get(`${Base_Url}/courses`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setCourse(res.data.courses.slice(0, 2));
      // setCourse(res.data.courses.slice(-2));
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    getCourse();
  }, []);
  // 🔥 GROWTH API
  useEffect(() => {
    const getGrowth = async () => {
      try {
        let url = `${Base_Url}/student-growth`;

        if (startDate && endDate) {
          url += `?startDate=${startDate}&endDate=${endDate}`;
        }

        const res = await axios.get(url);

        const formatted = res.data.data.map((item) => ({
          date: item._id,
          students: item.students, // ✅ FIXED
        }));

        setGrowthData(formatted);
      } catch (err) {
        console.log(err);
      }
    };

    getGrowth();
  }, [startDate, endDate]);


  useEffect(() => {
    const getActivity = async () => {
      try {
        const res = await axios.get(`${Base_Url}/activity`);
        setActivity(res.data.data.slice(0, 4));
        
      } catch (err) {
        console.log(err);
      }
    };

    getActivity();
  }, []);



  return (
    <>
      <section className='p-5'>
        <div className="relative z-10 mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Dashboard 👋
            </h1>
            <p className="text-gray-500 text-sm">
              Welcome back, manage your LMS
            </p>
          </div>

          <div className="px-4 py-2 rounded-xl bg-white/60 backdrop-blur-md shadow-sm text-sm text-gray-600">
            Today: <span className="font-semibold">Overview</span>
          </div>
        </div>
        <div className="rounded-[16px] bg-gradient-to-r from-[#C992FF] to-[#DEBDFF] h-55 relative">
          <img src={darkcircle} className='h-40 absolute right-[10px]' />
          <img src={lightcircle} className='h-40 absolute right-[270px] top-[60px]' />
          <div className="grid grid-cols-2 items-center h-full ">
            <div className="col-span-1 p-5">
              <h2 className='text-white text-[30px] font-bold'>
                Learn With Effectively With Us!
              </h2>
              <p className='text-white text-[20px] '>
                Learn smarter with structured courses, live sessions, and hands-on practice designed for real results.
              </p>
            </div>
            <div className="col-span-1 relative">
              <img src={lmslaptop} className='h-70 absolute z-10 right-10 top-[-147px]' />
            </div>
          </div>
        </div>

        <h2 className='tex-black text-[25px] font-semibold mt-3'>
          User Overview
        </h2>
        <div className="grid grid-cols-4 gap-5 mt-5">

          {/* CARD */}
          {[
            {
              title: "Students",
              count: loading ? "..." : stats.students,

            },
            {
              title: "Courses",
              count: loading ? "..." : stats.courses,

            },
            {
              title: "Revenue",
              count: loading ? "..." : `₹${stats.revenue}`,

            },
            {
              title: "Active",
              count: loading ? "..." : stats.activeUsers,

            },
          ].map((item, i) => (

            <div
              key={i}
              className="group p-5 rounded-[29px] bg-white hover:bg-gradient-to-r hover:from-[#D34EFF] hover:to-[#A148FA] transition duration-300 cursor-pointer"
            >

              {/* Top */}
              <div className="flex items-center gap-3">
                <div className=" flex items-center justify-center px-3 py-1 rounded-sm bg-[#FFF3E2] text-[#FFA600] font-bold text-lg group-hover:bg-white group-hover:text-black">
                  {item.count}
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 group-hover:text-white">
                    {item.title}
                  </h3>
                  <p className="text-sm text-black group-hover:text-white/80">
                    Total Students Enrolled
                  </p>
                </div>
              </div>

              {/* Bottom */}
              <div className="mt-4 flex justify-between items-center">
                <p className="text-green-600 text-sm group-hover:text-green-200">
                  +12 % This Week
                </p>

                <p className="text-gray-700 text-sm flex items-center gap-1 group-hover:text-white">
                  View Details →
                </p>
              </div>
            </div>

          ))}

        </div>



        <div className='mt-5 flex justify-between'>
          <h2 className='tex-black text-[25px] font-semibold '>
            Cources
          </h2>
          <Link to="/courses">
            <p className="text-[18px] text-black hover:text-indigo-600 transition">
              View All Created Courses →
            </p>
          </Link>
        </div>

        {/* Content */}
        <div className="grid grid-cols-4 gap-5 mt-5">

          {/* LEFT CARDS */}
          <div className="col-span-2 grid grid-cols-2 gap-5">

            {/* CARD */}
            {course?.map((courses) => (
              <>
                <div className="relative w-full max-w-sm">

                  {/* BACKGROUND PURPLE CARD (IMAGE) */}
                  <img
                    src={card}
                    className="w-full rounded-2xl"
                    alt=""
                  />

                  {/* WHITE CARD OVERLAY */}
                  <div className="absolute top-5 left-5 right-5 bg-white rounded-2xl p-6 shadow-lg">
                    {/* Tag */}
                    <span className="text-xs bg-[#FFEEFE] text-[#9707BF] px-2 py-1 rounded-full">
                      {courses.category}
                    </span>
                    <div className="border-l-4 border-purple-500 pl-3">


                      {/* Title */}
                      <h3 className="mt-3 font-bold text-black">
                        {courses.title?.split(" ").slice(0, 2).join(" ")}...
                      </h3>
                      <p className="text-sm text-black mt-1">
                        {courses.description?.split(" ").slice(0, 6).join(" ")}...
                      </p>
                    </div>



                    {/* Divider */}
                    <div className="h-[2px] bg-green-200 my-3"></div>

                    {/* Info */}
                    <p className="text-xs text-[#3EBF07] mb-1">
                      Chapters {courses.chapters.length}
                    </p>

                    <p className="text-xs text-black mb-1">
                      Total Lectures:
                    </p>

                    <p className="text-xs text-blue-500">
                      Level (Beginner / Advanced)
                    </p>

                    {/* Button */}
                    <button onClick={() => navigate(`/course/${courses._id}`)} className="mt-4 px-4 py-1 text-sm bg-[#FFEEFE] text-[#9707BF] rounded-full hover:bg-purple-200 transition">
                      View Details →
                    </button>

                  </div>
                </div>
              </>

            ))}

          </div>

          {/* RIGHT SIDE */}
          <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-2xl pt-5 px-5 border border-dashed border-purple-300 flex flex-col justify-between col-span-2">

            <div>
              <h3 className="font-semibold text-black mb-3">
                Course Tools
              </h3>
              <div className='flex justify-between'>
                {/* IMAGE */}
                <img
                  src={dash2}
                  alt=""
                  className=" h-60 object-contain"
                />

                {/* BUTTON */}
                <button onClick={() => navigate('/create-course')} className="shadow my-4 self-end px-3 py-2 text-sm bg-[#35B8FF] text-white rounded-full hover:bg-blue-600 transition">
                  Create Course →
                </button>
              </div>


            </div>



          </div>

        </div>
        <div className="grid grid-cols-2 mt-8 gap-5">
          <div className="col-span-1">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-lg font-semibold text-gray-700">
                Student Growth
              </h2>

              <div className="flex gap-2">
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="text-sm px-2 py-1 rounded-lg bg-white border text-gray-500"
                />

                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="text-sm px-2 py-1 rounded-lg bg-white border text-gray-500"
                />
              </div>
            </div>

            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={growthData}>

                {/* Gradient */}
                <defs>
                  <linearGradient id="colorPurple" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#a855f7" stopOpacity={0.6} />
                    <stop offset="100%" stopColor="#a855f7" stopOpacity={0} />
                  </linearGradient>

                  <linearGradient id="colorPink" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ec4899" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#ec4899" stopOpacity={0} />
                  </linearGradient>
                </defs>

                {/* Grid (dashed like image) */}
                <CartesianGrid strokeDasharray="4 4" stroke="#e9d5ff" />

                {/* Axes */}
                <XAxis dataKey="date" stroke="#a855f7" />
                <YAxis stroke="#a855f7" />

                <Tooltip />

                {/* BACK AREA (pink light) */}
                <Area
                  type="monotone"
                  dataKey="students"
                  stroke="none"
                  fill="url(#colorPink)"
                />

                {/* FRONT AREA (purple line) */}
                <Area
                  type="monotone"
                  dataKey="students"
                  stroke="#8b5cf6"
                  strokeWidth={3}
                  fill="url(#colorPurple)"
                  dot={false}
                />

              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="col-span-1">
            <div className="p-6 rounded-2xl bg-white/50 backdrop-blur-xl border border-white/40 shadow-lg">

              <h2 className="text-lg font-semibold text-gray-700 mb-4">
                Recent Activity
              </h2>

              <ul className="space-y-5">
                {activity.length === 0 ? (
                  <p className="text-gray-400 text-sm">No recent activity</p>
                ) : (
                  activity.map((item, i) => (

                    <li key={i} className="flex items-center justify-between">

                      {/* LEFT SIDE */}
                      <div className="flex items-center gap-3">

                        {/* CIRCLE (alternate color) */}
                        <div
                          className={`h-10 w-10 rounded-full ${i % 2 === 0
                              ? "bg-orange-100"
                              : "bg-purple-200"
                            }`}
                        ></div>

                        {/* TEXT */}
                        <p className="text-gray-700 font-medium">
                          {item.text}
                        </p>
                      </div>

                      {/* DATE */}
                      <span className="text-xs text-gray-400">
                        {new Date(item.time).toLocaleDateString("en-US", {
                          month: "long",
                          day: "2-digit",
                          year: "numeric",
                        })}
                      </span>

                    </li>
                  ))
                )}
              </ul>

            </div>
          </div>

        </div>





      </section >
    </>
  )
}

export default Dashboard








