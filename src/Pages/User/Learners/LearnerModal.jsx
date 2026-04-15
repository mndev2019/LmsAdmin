import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import axios from "axios";
import { Base_Url } from "../../../API/Base_Url";
import { toast } from "react-toastify";

const LearnerModal = ({
  showModal,
  setShowModal,
  fetchLearners // 👈 important (refresh list)
}) => {
  const [showPassword, setShowPassword] = useState(false);

  // ✅ form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

  if (!showModal) return null;

  // ✅ handle input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // ✅ submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await axios.post(`${Base_Url}/register`, formData);

      toast.success("Learner Created Successfully ✅");

      // 🔥 reset form
      setFormData({
        name: "",
        email: "",
        mobile: "",
        password: ""
      });

      // 🔥 close modal
      setShowModal(false);

      // 🔥 refresh learners list
      fetchLearners();

    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.msg || "Error creating learner");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 px-4">
      
      <div className="w-[90%] sm:w-[80%] md:w-[60%] lg:w-[40%] 
      bg-white border border-gray-200 rounded-3xl shadow-2xl p-8 relative">

        {/* Close */}
        <button
          onClick={() => setShowModal(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-black text-lg"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Create Learner ✨
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Name */}
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Full Name"
            className="w-full border border-gray-200 rounded-xl px-4 py-3"
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Email Address"
            className="w-full border border-gray-200 rounded-xl px-4 py-3"
          />

          {/* Mobile */}
          <input
            type="tel"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            required
            placeholder="Mobile Number"
            className="w-full border border-gray-200 rounded-xl px-4 py-3"
          />

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Password"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 pr-12"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-400"
            >
              {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Learner"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default LearnerModal;