import React, { useState, useEffect } from 'react'
import TopHeader from '../../Layout/TopHeader'
import { useNavigate } from 'react-router-dom'
import Select from "react-select";
import axios from 'axios';
import { Base_Url } from '../../API/Base_Url';
import { toast } from 'react-toastify';

const PackageBuilder = () => {
    const navigate = useNavigate();

    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        courses: [],
        price: "",
        access: "lifetime",
        description: "",
        status: "draft",
        coverImage: null
    });

    // GET COURSES
    const getCourses = async () => {
        try {
            const res = await axios.get(`${Base_Url}/courses`);
            setCourses(res.data.courses || []);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getCourses();
    }, []);

    // Select options
    const courseOptions = courses.map((course) => ({
        value: course._id,
        label: `${course.title} - ₹${course.pricing.price}`
    }));

    const handleChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value
        }));
    };

    const handleImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            handleChange("coverImage", file);
        }
    };

    const handleSave = async () => {
        try {
            setLoading(true);

            const form = new FormData();

            form.append("title", formData.title);
            form.append("packagePrice", Number(formData.price));
            form.append("access", formData.access);
            form.append("description", formData.description);
            form.append("status", formData.status);

            // safe courses
            form.append(
                "courses",
                JSON.stringify((formData.courses || []).map(c => c.value))
            );
            // image
            if (formData.coverImage) {
                form.append("coverImage", formData.coverImage);
            }

            await axios.post(`${Base_Url}/packages`, form);

            toast.success("Package Created Successfully 🎉");
            navigate("/packages");

        } catch (error) {
            console.log(error);
            toast.error("Error creating package");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <TopHeader />

            <section className='p-6 bg-gray-50 min-h-screen'>

                {/* Header */}
                <div className='flex justify-between mb-6'>
                    <h1 className='text-xl font-semibold'>Create Package</h1>

                    <button
                        onClick={() => navigate('/packages')}
                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
                    >
                        View Packages
                    </button>
                </div>

                <div className="grid grid-cols-3 gap-6">

                    {/* Title */}
                    <div className="col-span-3 bg-white p-4 rounded-lg">
                        <label className="block text-sm font-medium mb-2">
                            Package Title
                        </label>
                        <input
                            type="text"
                            className="w-full border px-4 py-2 rounded-lg"
                            value={formData.title}
                            onChange={(e) => handleChange("title", e.target.value)}
                        />
                    </div>

                    {/* Courses */}
                    <div className="col-span-3 bg-white p-4 rounded-lg">
                        <label className="block text-sm font-medium mb-2">
                            Select Courses
                        </label>

                        <Select
                            options={courseOptions}
                            isMulti
                            value={formData.courses}
                            onChange={(selected) => handleChange("courses", selected)}
                            placeholder="Search and select courses..."
                        />
                    </div>

                    {/* Price */}
                    <div className="col-span-1 bg-white p-4 rounded-lg">
                        <label className="block text-sm mb-2">Price (₹)</label>
                        <input
                            type="number"
                            className="w-full border px-4 py-2 rounded-lg"
                            value={formData.price}
                            onChange={(e) => handleChange("price", e.target.value)}
                        />
                    </div>

                    {/* Access */}
                    <div className="col-span-1 bg-white p-4 rounded-lg">
                        <label className="block text-sm mb-2">Access Type</label>
                        <select
                            className="w-full border px-4 py-2 rounded-lg"
                            value={formData.access}
                            onChange={(e) => handleChange("access", e.target.value)}
                        >
                            <option value="lifetime">Lifetime</option>
                            <option value="limited">Limited</option>
                        </select>
                    </div>

                    {/* Status */}
                    <div className="col-span-1 bg-white p-4 rounded-lg">
                        <label className="block text-sm mb-2">Status</label>
                        <select
                            className="w-full border px-4 py-2 rounded-lg"
                            value={formData.status}
                            onChange={(e) => handleChange("status", e.target.value)}
                        >
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                        </select>
                    </div>

                    {/* Cover */}
                    <div className="col-span-2 bg-white p-4 rounded-lg">
                        <label className="block text-sm mb-2">Cover Image</label>
                        <input type="file" onChange={handleImage} />
                    </div>

                    {/* Description */}
                    <div className="col-span-3 bg-white p-4 rounded-lg">
                        <label className="block text-sm mb-2">Description</label>
                        <textarea
                            rows="4"
                            className="w-full border px-4 py-2 rounded-lg"
                            value={formData.description}
                            onChange={(e) => handleChange("description", e.target.value)}
                        />
                    </div>

                </div>

                {/* Save Button */}
                <div className="mt-6 flex justify-end">
                    <button
                        onClick={handleSave}
                        disabled={loading}
                        className={`px-6 py-2 rounded-lg text-white ${loading ? "bg-gray-400" : "bg-green-600"
                            }`}
                    >
                        {loading ? "Creating..." : "Save Package"}
                    </button>
                </div>

            </section>
        </>
    )
}

export default PackageBuilder;