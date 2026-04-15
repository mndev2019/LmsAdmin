import React, { useEffect, useState } from "react";
import TopHeader from "../../../Layout/TopHeader";
import LearnerModal from "./LearnerModal";
import axios from "axios";
import { Base_Url } from "../../../API/Base_Url";

const Learners = () => {
  const [learners, setLearners] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const [showModal, setShowModal] = useState(false);

  // 🔥 pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(false);

  // ✅ FETCH API
  useEffect(() => {
    fetchLearners();
  }, [page]);

  const fetchLearners = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${Base_Url}/learners?page=${page}&limit=10`
      );

      setLearners(res.data.data);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // 🔍 Filter
  const filteredLearners = learners.filter((user) => {
    const matchSearch =
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchDate = selectedDate
      ? user.createdAt?.slice(0, 10) === selectedDate
      : true;

    return matchSearch && matchDate;
  });

  return (
    <>
      <TopHeader />

      <section className="p-6">
        {/* 🔥 Top Section */}
        <div className="flex justify-between items-center my-4 flex-wrap gap-3">
          <h1 className="text-2xl font-semibold">Learners</h1>

          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => setShowModal(true)}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
            >
              + Create Learners
            </button>

            {/* Search */}
            <input
              type="text"
              placeholder="Search by name/email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border rounded-lg text-sm"
            />

            {/* Date */}
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-4 py-2 border rounded-lg text-sm"
            />
          </div>
        </div>

        {/* ⏳ Loading */}
        {loading ? (
          <div className="text-center py-10 text-gray-500">
            Loading learners...
          </div>
        ) : (
          <>
            {/* 📊 Table */}
            <div className="overflow-x-auto bg-white shadow rounded-2xl">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                  <tr>
                    <th className="px-6 py-3 text-start">Name</th>
                    <th className="text-start">Email</th>
                    <th className="text-start">Courses</th>
                    <th className="text-start">Status</th>
                    <th className="text-start">Date</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredLearners.length > 0 ? (
                    filteredLearners.map((user) => (
                      <tr key={user._id} className="border-b hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium">
                          {user.name}
                        </td>
                        <td>{user.email}</td>
                        <td>{user.courses}</td>

                        <td>
                          <span
                            className={`px-3 py-1 rounded-full text-xs ${
                              user.status === "Active"
                                ? "bg-green-100 text-green-600"
                                : "bg-red-100 text-red-600"
                            }`}
                          >
                            {user.status}
                          </span>
                        </td>

                        <td>
                          {user.createdAt?.slice(0, 10)}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="5"
                        className="text-center py-6 text-gray-500"
                      >
                        No learners found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* 🔥 Pagination */}
            <div className="flex justify-center mt-6 gap-3">
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
              >
                Prev
              </button>

              <span className="px-4 py-2">
                Page {page} of {totalPages}
              </span>

              <button
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
                className="px-4 py-2 bg-indigo-600 text-white rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        )}
      </section>

      {/* 💎 Modal */}
      <LearnerModal
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </>
  );
};

export default Learners;