import React, { useEffect, useState } from 'react';
import TopHeader from '../../Layout/TopHeader';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Base_Url } from '../../API/Base_Url';
import { FiInfo } from 'react-icons/fi';

const Packages = () => {
    const navigate = useNavigate();

    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(false);

    // 🔥 GET PACKAGES
    const getPackages = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${Base_Url}/packages`);
            setPackages(res.data.data || []);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getPackages();
    }, []);

    return (
        <>
            <TopHeader />

            <section className='p-5 bg-gray-50 min-h-screen'>

                {/* Header */}
                <div className='flex justify-between items-center mb-6'>
                    <h1 className='text-lg font-semibold text-black'>
                        Packages
                    </h1>

                    <button
                        onClick={() => navigate('/packages-builder')}
                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
                    >
                        + Create Package
                    </button>
                </div>

                {/* Loading */}
                {loading && (
                    <p className="text-center text-gray-500">Loading packages...</p>
                )}

                {/* Empty State */}
                {!loading && packages.length === 0 && (
                    <p className="text-center text-gray-500 mt-10">
                        No packages found 😢
                    </p>
                )}

                {/* Packages Grid */}
                <div className="grid grid-cols-3 gap-6">
                    {packages.map((pkg) => (
                        <div key={pkg._id} className="col-span-1">
                            <div className="border border-gray-100 shadow rounded-lg overflow-hidden bg-white cursor-pointer"
                             onClick={() => navigate(`/packages/${pkg._id}`)}
                            >

                                {/* Thumbnail */}
                                <div className="relative h-[200px]">
                                    <img
                                        src={pkg.coverImage}
                                        alt="cover"
                                        className="w-full h-full object-cover"
                                    />

                                    {/* Tag */}
                                    <div className="absolute top-3 left-3 bg-yellow-400 text-xs px-3 py-1 rounded-full font-semibold">
                                        PACKAGE
                                    </div>

                                    {/* Share */}
                                    <div className="absolute top-3 right-3 bg-white p-1 rounded shadow cursor-pointer">
                                         <FiInfo size={16} />
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-4">
                                    <h3 className="text-blue-600 font-medium">
                                        {pkg.title}
                                    </h3>

                                    <div className="text-sm text-gray-500 mt-1">
                                        {pkg.courses?.length || 0} Courses 📚
                                    </div>

                                    {/* Price + Date */}
                                    <div className="text-sm text-gray-600 mt-2 flex justify-between items-center">
                                        <span>
                                            ₹{pkg.packagePrice}
                                        </span>

                                        <span className="text-gray-400 text-xs">
                                            {new Date(pkg.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>

                                    {/* Discount Badge */}
                                    {pkg.discount > 0 && (
                                        <div className="mt-2 text-xs text-red-500 font-semibold">
                                            {pkg.discount}% OFF 🔥
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </section>
        </>
    );
};

export default Packages;