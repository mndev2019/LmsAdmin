// import React, { useEffect, useState } from "react";
// import TopHeader from "../../Layout/TopHeader";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { Base_Url } from "../../API/Base_Url";

// const Webinars = () => {
//   const navigate = useNavigate();

//   const [webinars, setWebinars] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const getWebinars = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get(`${Base_Url}/webinars`);
//       setWebinars(res.data.data || []);
//     } catch (err) {
//       console.log(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getWebinars();
//   }, []);

//   return (
//     <>
//       <TopHeader />

//       <div className="p-6">
//         <div className="flex justify-between mb-6">
//           <h2 className="text-xl font-semibold">Webinars</h2>

//           <button
//             onClick={() => navigate("/create-webinar")}
//             className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
//           >
//             + Create Webinar
//           </button>
//         </div>

//         {/* Loading */}
//         {loading && <p>Loading...</p>}

//         {/* Cards */}
//         <div className="grid grid-cols-3 gap-6">
//           {webinars.map((webinar) => (
//             <div
//               key={webinar._id}
//               className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
//             >

//               {/* Thumbnail */}
//               <div className="h-40 bg-gray-200">
//                 {webinar.thumbnail && (
//                   <img
//                     src={webinar.thumbnail}
//                     className="w-full h-full object-cover"
//                   />
//                 )}
//               </div>

//               <div className="p-4">

//                 <h3 className="font-semibold text-lg mb-1">
//                   {webinar.title}
//                 </h3>

//                 <p className="text-sm text-gray-500">
//                   📅 {new Date(webinar.startTime).toLocaleDateString()}
//                 </p>

//                 <p className="text-sm text-gray-500">
//                   ⏰ {new Date(webinar.startTime).toLocaleTimeString()}
//                 </p>

//                 <p className="text-sm text-gray-500">
//                   ⏳ {webinar.duration} mins
//                 </p>

//                 <p className="text-sm mt-2">
//                   💰 ₹{webinar.price || 0}
//                 </p>

//                 {/* Status */}
//                 <div className="mt-2">
//                   <span
//                     className={`text-xs px-2 py-1 rounded-full ${
//                       webinar.status === "published"
//                         ? "bg-green-100 text-green-600"
//                         : "bg-yellow-100 text-yellow-600"
//                     }`}
//                   >
//                     {webinar.status}
//                   </span>
//                 </div>

//                 {/* Buttons */}
//                 <div className="flex justify-between mt-4">
//                   <button
//                     className="text-indigo-600 text-sm"
//                     onClick={() => navigate(`/webinar/${webinar._id}`)}
//                   >
//                     View →
//                   </button>

//                   <a
//                     href={webinar.meetingLink}
//                     target="_blank"
//                     className="bg-indigo-600 text-white px-3 py-1 rounded text-sm"
//                   >
//                     Join
//                   </a>
//                 </div>

//               </div>
//             </div>
//           ))}
//         </div>

//         {!loading && webinars.length === 0 && (
//           <p className="text-center mt-10 text-gray-500">
//             No webinars found
//           </p>
//         )}
//       </div>
//     </>
//   );
// };

// export default Webinars;

import React, { useState } from "react";
import TopHeader from "../../Layout/TopHeader";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Base_Url } from "../../API/Base_Url";
import { toast } from "react-toastify";

const Webinars = () => {
  const navigate = useNavigate();
  const [webinars, setWebinars] = useState([]);

  const getWebinars = async () => {
    const res = await axios.get(`${Base_Url}/webinars`);
    setWebinars(res.data.data || []);
  };

  React.useEffect(() => {
    getWebinars();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this webinar?")) return;

    await axios.delete(`${Base_Url}/webinars/${id}`);
    toast.success("Deleted");
    getWebinars();
  };

  return (
    <>
      <TopHeader />

      <div className="p-6">

        <div className="flex justify-between mb-6">
          <h2 className="text-xl font-semibold">Webinars</h2>

          <button
            onClick={() => navigate("/create-webinar")}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
          >
            + Create Webinar
          </button>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {webinars.map((webinar) => (
            <div key={webinar._id} className="bg-white rounded-xl shadow overflow-hidden">

              <div className="h-40 bg-gray-200">
                {webinar.thumbnail && (
                  <img src={webinar.thumbnail} className="w-full h-full object-cover" />
                )}
              </div>

              <div className="p-4">

                <h3 className="font-semibold text-lg">{webinar.title}</h3>

                <p className="text-sm text-gray-500">
                  📅 {new Date(webinar.startTime).toLocaleDateString()}
                </p>

                <p className="text-sm text-gray-500">
                  ⏰ {new Date(webinar.startTime).toLocaleTimeString()}
                </p>

                <span className="text-xs px-2 py-1 rounded bg-gray-100">
                  {webinar.status}
                </span>

                <div className="flex justify-between mt-4">

                  <button onClick={() => navigate(`/webinar/${webinar._id}`)}>
                    View →
                  </button>

                  {/* <div className="flex gap-2">

                    <button onClick={() => navigate(`/edit-webinar/${webinar._id}`)}>
                      Edit
                    </button>

                    <button className="px-3 py-2 bg-red-900 text-white" onClick={() => handleDelete(webinar._id)}>
                      Delete
                    </button>

                    <a
                      href={webinar.meetingLink}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-indigo-600 text-white px-3 py-1 rounded text-sm"
                    >
                      Join
                    </a>

                  </div> */}
                  <div className="flex gap-3">

                    <button
                      onClick={() => navigate(`/edit-webinar/${webinar._id}`)}
                      className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700 transition duration-200"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(webinar._id)}
                      className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg shadow hover:bg-red-700 transition duration-200"
                    >
                      Delete
                    </button>

                    <a
                      href={webinar.meetingLink}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg shadow hover:bg-green-700 transition duration-200 inline-flex items-center justify-center"
                    >
                      Join
                    </a>

                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </>
  );
};

export default Webinars;