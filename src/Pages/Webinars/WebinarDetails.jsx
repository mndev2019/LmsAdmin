// import axios from "axios";
// import React, { useState } from "react";
// import {
//     FaCalendarAlt,
//     FaClock,
//     FaVideo,
//     FaUsers,
//     FaRupeeSign,
//     FaInfoCircle,
// } from "react-icons/fa";
// import { Base_Url } from "../../API/Base_Url";
// import { useParams } from "react-router-dom";
// import TopHeader from "../../Layout/TopHeader";

// const WebinarDetails = () => {
//     const { id } = useParams();
//     const [webinar, setWebinars] = useState([]);

//     const getWebinars = async () => {
//         try {

//             const res = await axios.get(`${Base_Url}/webinars/${id}`);
//             setWebinars(res.data.data || []);
//         } catch (err) {
//             console.log(err);
//         }
//     };

//     React.useEffect(() => {
//         getWebinars();
//     }, []);
//     return (
//         <>
//             <TopHeader />
//             <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 p-6">

//                 <div className="max-w-6xl mx-auto">

//                     {/* HERO */}
//                     <div className="rounded-3xl shadow-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white p-10">

//                         <h1 className="text-3xl md:text-5xl font-bold">
//                             {webinar?.title || "Webinar Title"}
//                         </h1>

//                         <p className="mt-4 text-white/80 max-w-2xl">
//                             {webinar?.description ||
//                                 "Join this webinar to learn real-world skills and boost your career."}
//                         </p>

//                         {/* BADGES */}
//                         <div className="mt-6 flex flex-wrap gap-3 text-sm">

//                             <span className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full">
//                                 <FaCalendarAlt />
//                                 {new Date(webinar?.startTime).toDateString()}
//                             </span>

//                             <span className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full">
//                                 <FaClock />
//                                 {webinar?.duration || 60} min
//                             </span>

//                             <span className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full">
//                                 <FaUsers />
//                                 Live Session
//                             </span>

//                         </div>
//                     </div>

//                     {/* GRID */}
//                     <div className="grid md:grid-cols-3 gap-6 mt-8">

//                         {/* LEFT */}
//                         <div className="md:col-span-2 bg-white rounded-2xl shadow-lg p-6">

//                             <h2 className="text-xl font-semibold flex items-center gap-2">
//                                 <FaInfoCircle className="text-indigo-600" />
//                                 About Webinar
//                             </h2>

//                             <p className="text-gray-600 mt-4 leading-relaxed">
//                                 {webinar?.description ||
//                                     "This webinar helps you understand industry-level concepts, interview preparation, and real project knowledge."}
//                             </p>

//                             {/* INFO BOXES */}
//                             <div className="grid grid-cols-2 gap-4 mt-6">

//                                 <div className="p-4 rounded-xl bg-gray-50">
//                                     <p className="text-sm text-gray-500">Status</p>
//                                     <p className="font-semibold text-green-600">
//                                         {webinar?.status || "Upcoming"}
//                                     </p>
//                                 </div>

//                                 <div className="p-4 rounded-xl bg-gray-50">
//                                     <p className="text-sm text-gray-500 flex items-center gap-1">
//                                         <FaRupeeSign />
//                                         Price
//                                     </p>
//                                     <p className="font-semibold">
//                                         {webinar?.isPaid ? `₹${webinar.price}` : "Free"}
//                                     </p>
//                                 </div>

//                             </div>

//                         </div>

//                         {/* RIGHT CARD */}
//                         <div className="bg-white rounded-2xl shadow-lg p-6 h-fit sticky top-6">

//                             <h3 className="text-lg font-semibold flex items-center gap-2">
//                                 <FaVideo className="text-indigo-600" />
//                                 Join Webinar
//                             </h3>

//                             <div className="mt-4 space-y-3 text-sm text-gray-600">

//                                 <p className="flex items-center gap-2">
//                                     <FaCalendarAlt />{" "}
//                                     {new Date(webinar?.startTime).toLocaleDateString()}
//                                 </p>

//                                 <p className="flex items-center gap-2">
//                                     <FaClock />{" "}
//                                     {new Date(webinar?.startTime).toLocaleTimeString()}
//                                 </p>

//                                 <p className="flex items-center gap-2">
//                                     <FaVideo /> Google Meet Live
//                                 </p>

//                             </div>

//                             <a
//                                 href={webinar?.meetingLink}
//                                 target="_blank"
//                                 rel="noreferrer"
//                                 className="mt-6 block text-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition"
//                             >
//                                 Join Now 🚀
//                             </a>

//                         </div>

//                     </div>
//                 </div>
//             </div>
//         </>

//     );
// };

// export default WebinarDetails;


import axios from "axios";
import React, { useEffect, useState } from "react";
import { Base_Url } from "../../API/Base_Url";
import { useParams } from "react-router-dom";
import TopHeader from "../../Layout/TopHeader";

const WebinarDetails = () => {
  const { id } = useParams();
  const [webinar, setWebinar] = useState(null);

  const getData = async () => {
    const res = await axios.get(`${Base_Url}/webinars/${id}`);
    setWebinar(res.data.data);
  };

  useEffect(() => {
    getData();
  }, []);

  if (!webinar) return <p>Loading...</p>;

  return (
    <>
      <TopHeader />

      <div className="p-6">

        <h1 className="text-2xl font-bold">{webinar.title}</h1>

        <p className="mt-2 text-gray-600">{webinar.description}</p>

        <div className="mt-4 space-y-2">
          <p>📅 {new Date(webinar.startTime).toLocaleDateString()}</p>
          <p>⏰ {new Date(webinar.startTime).toLocaleTimeString()}</p>
          <p>⏳ {webinar.duration} mins</p>
          <p>👨‍🏫 {webinar.speaker || "N/A"}</p>
          <p>💰 {webinar.isPaid ? `₹${webinar.price}` : "Free"}</p>
        </div>

        <div className="mt-6 space-y-3">

          {/* Admin Join */}
          {webinar.meetingLink && (
            <a
              href={webinar.meetingLink}
              target="_blank"
              className="block bg-green-600 text-white p-3 text-center"
            >
              Join Webinar 🚀
            </a>
          )}

          {/* Recording */}
          {webinar.recordingUrl && (
            <a
              href={webinar.recordingUrl}
              target="_blank"
              className="block bg-indigo-600 text-white p-3 text-center"
            >
              Watch Recording 🎥
            </a>
          )}

        </div>

      </div>
    </>
  );
};

export default WebinarDetails;