import React, { useEffect, useState } from "react";
import TopHeader from "../../../Layout/TopHeader";
import axios from "axios";
import { Base_Url } from "../../../API/Base_Url";
import { toast } from "react-toastify";

const Leads = () => {
  const [leads, setLeads] = useState([]); // ✅ FIXED
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  // ✅ API CALL
  useEffect(() => {
    fetchLeads();
  }, [page]);

  const fetchLeads = async () => {
    try {
      setLoading(true);

      const res = await axios.get(`${Base_Url}/leads?page=${page}`);

      setLeads(res.data.data); // ✅ IMPORTANT FIX
      setTotalPages(res.data.totalPages);

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 DELETE LEAD
 const handleDelete = async (id) => {
  // 🔥 Confirm Alert
  const confirmDelete = window.confirm("Are you sure you want to delete this lead?");

  if (!confirmDelete) return;

  try {
    await axios.delete(`${Base_Url}/leads/${id}`);

    toast.success("Lead deleted successfully ✅");

    fetchLeads(); // refresh
  } catch (err) {
    console.log(err);
    toast.error("Failed to delete lead ❌");
  }
};

  // 🔍 FILTER
  const filteredLeads = leads.filter((lead) => {
    const matchSearch =
      lead.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.mobile?.includes(searchTerm);

    const matchDate = selectedDate
      ? lead.createdAt?.slice(0, 10) === selectedDate
      : true;

    return matchSearch && matchDate;
  });

  return (
    <>
      <TopHeader />

      <section className="p-6">
        {/* 🔥 Top Bar */}
        <div className="flex justify-between items-center my-4 flex-wrap gap-3">
          <h1 className="text-2xl font-semibold">Leads</h1>

          <div className="flex gap-3">
            {/* 🔍 Search */}
            <input
              type="text"
              placeholder="Search leads..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-[#716A5C]"
            />

            {/* 📅 Date Filter */}
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-[#716A5C]"
            />
          </div>
        </div>

        {/* ⏳ Loading */}
        {loading ? (
          <div className="text-center py-10 text-gray-500">
            Loading leads...
          </div>
        ) : (
          <>
            {/* 📊 Table */}
            <div className="bg-white shadow rounded-2xl overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-100 text-gray-600 uppercase text-xs text-left">
                  <tr>
                    <th className="px-6 py-3">Name</th>
                    <th className="px-6 py-3">Email</th>
                    <th className="px-6 py-3">Phone</th>
                    <th className="px-6 py-3">Message</th>
                    <th className="px-6 py-3">Date</th>
                    <th className="px-6 py-3">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredLeads.length > 0 ? (
                    filteredLeads.map((lead) => (
                      <tr key={lead._id} className="border-b hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium">{lead.name}</td>
                        <td className="px-6 py-4">{lead.email}</td>
                        <td className="px-6 py-4">{lead.mobile}</td>
                        <td className="px-6 py-4">{lead.message}</td>
                        <td className="px-6 py-4">
                          {lead.createdAt?.slice(0, 10)}
                        </td>

                        {/* 🔥 DELETE BUTTON */}
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleDelete(lead._id)}
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-xs"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center py-6 text-gray-500">
                        No leads found
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
                className="px-4 py-2 bg-[#716A5C] text-white rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default Leads;