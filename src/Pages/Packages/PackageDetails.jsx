import React, { useEffect, useState } from "react";
import TopHeader from "../../Layout/TopHeader";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Base_Url } from "../../API/Base_Url";
import { FiInfo } from "react-icons/fi";

const PackageDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔥 GET PACKAGE
  const getPackage = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${Base_Url}/packages/${id}`);
      setPkg(res.data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPackage();
  }, [id]);

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (!pkg) {
    return <p className="text-center mt-10">Package not found</p>;
  }

  return (
    <>
      <TopHeader />

      <section className="p-6 min-h-screen mt-10">

        {/* 🔥 TOP SECTION */}
        <div className="grid grid-cols-3 gap-6">

          {/* Image */}
          <div className="col-span-1 bg-white rounded-xl shadow overflow-hidden">
            <img
              src={pkg.coverImage}
              alt="cover"
              className="w-full h-[300px] object-cover"
            />
          </div>

          {/* Info */}
          <div className="col-span-2 bg-white p-6 rounded-xl shadow">

            <div className="flex justify-between items-start">
              <h1 className="text-2xl font-semibold text-gray-800">
                {pkg.title}
              </h1>

              <button
                onClick={() => navigate(`/packages/edit/${pkg._id}`)}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
              >
                Edit
              </button>
            </div>

            {/* Status */}
            <div className="mt-2">
              <span className={`px-3 py-1 text-xs rounded-full ${
                pkg.status === "published"
                  ? "bg-green-100 text-green-600"
                  : "bg-gray-200 text-gray-600"
              }`}>
                {pkg.status}
              </span>
            </div>

            {/* Price */}
            <div className="mt-4 text-xl font-bold text-gray-800 flex items-center gap-2">
              ₹{pkg.packagePrice}

              {pkg.discount > 0 && (
                <span className="text-sm text-red-500">
                  {pkg.discount}% OFF 🔥
                </span>
              )}
            </div>

            {/* Description */}
            <p className="mt-4 text-gray-600 leading-relaxed">
              {pkg.description}
            </p>

            {/* Meta */}
            <div className="mt-6 flex gap-6 text-sm text-gray-500">
              <span>
                📅 Created: {new Date(pkg.createdAt).toLocaleDateString()}
              </span>
              <span>📦 Access: {pkg.access}</span>
            </div>

          </div>
        </div>

        {/* 🔥 COURSES SECTION */}
        <div className="mt-6 ">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <FiInfo /> Courses in this Package
          </h2>

          {pkg.courses?.length === 0 ? (
            <p className="text-gray-500">No courses added</p>
          ) : (
            <div className="space-y-3">
              {pkg.courses.map((course) => (
                <div
                  key={course._id}
                  className="flex justify-between items-center border border-gray-100 p-3 rounded-lg hover:shadow-sm transition bg-white"
                >
                  <div>
                    <p className="font-medium text-gray-800">
                      {course.title}
                    </p>
                    <p className="text-xs text-gray-500">
                      {course.category || "Course"}
                    </p>
                  </div>

                  <span className="text-sm font-semibold text-indigo-600">
                    ₹{course.pricing?.price || 0}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

      </section>
    </>
  );
};

export default PackageDetails;