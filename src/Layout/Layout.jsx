//import React from 'react'

import { Outlet, useNavigate } from "react-router-dom"

import Footer from "./Footer"
import Sidebar from "./Sidebar"
import { useEffect } from "react";



const Layout = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token") ?? null;
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));

        if (!token) {
            navigate("/login");
        } else {
            if (user?.role === "admin") {
                navigate("/dashboard");
            } else if (user?.role === "instructor") {
                navigate("/instructor-dashboard");
            }
        }
    }, [token, navigate]);
    return (
        <>

            <div className="flex">
                {/* Sidebar */}
                <div className="w-[15%] fixed top-0 left-0 h-screen bg-transparent">
                    <Sidebar />
                </div>

                {/* Main Content */}
                <div className="w-[85%] ml-[15%]">
                    <main>
                        <Outlet />
                    </main>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Layout