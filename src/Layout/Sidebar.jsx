import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdHome, MdKeyboardArrowDown, MdInventory } from "react-icons/md";
import { AiOutlineLogout } from "react-icons/ai";
import { useState } from "react";
import { FaChartPie, FaUser } from "react-icons/fa";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));

  const [openMenus, setOpenMenus] = useState({
    Products: true,
  });

  const handleToggle = (menu) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  const handlelogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  // const menuData = [
  //   {
  //     name: "Dashboard",
  //     path: "/dashboard",
  //     icon: <MdHome />,
  //   },
  //   {
  //     name: "Products",
  //     icon: <MdInventory />,
  //     children: [
  //       { name: "Courses", path: "/courses" },
  //       { name: "Packages", path: "/packages" },
  //       { name: "Membership", path: "/membership" },
  //       { name: "Webinars", path: "/webinars" },
  //       { name: "Digital products", path: "/digital-product" },
  //       { name: "Whatsapp communities", path: "/create-community" },
  //     ],
  //   },
  //   {
  //     name: "Users",
  //     icon: <FaUser />,
  //     children: [
  //       { name: "Learners", path: "/learners" },
  //       { name: "Instructors", path: "/instructors" },
  //       { name: "Leads", path: "/leads" },
  //     ],
  //   },
  //   {
  //     name: "Reports",
  //     icon: <FaChartPie />,
  //     children: [
  //       { name: "Overview", path: "/overview" },
  //       { name: "Transactions", path: "/transactions" },
  //       { name: "Settlements", path: "/settlements" },
  //       { name: "Webinars", path: "/webinar-report" },
  //     ],
  //   },
  // ];

  const menuData =
    user?.role === "admin"
      ? [
        {
          name: "Dashboard",
          path: "/dashboard",
          icon: <MdHome />,
        },
        {
          name: "Products",
          icon: <MdInventory />,
          children: [
            { name: "Courses", path: "/courses" },
            { name: "Packages", path: "/packages" },
            // { name: "Membership", path: "/membership" },
            { name: "Webinars", path: "/webinars" },
            // { name: "Digital products", path: "/digital-product" },
            { name: "Whatsapp communities", path: "/create-community" },
          ],
        },
        {
          name: "Users",
          icon: <FaUser />,
          children: [
            { name: "Learners", path: "/learners" },
            { name: "Instructors", path: "/instructors" },
            { name: "Leads", path: "/leads" },
          ],
        },
        {
          name: "Reports",
          icon: <FaChartPie />,
          children: [
            { name: "Overview", path: "/overview" },
            { name: "Transactions", path: "/transactions" },
            { name: "Settlements", path: "/settlements" },
            { name: "Webinars", path: "/webinar-report" },
          ],
        },
      ]
      : [
        {
          name: "Dashboard",
          path: "/instructor-dashboard",
          icon: <MdHome />,
        },
        // {
        //   name: "My Courses",
        //   path: "/my-courses",
        //   icon: <MdInventory />,
        // },
        // {
        //   name: "Webinars",
        //   path: "/webinars",
        //   icon: <MdInventory />,
        // },
      ];
  return (
    <div className="h-screen bg-gradient-to-b from-[#f9fafb] via-[#f1f5f9] to-[#eef2ff] border-r border-gray-200 flex flex-col justify-between">

      {/* Logo */}
      <div>
        <div className="flex items-center justify-center h-[70px] backdrop-blur-md bg-white/60 border-b border-gray-200">
          <h1 className="text-2xl font-bold tracking-tight text-gray-800">
            Ramot<span className="text-indigo-500 font-normal">LMS</span>
          </h1>
        </div>

        {/* Menu */}
        <div className="mt-5 px-3 space-y-3">
          {menuData.map((item, index) => {

            // 🔹 NORMAL LINK
            if (!item.children) {
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={index}
                  to={item.path}
                  className={`relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group
                  ${isActive
                      ? "bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 shadow-md"
                      : "hover:bg-white/70 hover:shadow-sm"
                    }`}
                >
                  <span
                    className={`text-xl ${isActive
                      ? "text-indigo-600"
                      : "text-gray-400 group-hover:text-indigo-500"
                      }`}
                  >
                    {item.icon}
                  </span>

                  <span
                    className={`text-[15px] font-medium ${isActive ? "text-gray-800" : "text-gray-500"
                      }`}
                  >
                    {item.name}
                  </span>

                  {isActive && (
                    <div className="absolute left-0 top-2 bottom-2 w-[4px] rounded-r bg-gradient-to-b from-indigo-500 to-purple-500"></div>
                  )}
                </Link>
              );
            }

            // 🔥 DROPDOWN (Products)
            const isParentActive = item.children?.some(
              (child) => location.pathname === child.path
            );

            return (
              <div key={index}>
                <div
                  onClick={() => handleToggle(item.name)}
                  className={`relative flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer transition-all duration-300
                    ${isParentActive
                      ? "bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 shadow-md"
                      : "hover:bg-white/70 hover:shadow-sm"
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-xl ${isParentActive ? "text-indigo-600" : "text-gray-400"
                        }`}
                    >
                      {item.icon}
                    </span>

                    <span
                      className={`text-[15px] font-medium ${isParentActive ? "text-gray-800" : "text-gray-600"
                        }`}
                    >
                      {item.name}
                    </span>
                  </div>

                  <MdKeyboardArrowDown
                    className={`transition ${openMenus[item.name] ? "rotate-180" : ""
                      }`}
                  />

                  {isParentActive && (
                    <div className="absolute left-0 top-2 bottom-2 w-[4px] rounded-r bg-gradient-to-b from-indigo-500 to-purple-500"></div>
                  )}
                </div>

                {/* CHILDREN */}
                {openMenus[item.name] && (
                  <div className="mt-2 space-y-1 pl-3">
                    {item.children.map((child, i) => {
                      const isActive = location.pathname === child.path;

                      return (
                        <Link
                          key={i}
                          to={child.path}
                          className={`px-4 py-2 rounded-lg text-sm cursor-pointer transition block
                          ${isActive
                              ? "bg-indigo-100 text-indigo-600 font-medium"
                              : "text-gray-500 hover:bg-white/70"
                            }`}
                        >
                          {child.name}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Logout */}
      <div className="p-4 border-t border-gray-200 bg-white/60 backdrop-blur-md">
        <button
          onClick={handlelogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 hover:bg-red-50 hover:text-red-500 transition-all"
        >
          <AiOutlineLogout className="text-xl" />
          <span className="text-[15px] font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;