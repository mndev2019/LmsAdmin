


// import React, { useState } from "react";
// import TopHeader from "../../Layout/TopHeader";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { Base_Url } from "../../API/Base_Url";
// import { toast } from "react-toastify";

// const CreateWebinar = () => {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);

//   const [form, setForm] = useState({
//     title: "",
//     date: "",
//     time: "",
//     duration: "",
//     description: "",
//     price: "",
//     isPaid: false,
//     status: "draft",
//     speaker: "",
//     maxParticipants: "",
//     thumbnail: null,
//     preview: null
//   });

//   const handleChange = (field, value) => {
//     setForm({ ...form, [field]: value });
//   };

//   const handleImage = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setForm({
//         ...form,
//         thumbnail: file,
//         preview: URL.createObjectURL(file)
//       });
//     }
//   };

//   const handleSubmit = async () => {
//     try {
//       setLoading(true);

//       const formData = new FormData();

//       formData.append("title", form.title);
//       formData.append("date", form.date);
//       formData.append("time", form.time);
//       formData.append("duration", form.duration);
//       formData.append("description", form.description);
//       formData.append("price", form.price);
//       formData.append("isPaid", form.isPaid);
//       formData.append("status", form.status);
//       formData.append("speaker", form.speaker);
//       formData.append("maxParticipants", form.maxParticipants);

//       if (form.thumbnail) {
//         formData.append("thumbnail", form.thumbnail);
//       }

//       await axios.post(`${Base_Url}/webinars`, formData);

//       toast.success("Webinar Created Successfully 🎉");
//       navigate("/webinars");

//     } catch (error) {
//       toast.error("Error creating webinar");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <TopHeader />

//       <div className="p-6 min-h-screen">

//         <div className="flex justify-between mb-6">
//           <h2 className="text-xl font-semibold">Create Webinar</h2>

//           <button
//             onClick={() => navigate("/webinars")}
//             className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
//           >
//             View Webinars
//           </button>
//         </div>

//         <div className="grid grid-cols-3 gap-6">

//           <div className="col-span-3 bg-white p-4 rounded-lg">
//             <label className="block mb-2">Webinar Title</label>
//             <input
//               className="w-full border p-2 rounded"
//               onChange={(e) => handleChange("title", e.target.value)}
//             />
//           </div>

//           <div className="bg-white p-4 rounded-lg">
//             <label>Date</label>
//             <input type="date" className="w-full border p-2"
//               onChange={(e) => handleChange("date", e.target.value)} />
//           </div>

//           <div className="bg-white p-4 rounded-lg">
//             <label>Time</label>
//             <input type="time" className="w-full border p-2"
//               onChange={(e) => handleChange("time", e.target.value)} />
//           </div>

//           <div className="bg-white p-4 rounded-lg">
//             <label>Duration</label>
//             <input type="number" className="w-full border p-2"
//               onChange={(e) => handleChange("duration", e.target.value)} />
//           </div>

//           <div className="bg-white p-4 rounded-lg">
//             <label>Price</label>
//             <input type="number" className="w-full border p-2"
//               onChange={(e) => handleChange("price", e.target.value)} />
//           </div>

//           <div className="bg-white p-4 rounded-lg">
//             <label>Speaker</label>
//             <input className="w-full border p-2"
//               onChange={(e) => handleChange("speaker", e.target.value)} />
//           </div>

//           <div className="bg-white p-4 rounded-lg">
//             <label>Max Participants</label>
//             <input type="number" className="w-full border p-2"
//               onChange={(e) => handleChange("maxParticipants", e.target.value)} />
//           </div>

//           <div className="bg-white p-4 rounded-lg">
//             <label>Type</label>
//             <select className="w-full border p-2"
//               onChange={(e) => handleChange("isPaid", e.target.value === "true")}>
//               <option value={false}>Free</option>
//               <option value={true}>Paid</option>
//             </select>
//           </div>

//           <div className="bg-white p-4 rounded-lg">
//             <label>Status</label>
//             <select className="w-full border p-2"
//               onChange={(e) => handleChange("status", e.target.value)}>
//               <option value="draft">Draft</option>
//               <option value="published">Published</option>
//             </select>
//           </div>

//           <div className="col-span-2 bg-white p-4 rounded-lg">
//             <label>Thumbnail</label>
//             <input type="file" onChange={handleImage} />
//             {form.preview && (
//               <img src={form.preview} className="mt-3 h-40 rounded object-cover" />
//             )}
//           </div>

//           <div className="col-span-3 bg-white p-4 rounded-lg">
//             <label>Description</label>
//             <textarea className="w-full border p-2"
//               onChange={(e) => handleChange("description", e.target.value)} />
//           </div>

//         </div>

//         <div className="mt-6 flex justify-end">
//           <button
//             onClick={handleSubmit}
//             className="bg-green-600 text-white px-6 py-2 rounded-lg"
//           >
//             {loading ? "Creating..." : "Create Webinar"}
//           </button>
//         </div>

//       </div>
//     </>
//   );
// };

// export default CreateWebinar;


import React, { useState, useEffect } from "react";
import TopHeader from "../../Layout/TopHeader";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Base_Url } from "../../API/Base_Url";
import { toast } from "react-toastify";

const CreateWebinar = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // ✅ edit mode

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    date: "",
    time: "",
    duration: "",
    description: "",
    price: "",
    isPaid: false,
    status: "draft",
    speaker: "",
    maxParticipants: "",
    recordingUrl: "", // ✅ NEW
    thumbnail: null,
    preview: null
  });

  // ================= FETCH FOR EDIT =================
  useEffect(() => {
    if (id) {
      getWebinar();
    }
  }, [id]);

  const getWebinar = async () => {
    try {
      const res = await axios.get(`${Base_Url}/webinars/${id}`);
      const data = res.data.data;

      const dateObj = new Date(data.startTime);

      setForm({
        title: data.title,
        description: data.description,
        duration: data.duration,
        price: data.price,
        isPaid: data.isPaid,
        status: data.status,
        speaker: data.speaker,
        maxParticipants: data.maxParticipants,
        recordingUrl: data.recordingUrl || "",
        date: dateObj.toISOString().split("T")[0],
        time: dateObj.toTimeString().slice(0, 5),
        preview: data.thumbnail
      });

    } catch (err) {
      console.log(err);
    }
  };

  // ================= HANDLERS =================
  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({
        ...form,
        thumbnail: file,
        preview: URL.createObjectURL(file)
      });
    }
  };

  // ================= SUBMIT =================
  const handleSubmit = async () => {
    try {
      setLoading(true);

      const formData = new FormData();

      Object.keys(form).forEach((key) => {
        if (form[key] !== null) {
          formData.append(key, form[key]);
        }
      });

      if (id) {
        // 🔥 UPDATE
        await axios.put(`${Base_Url}/webinars/${id}`, formData);
        toast.success("Webinar Updated 🎉");
      } else {
        // 🔥 CREATE
        await axios.post(`${Base_Url}/webinars`, formData);
        toast.success("Webinar Created 🎉");
      }

      navigate("/webinars");

    } catch (error) {
      console.log(error)
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <TopHeader />

      <div className="p-6 min-h-screen">

        <div className="flex justify-between mb-6">
          <h2 className="text-xl font-semibold">
            {id ? "Edit Webinar" : "Create Webinar"}
          </h2>

          <button
            onClick={() => navigate("/webinars")}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
          >
            View Webinars
          </button>
        </div>

        <div className="grid grid-cols-3 gap-6">

          {/* Title */}
          <div className="col-span-3 bg-white p-4 rounded-lg">
            <label>Webinar Title</label>
            <input
              className="w-full border p-2"
              value={form.title}
              onChange={(e) => handleChange("title", e.target.value)}
            />
          </div>

          {/* Date */}
          <div className="bg-white p-4 rounded-lg">
            <label>Date</label>
            <input
              type="date"
              className="w-full border p-2"
              value={form.date}
              onChange={(e) => handleChange("date", e.target.value)}
            />
          </div>

          {/* Time */}
          <div className="bg-white p-4 rounded-lg">
            <label>Time</label>
            <input
              type="time"
              className="w-full border p-2"
              value={form.time}
              onChange={(e) => handleChange("time", e.target.value)}
            />
          </div>

          {/* Duration */}
          <div className="bg-white p-4 rounded-lg">
            <label>Duration</label>
            <input
              type="number"
              className="w-full border p-2"
              value={form.duration}
              onChange={(e) => handleChange("duration", e.target.value)}
            />
          </div>

          {/* Price */}
          <div className="bg-white p-4 rounded-lg">
            <label>Price</label>
            <input
              type="number"
              className="w-full border p-2"
              value={form.price}
              onChange={(e) => handleChange("price", e.target.value)}
            />
          </div>

          {/* Speaker */}
          <div className="bg-white p-4 rounded-lg">
            <label>Speaker</label>
            <input
              className="w-full border p-2"
              value={form.speaker}
              onChange={(e) => handleChange("speaker", e.target.value)}
            />
          </div>

          {/* Recording URL (ONLY EDIT) */}
          {id && (
            <div className="col-span-3 bg-white p-4 rounded-lg">
              <label>Recording URL</label>
              <input
                className="w-full border p-2"
                placeholder="Paste recording link"
                value={form.recordingUrl}
                onChange={(e) =>
                  handleChange("recordingUrl", e.target.value)
                }
              />
            </div>
          )}

          {/* Thumbnail */}
          <div className="col-span-2 bg-white p-4 rounded-lg">
            <label>Thumbnail</label>
            <input type="file" onChange={handleImage} />

            {form.preview && (
              <img
                src={form.preview}
                className="mt-3 h-40 rounded object-cover"
              />
            )}
          </div>

          {/* Description */}
          <div className="col-span-3 bg-white p-4 rounded-lg">
            <label>Description</label>
            <textarea
              className="w-full border p-2"
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>

        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSubmit}
            className="bg-green-600 text-white px-6 py-2 rounded-lg"
          >
            {loading
              ? id
                ? "Updating..."
                : "Creating..."
              : id
              ? "Update Webinar"
              : "Create Webinar"}
          </button>
        </div>

      </div>
    </>
  );
};

export default CreateWebinar;