import React, { useState, useEffect } from "react";
import axios from "axios";

const TemplateManager = () => {
    const API_URL = "http://127.0.0.1:8000/templates";

    const [templates, setTemplates] = useState([]);
    const [selectedId, setSelectedId] = useState(null);

    const [title, setTitle] = useState("");
    const [subject, setSubject] = useState("");
    const [body, setBody] = useState("");

    const [loading, setLoading] = useState(false);

    // ✅ Fetch all templates
    const fetchTemplates = async () => {
        try {
            const res = await axios.get(`${API_URL}/show_templates`);
            setTemplates(res.data);
        } catch (err) {
            console.error("Error fetching templates:", err);
        }
    };

    useEffect(() => {
        fetchTemplates();
    }, []);

    // ✅ Select template
    const handleSelect = (template) => {
        setSelectedId(template.id);
        setTitle(template.title || "");
        setSubject(template.subject || "");
        setBody(template.body || "");
    };

    // ✅ Reset form
    const handleNew = () => {
        setSelectedId(null);
        setTitle("");
        setSubject("");
        setBody("");
    };

    // ✅ Save (Create / Update)
    const handleSave = async () => {
        if (!title || !subject || !body) {
            alert("All fields are required!");
            return;
        }

        setLoading(true);

        try {
            if (selectedId) {
                // ✅ UPDATE (FIXED)
                await axios.put(`${API_URL}/show_templates/${selectedId}`, {
                    title,
                    subject,
                    body,
                });
            } else {
                // ✅ CREATE
                await axios.post(`${API_URL}/create_new_template`, {
                    title,
                    subject,
                    body,
                });
            }

            await fetchTemplates();
            handleNew();

        } catch (err) {
            console.error("Error saving template:", err.response?.data || err);
        }

        setLoading(false);
    };

    // ✅ Delete
    const handleDelete = async (id) => {
        if (!window.confirm("Delete this template?")) return;

        try {
            await axios.delete(`${API_URL}/${id}`);
            await fetchTemplates();

            if (selectedId === id) {
                handleNew();
            }

        } catch (err) {
            console.error("Error deleting template:", err);
        }
    };

    return (
        <div className="flex h-screen font-sans">

            {/* Sidebar */}
            <div className="w-1/3 bg-gray-100 p-4 border-r overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Templates</h2>
                    <button
                        onClick={handleNew}
                        className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                        + New
                    </button>
                </div>

                {templates.map((t) => (
                    <div
                        key={t.id}
                        className={`p-3 mb-2 rounded cursor-pointer ${
                            selectedId === t.id ? "bg-blue-200" : "bg-white"
                        }`}
                        onClick={() => handleSelect(t)}
                    >
                        <div className="flex justify-between">
                            <div>
                                <h3 className="font-medium">{t.title}</h3>
                                <p className="text-sm text-gray-600 truncate">
                                    {t.subject}
                                </p>
                            </div>

                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDelete(t.id);
                                }}
                                className="text-red-500"
                            >
                                ✕
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Editor */}
            <div className="w-2/3 p-6">
                <h2 className="text-2xl font-semibold mb-4">
                    {selectedId ? "Edit Template" : "Create Template"}
                </h2>

                {/* Title */}
                <label className="block mb-1 font-medium">Title</label>
                <input
                    type="text"
                    className="w-full p-2 border rounded mb-4"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                {/* Subject */}
                <label className="block mb-1 font-medium">Subject</label>
                <input
                    type="text"
                    className="w-full p-2 border rounded mb-4"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                />

                {/* Body */}
                <label className="block mb-1 font-medium">Body</label>
                <textarea
                    className="w-full p-2 border rounded mb-4 h-40"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                />

                {/* Buttons */}
                <div className="flex gap-3">
                    <button
                        onClick={handleSave}
                        disabled={loading}
                        className="bg-green-500 text-white px-4 py-2 rounded"
                    >
                        {loading ? "Saving..." : "Save"}
                    </button>

                    <button
                        onClick={handleNew}
                        className="bg-gray-400 text-white px-4 py-2 rounded"
                    >
                        Clear
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TemplateManager;