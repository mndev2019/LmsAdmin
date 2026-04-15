import React, { useState } from "react";
import TopHeader from "../../Layout/TopHeader";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Base_Url } from "../../API/Base_Url";

const CourseDetails = () => {
  const navigate = useNavigate("");
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  const getCourse = async () => {
    try {
      const res = await axios.get(`${Base_Url}/course/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setCourse(res.data.course);
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    getCourse();
  }, []);

  if (!course) return <p className="p-6">Loading...</p>;
  

  return (
    <>
      <TopHeader />

      <div className="p-6  min-h-screen">

        {/* HEADER */}
        <div className="bg-white/80 backdrop-blur border border-gray-100 p-6 rounded-2xl shadow-sm mb-6 flex justify-between">
        <div>
           <h1 className="text-3xl font-semibold text-gray-800">
            {course.title}
          </h1>

          <p className="text-gray-600 mt-3 leading-relaxed">
            {course.description}
          </p>

          <div className="mt-4">
            <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 border border-indigo-200">
              {course.pricing?.type === "free"
                ? "Free Course"
                : `₹${course.pricing?.price}`}
            </span>
          </div>
          </div>
          <div>
            <button
  onClick={() => navigate(`/create-course/${id}`)}
  className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
>
  Edit Course ✏️
</button>

          </div>
         
        </div>

        {/* INTRO VIDEO */}
        {course.introVideo && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-3 text-gray-800">
              🎬 Course Introduction
            </h2>

            <div className="w-full aspect-video rounded-2xl overflow-hidden border border-gray-200 bg-black/90 shadow-sm">
              <video
                src={course.introVideo}
                controls
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        )}

        {/* CHAPTERS */}
        {course.chapters.map((chap, i) => (
          <div
            key={i}
            className="bg-white/80 backdrop-blur border border-gray-100 p-5 rounded-2xl shadow-sm mb-6 hover:shadow-md transition duration-300"
          >
            <h2 className="font-semibold text-lg mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              📘 {chap.title}
            </h2>

            <div className="space-y-3">
              {chap.lessons.map((lesson, j) => (
                <div
                  key={j}
                  className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-4 rounded-xl border border-gray-100 bg-gradient-to-r from-white to-gray-50 hover:from-indigo-50 hover:to-purple-50 transition"
                >
                  {/* LEFT */}
                  <div>
                    <p className="font-medium text-gray-800">
                      {lesson.title}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {lesson.type.toUpperCase()}
                    </p>
                  </div>

                  {/* RIGHT */}
                  <div>
                    {lesson.type === "video" && (
                      <video
                        src={lesson.url}
                        controls
                        className="w-[220px] h-[120px] rounded-lg border border-gray-200 shadow-sm"
                      />
                    )}

                    {lesson.type === "pdf" && (
                      <a
                        href={lesson.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 text-sm font-medium rounded-lg border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600 hover:from-blue-100 hover:to-indigo-100 transition"
                      >
                        📄 View PDF
                      </a>
                    )}


                    {lesson.type === "assignment" && (
                      <a
                        href={lesson.url}
                        target="_blank"
                        className="px-4 py-2 text-sm font-medium rounded-lg border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 text-green-600 hover:from-green-100 hover:to-emerald-100 transition"
                      >
                        📥 Download Assignment
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

      </div>
    </>
  );
};

export default CourseDetails;