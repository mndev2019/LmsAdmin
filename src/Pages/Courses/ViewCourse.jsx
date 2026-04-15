import React, {useState } from "react";
import TopHeader from "../../Layout/TopHeader";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Base_Url } from "../../API/Base_Url";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

const ViewCourses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  // 🔥 API CALL
  const getCourses = async () => {
    try {
      const res = await axios.get(`${Base_Url}/courses`);
      setCourses(res.data.courses);
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    getCourses();
  }, []);
  const handleDelete = async (id) => {
  try {
    const confirmDelete = window.confirm("Are you sure want to delete this course?");

    if (!confirmDelete) return;

    await axios.delete(`${Base_Url}/course/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    toast.success("Course deleted successfully 🗑️");

    // refresh list
    getCourses();

  } catch (err) {
    console.log(err);
    toast.error("Delete failed ❌");
  }
};

  return (
    <>
      <TopHeader />

      <div className="p-6 min-h-screen bg-gray-50">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">All Courses</h1>

          <button
            onClick={() => navigate("/create-course")}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
          >
            + Create Course
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course._id}
              className="bg-white rounded-2xl shadow hover:shadow-lg transition relative"
            >
              <div className="bg-white p-3 rounded-full absolute top-3 right-5" onClick={() => handleDelete(course._id)}>
                <MdDelete className="text-red-900 text-xl" />
                </div>
              <img
                src={course.thumbnail}
                className="h-[200px] w-full object-cover rounded-t-2xl"
              />

              <div className="p-4">
                <h2 className="font-semibold text-lg">{course.title}</h2>

                <p className="text-sm text-gray-500 line-clamp-2">
                  {course.description}
                </p>

                <div className="flex justify-between mt-4">
                  <span className="text-indigo-600 font-medium">
                    {course.pricing?.type === "free"
                      ? "Free"
                      : `₹${course.pricing?.price}`}
                  </span>

                  <button
                    onClick={() => navigate(`/course/${course._id}`)}
                    className="px-3 py-1 bg-indigo-50 rounded-lg"
                  >
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </>
  );
};

export default ViewCourses;