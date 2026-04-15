// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { Base_Url } from "../API/Base_Url";
// import { toast } from "react-toastify";

// const Login = () => {
//   const [form, setForm] = useState({ email: "", password: "" });
//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     try {
//       const res = await axios.post(`${Base_Url}/login`, form);

//       const { token, user } = res.data;

//       // ✅ Store data
//       localStorage.setItem("token", token);
//       localStorage.setItem("user", JSON.stringify(user));

//       toast.success("Login Successfully!");

//       // ✅ Role-based navigation
//       if (user?.role === "admin") {
//         navigate("/dashboard");
//       } else if (user?.role === "instructor") {
//         navigate("/instructor-dashboard");
//       } else {
//        alert("Access Denied ❌");
//       }

//     } catch (err) {
//       console.log(err)
//       toast.error("Login Failed");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-screen">
//       <div className="p-6 border rounded-lg">
//         <input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
//         <input type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
//         <button onClick={handleLogin}>Login</button>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Base_Url } from "../API/Base_Url";
import { toast } from "react-toastify";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${Base_Url}/login`, form);

      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));



      if (user?.role === "admin") {
        toast.success("Login Successfully!");
        navigate("/dashboard");
      } else if (user?.role === "instructor") {
        toast.success("Login Successfully!");
        navigate("/instructor-dashboard");
      } else {
        toast.error("Access Denied ❌");
      }
    } catch (err) {
      console.log(err);
      toast.error("Login Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50">

      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 border border-gray-100">

        {/* TITLE */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Welcome Back 👋
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Login to your account
        </p>

        {/* EMAIL */}
        <div className="mb-4">
          <label className="text-sm text-gray-600">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            className="w-full mt-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {/* PASSWORD */}
        {/* <div className="mb-6">
          <label className="text-sm text-gray-600">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
            className="w-full mt-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div> */}
        <div className="mb-6">
          <label className="text-sm text-gray-600">Password</label>

          <div className="relative mt-1">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 pr-10"
            />

            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-indigo-600"
            >
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </span>
          </div>
        </div>

        {/* BUTTON */}
        <button
          onClick={handleLogin}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition duration-300 shadow-md"
        >
          Login
        </button>

        {/* FOOTER TEXT */}
        <p className="text-center text-sm text-gray-500 mt-5">
          Don't have an account?{" "}
          <span className="text-indigo-600 cursor-pointer">
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;