// import React, { useState } from "react";
// import TopHeader from "../../Layout/TopHeader";
// import axios from "axios";
// import { Base_Url } from "../../API/Base_Url";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

// const CreateCourse = () => {
//   const navigate = useNavigate("");
//   const [loading, setLoading] = useState(false);
//   const [course, setCourse] = useState({
//     title: "",
//     description: "",
//     category: "",
//     type: "free",
//     price: "",
//     cover: null,
//     introVideo: null,
//     chapters: [],
//   });

//   // 🔹 handle input
//   const handleChange = (e) => {
//     setCourse({ ...course, [e.target.name]: e.target.value });
//   };

//   // 🔹 handle file
//   const handleFile = (e, key) => {
//     const file = e.target.files[0];
//     setCourse({
//       ...course,
//       [key]: {
//         file,
//         preview: URL.createObjectURL(file),
//       },
//     });
//   };

//   // 🔥 Add Chapter
//   const addChapter = () => {
//     setCourse({
//       ...course,
//       chapters: [...course.chapters, { title: "", lessons: [] }],
//     });
//   };

//   // 🔥 Add Lesson
//   const addLesson = (chapterIndex, type) => {
//     const updated = [...course.chapters];

//     updated[chapterIndex].lessons.push({
//       type,
//       title: "",
//       file: null,
//       preview: null,
//     });

//     setCourse({ ...course, chapters: updated });
//   };

//   // 🔥 HANDLE SUBMIT (MAIN LOGIC)
//   const handleSubmit = async () => {
//     if (loading) return; // ❌ रोक दो

//     setLoading(true);

//     try {
//       const formData = new FormData();

//       // basic
//       formData.append("title", course.title);
//       formData.append("description", course.description);
//       formData.append("category", course.category);
//       formData.append("type", course.type);
//       formData.append("price", course.price);

//       // files
//       if (course.cover?.file) {
//         formData.append("thumbnail", course.cover.file);
//       }

//       if (course.introVideo?.file) {
//         formData.append("introVideo", course.introVideo.file);
//       }

//       // 🔥 chapters without files
//       const chaptersData = course.chapters.map((chap) => ({
//         title: chap.title,
//         lessons: chap.lessons.map((l) => ({
//           title: l.title,
//           type: l.type,
//         })),
//       }));

//       formData.append("chapters", JSON.stringify(chaptersData));

//       // 🔥 upload all lesson files
//       course.chapters.forEach((chap, i) => {
//         chap.lessons.forEach((lesson, j) => {
//           if (lesson.file) {
//             formData.append(`file_${i}_${j}`, lesson.file);
//           }
//         });
//       });

//       const res = await axios.post(
//         `${Base_Url}/create-course`,
//         formData,
//         {
//           headers: {
//             Authorization: localStorage.getItem("token"),
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       toast.success("Course Created Successfully 🚀");
//       console.log(res.data);
//       navigate('/courses')

//     } catch (err) {
//       console.log(err);
//       toast.error("Error creating course ❌");
//     }finally{
//       setLoading(false);

//     }
//   };

//   return (
//     <>
//       <TopHeader />

//       <div className="p-6 min-h-screen">
//         <h1 className="text-2xl font-semibold mb-6">Create Course</h1>

//         <div className="grid grid-cols-3 gap-6">

//           {/* LEFT */}
//           <div className="space-y-4">

//             {/* Cover */}
//             <div className="bg-white p-4 rounded-xl shadow-sm">
//               <p className="mb-2">Course Cover</p>

//               <label className="block h-[160px] bg-gray-50 rounded-lg flex items-center justify-center cursor-pointer overflow-hidden">
//                 {course.cover?.preview ? (
//                   <img src={course.cover.preview} className="w-full h-full object-cover" />
//                 ) : "Upload Image"}

//                 <input
//                   type="file"
//                   hidden
//                   onChange={(e) => handleFile(e, "cover")}
//                 />
//               </label>
//             </div>

//             {/* Intro Video */}
//             <div className="bg-white p-4 rounded-xl shadow-sm">
//               <p className="mb-2">Intro Video</p>

//               <input
//                 type="file"
//                 accept="video/*"
//                 onChange={(e) => handleFile(e, "introVideo")}
//               />

//               {course.introVideo?.preview && (
//                 <video src={course.introVideo.preview} controls className="mt-2 rounded-lg" />
//               )}
//             </div>

//           </div>

//           {/* RIGHT */}
//           <div className="col-span-2 space-y-5">

//             {/* Basic */}
//             <div className="bg-white p-5 rounded-xl shadow-sm">
//               <input
//                 name="title"
//                 value={course.title}
//                 onChange={handleChange}
//                 placeholder="Course Title"
//                 className="w-full mb-3 p-3 bg-gray-50 rounded-lg"
//               />

//               <textarea
//                 name="description"
//                 value={course.description}
//                 onChange={handleChange}
//                 placeholder="Course Description"
//                 className="w-full p-3 bg-gray-50 rounded-lg h-[100px]"
//               />

//               <input
//                 name="category"
//                 value={course.category}
//                 onChange={handleChange}
//                 placeholder="Category"
//                 className="w-full mt-3 p-2 bg-gray-50 rounded-lg"
//               />
//             </div>

//             {/* Pricing */}
//             <div className="bg-white p-5 rounded-xl shadow-sm">
//               <div className="flex gap-6 mb-3">
//                 <label>
//                   <input type="radio" name="type" value="free"
//                     checked={course.type === "free"}
//                     onChange={handleChange}
//                   /> Free
//                 </label>

//                 <label>
//                   <input type="radio" name="type" value="paid"
//                     checked={course.type === "paid"}
//                     onChange={handleChange}
//                   /> Paid
//                 </label>
//               </div>

//               {course.type === "paid" && (
//                 <input
//                   name="price"
//                   value={course.price}
//                   onChange={handleChange}
//                   placeholder="Price"
//                   className="p-2 bg-gray-50 rounded-lg"
//                 />
//               )}
//             </div>

//             {/* CONTENT */}
//             <div className="bg-white p-5 rounded-xl shadow-sm">
//               <p className="font-medium mb-3">Course Content</p>

//               {course.chapters.map((chap, i) => (
//                 <div key={i} className="mb-4 p-4 bg-gray-50 rounded-lg">

//                   <input
//                     placeholder="Chapter Title"
//                     value={chap.title}
//                     onChange={(e) => {
//                       const updated = [...course.chapters];
//                       updated[i].title = e.target.value;
//                       setCourse({ ...course, chapters: updated });
//                     }}
//                     className="w-full mb-3 p-2 bg-white rounded"
//                   />

//                   {chap.lessons.map((lesson, j) => (
//                     <div key={j} className="mb-3 p-3 bg-white rounded-lg">

//                       <input
//                         placeholder={`${lesson.type} title`}
//                         className="w-full mb-2 p-2 bg-gray-50 rounded"
//                         onChange={(e) => {
//                           const updated = [...course.chapters];
//                           updated[i].lessons[j].title = e.target.value;
//                           setCourse({ ...course, chapters: updated });
//                         }}
//                       />

//                       <input
//                         type="file"
//                         onChange={(e) => {
//                           const file = e.target.files[0];
//                           const updated = [...course.chapters];
//                           updated[i].lessons[j].file = file;
//                           updated[i].lessons[j].preview = URL.createObjectURL(file);
//                           setCourse({ ...course, chapters: updated });
//                         }}
//                       />

//                     </div>
//                   ))}

//                   <div className="flex gap-2">
//                     {["Video", "PDF", "Assignment"].map((t) => (
//                       <button
//                         key={t}
//                         onClick={() => addLesson(i, t)}
//                         className="text-xs px-3 py-1 bg-indigo-50 rounded-md"
//                       >
//                         + {t}
//                       </button>
//                     ))}
//                   </div>

//                 </div>
//               ))}

//               <button onClick={addChapter} className="text-indigo-600">
//                 + Add Chapter
//               </button>
//             </div>

//             <button
//               onClick={handleSubmit}
//               disabled={loading}
//               className="w-full py-3 bg-indigo-600 text-white rounded-xl"
//             >
//               {loading ? "Uploading..." : "Publish Course 🚀"}
//             </button>

//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default CreateCourse;


import React, { useState, useEffect } from "react";
import TopHeader from "../../Layout/TopHeader";
import axios from "axios";
import { Base_Url } from "../../API/Base_Url";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const CreateCourse = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const { id } = useParams();

  const isEdit = Boolean(id);

  const [loading, setLoading] = useState(false);

  const [course, setCourse] = useState({
    title: "",
    description: "",
    category: "",
    type: "free",
    price: "",
    cover: null,
    introVideo: null,
    chapters: [],
  });

  // ----------------------------
  // FETCH COURSE (EDIT MODE)
  // ----------------------------
  useEffect(() => {
    if (isEdit) {
      axios
        .get(`${Base_Url}/course/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          const data = res.data.course;

          setCourse({
            title: data.title || "",
            description: data.description || "",
            category: data.category || "",
            type: data.pricing?.type || "free",
            price: data.pricing?.price || "",
            cover: null,
            introVideo: null,
            chapters: data.chapters?.map((chap) => ({
              title: chap.title,
              lessons: chap.lessons?.map((lesson) => ({
                title: lesson.title,
                type: (lesson.type || "").toLowerCase(),
                url: lesson.url || "",
                file: null,
                preview: lesson.url || null,
              })) || [],
            })) || [],
          });
        })
        .catch((err) => console.log(err));
    }
  }, [id]);

  // ----------------------------
  // INPUT CHANGE
  // ----------------------------
  const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  // ----------------------------
  // FILE HANDLER
  // ----------------------------
  const handleFile = (e, key) => {
    const file = e.target.files[0];

    setCourse({
      ...course,
      [key]: {
        file,
        preview: URL.createObjectURL(file),
      },
    });
  };

  // ----------------------------
  // ADD CHAPTER
  // ----------------------------
  const addChapter = () => {
    setCourse({
      ...course,
      chapters: [...course.chapters, { title: "", lessons: [] }],
    });
  };

  // ----------------------------
  // ADD LESSON
  // ----------------------------
  const addLesson = (chapterIndex, type) => {
  const updated = [...course.chapters];

  updated[chapterIndex].lessons.push({
    type: type.toLowerCase(), // ✅ YAHI ADD KARNA HAI
    title: "",
    file: null,
    preview: null,
  });

  setCourse({ ...course, chapters: updated });
};

  // ----------------------------
  // SUBMIT (CREATE + UPDATE)
  // ----------------------------
  const handleSubmit = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("title", course.title);
      formData.append("description", course.description);
      formData.append("category", course.category);
      formData.append("type", course.type);
      formData.append("price", course.price);

      if (course.cover?.file) {
        formData.append("thumbnail", course.cover.file);
      }

      if (course.introVideo?.file) {
        formData.append("introVideo", course.introVideo.file);
      }

      const chaptersData = course.chapters.map((chap) => ({
        title: chap.title,
        lessons: chap.lessons.map((l) => ({
          title: l.title,
          type: l.type,
        })),
      }));

      formData.append("chapters", JSON.stringify(chaptersData));

      course.chapters.forEach((chap, i) => {
        chap.lessons.forEach((lesson, j) => {
          if (lesson.file) {
            formData.append(`file_${i}_${j}`, lesson.file);
          }
        });
      });

      if (isEdit) {
        await axios.put(`${Base_Url}/course/${id}`, formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        });

        toast.success("Course Updated 🚀");
      } else {
        await axios.post(`${Base_Url}/create-course`, formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        });

        toast.success("Course Created 🚀");
      }
      if (user.role === "instructor") {
        navigate("/instructor-dashboard");
      } else {
        navigate("/courses");
      }

    } catch (err) {
      console.log(err);
      toast.error("Error ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <TopHeader />

      <div className="p-6 min-h-screen">
        <h1 className="text-2xl font-semibold mb-6">
          {isEdit ? "Edit Course" : "Create Course"}
        </h1>

        <div className="grid grid-cols-3 gap-6">

          {/* LEFT */}
          <div className="space-y-4">

            {/* Cover */}
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <p className="mb-2">Course Cover</p>

              <label className="block h-[160px] bg-gray-50 rounded-lg flex items-center justify-center cursor-pointer overflow-hidden">
                {course.cover?.preview ? (
                  <img src={course.cover.preview} className="w-full h-full object-cover" />
                ) : (
                  "Upload Image"
                )}

                <input
                  type="file"
                  hidden
                  onChange={(e) => handleFile(e, "cover")}
                />
              </label>
            </div>

            {/* Intro Video */}
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <p className="mb-2">Intro Video</p>

              <input
                type="file"
                accept="video/*"
                onChange={(e) => handleFile(e, "introVideo")}
              />

              {course.introVideo?.preview && (
                <video
                  src={course.introVideo.preview}
                  controls
                  className="mt-2 rounded-lg"
                />
              )}
            </div>

          </div>

          {/* RIGHT */}
          <div className="col-span-2 space-y-5">

            {/* BASIC */}
            <div className="bg-white p-5 rounded-xl shadow-sm">

              <input
                name="title"
                value={course.title}
                onChange={handleChange}
                placeholder="Course Title"
                className="w-full mb-3 p-3 bg-gray-50 rounded-lg"
              />

              <textarea
                name="description"
                value={course.description}
                onChange={handleChange}
                placeholder="Course Description"
                className="w-full p-3 bg-gray-50 rounded-lg h-[100px]"
              />

              <input
                name="category"
                value={course.category}
                onChange={handleChange}
                placeholder="Category"
                className="w-full mt-3 p-2 bg-gray-50 rounded-lg"
              />

            </div>

            {/* PRICING */}
            <div className="bg-white p-5 rounded-xl shadow-sm">

              <div className="flex gap-6 mb-3">
                <label>
                  <input
                    type="radio"
                    name="type"
                    value="free"
                    checked={course.type === "free"}
                    onChange={handleChange}
                  />{" "}
                  Free
                </label>

                <label>
                  <input
                    type="radio"
                    name="type"
                    value="paid"
                    checked={course.type === "paid"}
                    onChange={handleChange}
                  />{" "}
                  Paid
                </label>
              </div>

              {course.type === "paid" && (
                <input
                  name="price"
                  value={course.price}
                  onChange={handleChange}
                  placeholder="Price"
                  className="p-2 bg-gray-50 rounded-lg"
                />
              )}

            </div>

            {/* CHAPTERS */}
            <div className="bg-white p-5 rounded-xl shadow-sm">

              <p className="font-medium mb-3">Course Content</p>

              {course.chapters.map((chap, i) => (
                <div key={i} className="mb-4 p-4 bg-gray-50 rounded-lg">

                  <input
                    placeholder="Chapter Title"
                    value={chap.title}
                    onChange={(e) => {
                      const updated = [...course.chapters];
                      updated[i].title = e.target.value;
                      setCourse({ ...course, chapters: updated });
                    }}
                    className="w-full mb-3 p-2 bg-white rounded"
                  />

                  {chap.lessons.map((lesson, j) => (
                    <div key={j} className="mb-3 p-3 bg-white rounded-lg">

                      <input
                        placeholder={`${lesson.type} title`}
                        onChange={(e) => {
                          const updated = [...course.chapters];
                          updated[i].lessons[j].title = e.target.value;
                          setCourse({ ...course, chapters: updated });
                        }}
                        className="w-full mb-2 p-2 bg-gray-50 rounded"
                      />

                      <input
                        type="file"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          const updated = [...course.chapters];
                          updated[i].lessons[j].file = file;
                          updated[i].lessons[j].preview =
                            URL.createObjectURL(file);
                          setCourse({ ...course, chapters: updated });
                        }}
                      />

                    </div>
                  ))}

                  <div className="flex gap-2">
                    {["Video", "PDF", "Assignment"].map((t) => (
                      <button
                        key={t}
                        onClick={() => addLesson(i, t)}
                        className="text-xs px-3 py-1 bg-indigo-50 rounded-md"
                      >
                        + {t}
                      </button>
                    ))}
                  </div>

                </div>
              ))}

              <button onClick={addChapter} className="text-indigo-600">
                + Add Chapter
              </button>

            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full py-3 bg-indigo-600 text-white rounded-xl"
            >
              {loading
                ? "Uploading..."
                : isEdit
                  ? "Update Course 🚀"
                  : "Publish Course 🚀"}
            </button>

          </div>
        </div>
      </div>
    </>
  );
};

export default CreateCourse;