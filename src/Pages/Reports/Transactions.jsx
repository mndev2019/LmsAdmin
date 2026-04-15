import React, { useState, useEffect } from "react";
import TopHeader from "../../Layout/TopHeader";

const Transactions = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData([
      {
        id: 1,
        user: "Rahul",
        course: "React",
        amount: "₹999",
        status: "Paid",
        date: "2026-03-30",
      },
    ]);
  }, []);

  return (
    <>
     <TopHeader/>
      <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Transactions</h1>

      <div className="bg-white rounded-2xl shadow overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-xs uppercase text-gray-600 text-left">
            <tr>
              <th className="px-6 py-3">User</th>
              <th className="px-6 py-3">Course</th>
              <th className="px-6 py-3">Amount</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Date</th>
            </tr>
          </thead>

          <tbody>
            {data.map((t) => (
              <tr key={t.id} className="border-b">
                <td className="px-6 py-4">{t.user}</td>
                <td className="px-6 py-4">{t.course}</td>
                <td className="px-6 py-4">{t.amount}</td>
                <td className="px-6 py-4">
                  <span className="bg-green-100 text-green-600 px-2 py-1 rounded text-xs">
                    {t.status}
                  </span>
                </td>
                <td className="px-6 py-4">{t.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
   
  );
};

export default Transactions;