import React, {useState} from "react";
import axios from "axios";
import { Base_Url } from "../API/Base_Url";
import TopHeader from "../Layout/TopHeader";
import { useNavigate} from "react-router-dom";


const InstructorDashboard = () => {
    
    const navigate = useNavigate("");
  const [courses, setCourses] = useState([]);

  // 🔥 Fetch Instructor Courses
  const fetchCourses = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(`${Base_Url}/instructor-courses`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCourses(res.data.courses || []);
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <>
      <TopHeader />

      <div className="p-6 space-y-6 bg-gray-50 min-h-screen">

        {/* 🔥 Welcome */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-6 rounded-2xl shadow">
          <h2 className="text-2xl font-semibold">
            Welcome Instructor 👨‍🏫
          </h2>
          <p className="text-sm opacity-90">
            Manage your courses and track your students
          </p>
        </div>

        {/* 📊 Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          <div className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition">
            <h4 className="text-gray-500 text-sm">Total Courses</h4>
            <h2 className="text-2xl font-bold text-indigo-600">
              {courses.length}
            </h2>
          </div>

          {/* <div className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition">
            <h4 className="text-gray-500 text-sm">Total Students</h4>
            <h2 className="text-2xl font-bold text-green-600">
              120 
            </h2>
          </div> */}

          <div className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition">
            <h4 className="text-gray-500 text-sm">Active Courses</h4>
            <h2 className="text-2xl font-bold text-purple-600">
              {courses.length}
            </h2>
          </div>
        </div>

        {/* 📚 My Courses */}
        <div>
          <h3 className="text-xl font-semibold mb-4">My Courses</h3>

          {courses.length === 0 ? (
            <p className="text-gray-500">No courses assigned</p>
          ) : (
            <div className="grid md:grid-cols-3 gap-5">

              {courses?.map((course) => (
                <div
                  key={course._id}
                  className="bg-white rounded-2xl shadow hover:shadow-xl transition overflow-hidden group"
                >
                  {/* Image */}
                  <div className="h-40 bg-gray-200 overflow-hidden">
                    <img
                      src={course.course_id?.thumbnail}
                      alt=""
                      className="w-full h-full object-cover group-hover:scale-110 transition"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-4 space-y-2">
                    <h4 className="font-semibold text-lg text-gray-800">
                      {course.course_id?.title}
                    </h4>

                    <p className="text-sm text-gray-500 line-clamp-2">
                      {course.course_id?.description || "No description"}
                    </p>

                    {/* Stats */}
                    <div className="flex justify-between text-sm text-gray-400 pt-2">
                      {/* <span>👨‍🎓 50 Students</span> */}
                      {/* <span className="text-indigo-500 font-medium">
                        Active
                      </span> */}
                    </div>

                    {/* Button */}
                    <button onClick={() => navigate(`/course/${course.course_id._id}`)} className="w-full mt-3 py-2 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600">
                      Manage Course
                    </button>
                  </div>
                </div>
              ))}

            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default InstructorDashboard;