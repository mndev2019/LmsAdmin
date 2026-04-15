// import React, { useState } from "react";
// import axios from "axios";
// import { Base_Url } from "../../../API/Base_Url";

// const CreateInstructorModal = ({ onClose }) => {
//     const [form, setForm] = useState({
//         name: "",
//         email: "",
//         mobile: "",
//         password: "",
//     });

//     const [searchCourse, setSearchCourse] = useState("");
//     const [selectedCourses, setSelectedCourses] = useState([]);
//     const [courses, setCourses] = useState([]);

//     const fetchCourses = async () => {
//         try {
//             const res = await axios.get(`${Base_Url}/courses`);
//             setCourses(res.data.courses); // 👈 backend response check karo
//         } catch (err) {
//             console.log(err);
//         }
//     };
//     React.useEffect(() => {
//         fetchCourses();
//     }, []);


//     const filteredCourses = courses.filter((c) =>
//         c.title.toLowerCase().includes(searchCourse.toLowerCase())
//     );

//     const handleChange = (e) => {
//         setForm({ ...form, [e.target.name]: e.target.value });
//     };

//     const toggleCourse = (id) => {
//         if (selectedCourses.includes(id)) {
//             setSelectedCourses(selectedCourses.filter((c) => c !== id));
//         } else {
//             setSelectedCourses([...selectedCourses, id]);
//         }
//     };

//     // 🔥 MAIN SUBMIT
//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             const token = localStorage.getItem("token");

//             // 1️⃣ Create Instructor
//             const res = await axios.post(
//                 `${Base_Url}/create-instructor`,
//                 form,
//                 {
//                     headers: { Authorization: `Bearer ${token}` },
//                 }
//             );

//             const instructorId = res.data.instructor._id;

//             // 2️⃣ Assign Courses
//             await axios.post(
//                 `${Base_Url}/assign-courses`,
//                 {
//                     instructor_id: instructorId,
//                     course_ids: selectedCourses,
//                 },
//                 {
//                     headers: { Authorization: `Bearer ${token}` },
//                 }
//             );

//             alert("Instructor Created 🚀");
//             onClose();

//         } catch (err) {
//             console.log(err);
//             alert("Error ❌");
//         }
//     };

//     return (
//         <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
//             <div className="bg-white p-6 rounded-xl w-[400px]">
//                 <h2 className="text-xl mb-4">Create Instructor</h2>

//                 <form onSubmit={handleSubmit} className="space-y-3">
//                     <input name="name" placeholder="Name" onChange={handleChange} className="w-full border p-2" />
//                     <input name="email" placeholder="Email" onChange={handleChange} className="w-full border p-2" />
//                     <input name="mobile" placeholder="Mobile" onChange={handleChange} className="w-full border p-2" />
//                     <input name="password" type="password" placeholder="Password" onChange={handleChange} className="w-full border p-2" />

//                     {/* Course Search */}
//                     <input
//                         placeholder="Search Course"
//                         value={searchCourse}
//                         onChange={(e) => setSearchCourse(e.target.value)}
//                         className="w-full border p-2"
//                     />

//                     {/* Courses */}
//                     <div className="max-h-32 overflow-y-auto border p-2">
//                         {filteredCourses.map((course) => (
//                             <label key={course._id} className="block">
//                                 <input
//                                     type="checkbox"
//                                     checked={selectedCourses.includes(course._id)}
//                                     onChange={() => toggleCourse(course._id)}
//                                 />
//                                 {course.title}
//                             </label>
//                         ))}
//                     </div>

//                     <div className="flex justify-end gap-2">
//                         <button type="button" onClick={onClose}>Cancel</button>
//                         <button className="bg-blue-500 text-white px-4 py-2">
//                             Create
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default CreateInstructorModal;

import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import { Base_Url } from "../../../API/Base_Url";

const CreateInstructorModal = ({ onClose, editInstructor }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });

  const [courses, setCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);

  // 🔥 Fetch all courses
  const fetchCourses = async () => {
    try {
      const res = await axios.get(`${Base_Url}/courses`);
      setCourses(res.data.courses);
    } catch (err) {
      console.log(err);
    }
  };

  // 🔥 Fetch assigned courses (EDIT MODE)
  const fetchAssignedCourses = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${Base_Url}/instructor-courses/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // ✅ IMPORTANT FIX (handle both populated & raw id)
      const ids = res.data.courses.map(
        (c) => c.course_id?._id || c.course_id
      );

      setSelectedCourses(ids);

    } catch (err) {
      console.log(err);
    }
  };

  // 🔥 Load courses first
  useEffect(() => {
    fetchCourses();
  }, []);

  // 🔥 Edit mode setup (WITH TIMING FIX)
  useEffect(() => {
    if (editInstructor && courses.length > 0) {
      setForm({
        name: editInstructor.name || "",
        email: editInstructor.email || "",
        mobile: editInstructor.mobile || "",
        password: "",
      });

      fetchAssignedCourses(editInstructor._id);
    }
  }, [editInstructor, courses]);

  // 🔥 Input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔥 Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      // 👉 EDIT MODE
      if (editInstructor) {
        await axios.post(
          `${Base_Url}/update-instructor-courses`,
          {
            instructor_id: editInstructor._id,
            course_ids: selectedCourses,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        alert("Instructor Updated ✅");
      } 
      
      // 👉 CREATE MODE
      else {
        const res = await axios.post(
          `${Base_Url}/create-instructor`,
          form,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const instructorId = res.data.instructor._id;

        await axios.post(
          `${Base_Url}/assign-courses`,
          {
            instructor_id: instructorId,
            course_ids: selectedCourses,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        alert("Instructor Created 🚀");
      }

      onClose();

    } catch (err) {
      console.log(err);
      alert("Error ❌");
    }
  };

  // 🔥 react-select options
  const courseOptions = courses.map((c) => ({
    value: c._id,
    label: c.title,
  }));

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl w-[400px]">
        
        <h2 className="text-xl mb-4">
          {editInstructor ? "Edit Instructor" : "Create Instructor"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">

          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-2"
          />

          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border p-2"
          />

          <input
            name="mobile"
            placeholder="Mobile"
            value={form.mobile}
            onChange={handleChange}
            className="w-full border p-2"
          />

          {!editInstructor && (
            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              className="w-full border p-2"
            />
          )}

          {/* 🔥 MULTI SELECT (AUTO SELECT WORKING) */}
          <Select
            isMulti
            options={courseOptions}
            value={courseOptions.filter((opt) =>
              selectedCourses.includes(opt.value)
            )}
            onChange={(selected) =>
              setSelectedCourses(selected.map((s) => s.value))
            }
          />

          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose}>
              Cancel
            </button>

            <button className="bg-blue-500 text-white px-4 py-2 rounded">
              {editInstructor ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateInstructorModal;