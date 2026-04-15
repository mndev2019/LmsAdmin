import React, { useEffect, useState } from "react";
import TopHeader from "../../Layout/TopHeader";
import axios from "axios";
import { Base_Url } from "../../API/Base_Url";
import { toast } from "react-toastify";
import { MdDelete, MdModeEdit } from "react-icons/md";

const CreateWhatsappCommunity = () => {
    const [formData, setFormData] = useState({ title: "", link: "" });
    const [groups, setGroups] = useState([{ name: "", link: "" }]);
    const [community, setCommunity] = useState(null);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleGroupChange = (index, key, value) => {
        const updated = [...groups];
        updated[index][key] = value;
        setGroups(updated);
    };

    const addGroup = () => setGroups([...groups, { name: "", link: "" }]);

    const removeGroup = (index) => {
        setGroups(groups.filter((_, i) => i !== index));
    };

    // ✅ CREATE / UPDATE
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setSaving(true);

            if (isEdit && community?._id) {
                await axios.put(`${Base_Url}/community/${community._id}`, {
                    title: formData.title,
                    link: formData.link,
                    groups
                });
                toast.success("Updated Successfully ✅");
            } else {
                await axios.post(`${Base_Url}/community`, {
                    title: formData.title,
                    link: formData.link,
                    groups
                });
                toast.success("Community Created ✅");
            }

            resetForm();
            fetchCommunity();

        } catch (err) {
            console.log(err)
            toast.error("Something went wrong");
        } finally {
            setSaving(false);
        }
    };

    const handleEdit = () => {
        setFormData({
            title: community.title,
            link: community.link
        });

        setGroups(
            community.groups?.length
                ? community.groups
                : [{ name: "", link: "" }]
        );

        setIsEdit(true);
        toast.info("Edit mode enabled ✏️");
    };

    const handleDelete = async () => {
        if (!window.confirm("Delete this community?")) return;

        try {
            await axios.delete(`${Base_Url}/community/${community._id}`);
            toast.success("Deleted 🗑️");
            setCommunity(null);
            resetForm();
        } catch {
            toast.error("Delete failed");
        }
    };

    const resetForm = () => {
        setFormData({ title: "", link: "" });
        setGroups([{ name: "", link: "" }]);
        setIsEdit(false);
    };

    const fetchCommunity = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${Base_Url}/community`);
            setCommunity(res.data.data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCommunity();
    }, []);

    return (
        <>
            <TopHeader />

            <div className="min-h-screen bg-indigo-50 p-6">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">

                    {/* CREATE CARD */}
                    <div className="bg-white shadow-xl rounded-3xl p-8">
                        <h2 className="text-2xl font-bold mb-4">
                            {isEdit ? "Edit Community" : "Create Community"}
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-5">

                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Community Title"
                                className="w-full border p-3 rounded-xl"
                                required
                            />

                            <input
                                type="text"
                                name="link"
                                value={formData.link}
                                onChange={handleChange}
                                placeholder="Community Main Link"
                                className="w-full border p-3 rounded-xl"
                            />

                            {/* GROUPS */}
                            <div className="space-y-3">
                                {groups.map((g, index) => (
                                    <div key={index} className="grid grid-cols-2 gap-2">
                                        <input
                                            type="text"
                                            placeholder="Group Name"
                                            value={g.name}
                                            onChange={(e) => handleGroupChange(index, "name", e.target.value)}
                                            className="border p-2 rounded-lg"
                                        />

                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                placeholder="Group Link"
                                                value={g.link}
                                                onChange={(e) => handleGroupChange(index, "link", e.target.value)}
                                                className="border p-2 rounded-lg w-full"
                                            />

                                            {groups.length > 1 && (
                                                <button onClick={() => removeGroup(index)} type="button">✖</button>
                                            )}
                                        </div>
                                    </div>
                                ))}

                                <button type="button" onClick={addGroup} className="text-indigo-600 font-medium">
                                    + Add Group
                                </button>
                            </div>

                            <button className="w-full bg-indigo-600 text-white py-3 rounded-xl">
                                {saving ? "Saving..." : isEdit ? "Update" : "Create"}
                            </button>
                        </form>
                    </div>

                    {/* PREVIEW */}
                    <div className="bg-white shadow-xl rounded-3xl p-8">
                        {loading ? (
                            <p>Loading...</p>
                        ) : community ? (
                            <div className="relative p-6 bg-indigo-100 rounded-2xl">

                                <div className="absolute top-3 right-3 flex gap-2">
                                    <button onClick={handleEdit} className="bg-white p-2 rounded-full shadow">
                                        <MdModeEdit />
                                    </button>
                                    <button onClick={handleDelete} className="bg-white p-2 rounded-full shadow text-red-500">
                                        <MdDelete />
                                    </button>
                                </div>

                                <h3 className="text-xl font-bold">{community.title}</h3>

                                {/* {community.link && (
                                    <a href={community.link} target="_blank" className="block underline text-indigo-700 mt-1">
                                        {community.link}
                                    </a>
                                )}

                                <div className="mt-4 space-y-2">
                                    {community.groups?.map((g, i) => (
                                        <div key={i} className="bg-white p-3 rounded-lg">
                                            <p className="font-semibold">{g.name}</p>
                                            <a href={g.link} target="_blank" className="text-blue-600 text-sm break-all">
                                                {g.link}
                                            </a>
                                        </div>
                                    ))}
                                </div> */}

                                {community.link && (
                                    <a
                                        href={community.link}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-block mt-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg shadow hover:bg-indigo-700 transition duration-200"
                                    >
                                        Visit Community
                                    </a>
                                )}

                                <div className="mt-4 space-y-3">
                                    {community.groups?.map((g, i) => (
                                        <div key={i} className="bg-white p-3 rounded-lg shadow-sm">
                                            <p className="font-semibold">{g.name}</p>

                                            <a
                                                href={g.link}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="inline-block mt-2 px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition duration-200 break-all"
                                            >
                                                Open Link
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <p>No data</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreateWhatsappCommunity;
