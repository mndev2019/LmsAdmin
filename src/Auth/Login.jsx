import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Base_Url } from "../API/Base_Url";
import { toast } from "react-toastify";
import { FiEye, FiEyeOff } from "react-icons/fi";
import shape1 from '../assets/Image/shape1.png';
import shape2 from '../assets/Image/shape2.png';
import boy from '../assets/Image/boy.png'
import bubblebottom from '../assets/Image/bubblebottom.png'
import bubbletop from '../assets/Image/bubbletop.png'

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-r from-[#BE7DFF] via-[#DFA7FF] to-[#E8D2FF]">
      <img src={shape1} className="absolute top-0 left-0 h-[500px]" />
      <img src={shape2} className="absolute bottom-2 right-0 h-[500px]" />
      <img src={bubblebottom} className="absolute bottom-0 left-0" />
      <img src={bubbletop} className="absolute top-0 right-0 h-[400px]" />

      {/* 🔮 Right Side Cluster Bubbles (like design) */}
      {/* <div className="absolute right-0 top-0 w-full h-full pointer-events-none z-0">


        <div className="absolute right-[120px] top-[180px] w-32 h-32 bg-gradient-to-b from-[#F1D6FF] to-[#EE34FF] opacity-30 rounded-full"></div>


        <div className="absolute right-[80px] top-[120px] w-12 h-12 bg-purple-400 opacity-40 rounded-full"></div>


        <div className="absolute right-[40px] top-[200px] w-14 h-14 bg-pink-300 opacity-40 rounded-full"></div>


        <div className="absolute right-[100px] top-[300px] w-20 h-20 bg-purple-300 opacity-30 rounded-full"></div>


        <div className="absolute right-[20px] top-[350px] w-36 h-36 bg-pink-500 opacity-20 rounded-full"></div>

      </div> */}
      {/* 🔮 Left Bottom Bubbles */}
      {/* <div className="absolute left-0 bottom-0 w-full h-full pointer-events-none z-0">

   
        <div className="absolute left-[40px] bottom-[40px] w-40 h-40 bg-pink-400 opacity-20 rounded-full"></div>

        <div className="absolute left-[120px] bottom-[80px] w-24 h-24 bg-purple-400 opacity-30 rounded-full"></div>

      
        <div className="absolute left-[80px] bottom-[160px] w-16 h-16 bg-pink-300 opacity-40 rounded-full"></div>

     
        <div className="absolute left-[160px] bottom-[40px] w-10 h-10 bg-purple-300 opacity-40 rounded-full"></div>

      </div> */}


      <div className="relative w-full max-w-[800px] bg-white shadow-xl p-20 border border-dashed border-[#8A2BE9] rounded-br-[200px] rounded-tl-[200px] z-10">
        <img src={boy} className="absolute h-[600px] right-[-72px] top-[-10px]" />

        {/* TITLE */}
        <h2 className="text-[30px] font-bold  text-black mb-2">
          Welcome Back
        </h2>
        <p className="text-[20px] text-black mb-6">
          Log in to your account to manage your<br></br> details and stay connected.
        </p>

        <div className="mb-4">
          <label className="text-[18px] text-black block mb-1">
            Email
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            className="w-[70%] px-3 py-2 border border-dashed border-[#C885FF] rounded-lg"
          />
        </div>


        <div className="mb-6">
          <label className="text-[18px] text-black">Password</label>

          <div className="relative mt-1">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"

              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
              className="w-[70%] px-3 py-2 border border-dashed border-[#C885FF] rounded-lg"
            />

            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-[207px] top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-indigo-600"
            >
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </span>
          </div>
        </div>

        {/* BUTTON */}
        {/* <button
          onClick={handleLogin}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition duration-300 shadow-md"
        >
          Login
        </button> */}
        <button
         disabled={loading}
          onClick={handleLogin}
          className="py-2 px-8 rounded-2xl font-semibold bg-white 
  text-transparent bg-clip-text bg-gradient-to-r from-[#8A2BE9] to-[#FF6FF8]
  border-2 border-transparent 
  [border-image:linear-gradient(90deg,#C885FF,#9A26FA)_1]
  transition duration-300 hover:scale-[1.02]"
        >
          {loading ? (
            <>
              <span className="w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></span>
              Loging...
            </>
          ) : (
            "Continue"
          )}
        </button>

        {/* FOOTER TEXT */}
        {/* <p className="text-center text-sm text-gray-500 mt-5">
          Don't have an account?{" "}
          <span className="text-indigo-600 cursor-pointer">
            Sign up
          </span>
        </p> */}
      </div>
    </div>
  );
};

export default Login;