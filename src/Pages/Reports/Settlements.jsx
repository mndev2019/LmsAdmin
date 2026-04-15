import React, { useEffect, useState } from "react";
import TopHeader from "../../Layout/TopHeader";

const Settlements = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        setData([
            {
                id: 1,
                instructor: "John",
                earnings: "₹10,000",
                paid: "₹7,000",
                pending: "₹3,000",
            },
        ]);
    }, []);

    return (
        <>
            <TopHeader />
            <div className="p-6">
                <h1 className="text-xl font-semibold mb-4">Settlements</h1>

                <div className="bg-white rounded-2xl shadow overflow-x-auto">
                    <table className="min-w-full text-sm">
                        <thead className="bg-gray-100 text-xs uppercase text-gray-600 text-left">
                            <tr>
                                <th className="px-6 py-3">Instructor</th>
                                <th className="px-6 py-3">Earnings</th>
                                <th className="px-6 py-3">Paid</th>
                                <th className="px-6 py-3">Pending</th>
                            </tr>
                        </thead>

                        <tbody>
                            {data.map((s) => (
                                <tr key={s.id} className="border-b">
                                    <td className="px-6 py-4">{s.instructor}</td>
                                    <td className="px-6 py-4">{s.earnings}</td>
                                    <td className="px-6 py-4 text-green-600">{s.paid}</td>
                                    <td className="px-6 py-4 text-red-500">{s.pending}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>

    );
};

export default Settlements;