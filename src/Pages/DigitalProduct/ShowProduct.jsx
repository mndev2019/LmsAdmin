import React from "react";
import TopHeader from "../../Layout/TopHeader";
import { useNavigate } from "react-router-dom";


const products = [
    {
        id: 1,
        title: "React Notes PDF",
        type: "Document",
        price: "₹199",
        image: "https://via.placeholder.com/300x200",
    },
    {
        id: 2,
        title: "JavaScript Course",
        type: "Video",
        price: "₹499",
        image: "https://via.placeholder.com/300x200",
    },
    {
        id: 3,
        title: "Private Resource Link",
        type: "Link",
        price: "Free",
        image: "https://via.placeholder.com/300x200",
    },
];

const ShowProduct = () => {
    const navigate = useNavigate("");
    return (
        <>
            <TopHeader />

            <div className="min-h-screen  p-6">
                <div className='justify-between flex'>
                    <h1 className='text-lg font-semibold text-black'>
                        My Product
                    </h1>
                    <button
                        onClick={() => navigate('/create-product')}

                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
                    >
                        + Create Product
                    </button>
                </div>


                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
                    {products.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden"
                        >
                            {/* Image */}
                            <div className="relative">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-40 object-cover"
                                />
                                <span className="absolute top-2 left-2 bg-indigo-600 text-white text-xs px-3 py-1 rounded-full">
                                    {item.type}
                                </span>
                            </div>

                            {/* Content */}
                            <div className="p-4">
                                <h2 className="text-lg font-medium mb-2">
                                    {item.title}
                                </h2>

                                <p className="text-indigo-600 font-semibold mb-4">
                                    {item.price}
                                </p>

                                <div className="flex justify-between">
                                    <button className="text-sm px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                                        View
                                    </button>
                                    <button onClick={()=> navigate('/create-product')} className="text-sm px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">
                                        Edit
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

export default ShowProduct;