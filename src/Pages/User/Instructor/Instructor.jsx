import React, { useState } from "react";
import axios from "axios";
import CreateInstructorModal from "./CreateInstructorModal";
import TopHeader from "../../../Layout/TopHeader";
import { Base_Url } from "../../../API/Base_Url";

export const Instructors = () => {
  const [instructors, setInstructors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editInstructor, setEditInstructor] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");

  // 🔥 Fetch Instructors
  const fetchInstructors = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(`${Base_Url}/instructors`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setInstructors(res.data.instructors);
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    fetchInstructors();
  }, []);

  // 🔍 Filter
  const filteredInstructors = instructors.filter((ins) =>
    ins.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = async (ins) => {
    setEditInstructor(ins);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    const token = localStorage.getItem("token");

    await axios.delete(`${Base_Url}/delete-instructor/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    fetchInstructors();
  };

  return (
    <>
      <TopHeader />

      <div className="p-6">
        {/* Top */}
        <div className="flex justify-between items-center my-4">
          <h1 className="text-2xl font-semibold">Instructors</h1>

          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border rounded-lg"
            />

            <button
              onClick={() => setShowModal(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              + Add Instructor
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white shadow rounded-2xl">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Email</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredInstructors.map((ins) => (
                <tr key={ins._id} className="border-b">
                  <td className="px-6 py-4">{ins.name}</td>
                  <td className="px-6 py-4">{ins.email}</td>
                  <td className="px-6 py-4 flex gap-2">
                    <button
                      onClick={() => handleEdit(ins)}
                      className="bg-yellow-400 px-3 py-1 rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(ins._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        {showModal && (
          // <CreateInstructorModal
          //   onClose={() => {
          //     setShowModal(false);
          //     fetchInstructors(); // 🔥 refresh
          //   }}
          // />
          <CreateInstructorModal
            editInstructor={editInstructor}
            onClose={() => {
              setShowModal(false);
              setEditInstructor(null);
              fetchInstructors();
            }}
          />
        )}
      </div>
    </>
  );
};



