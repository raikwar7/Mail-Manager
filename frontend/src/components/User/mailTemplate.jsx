import React, { useState, useEffect } from "react";
import axios from "axios";

const TemplateManager = () => {
    const [templates, setTemplates] = useState([]);
    const [selectedTemplate, setSelectedTemplate] = useState(null);

    const [title, setTitle] = useState("");
    const [subject, setSubject] = useState("");
    const [body, setBody] = useState("");

    const API_URL = "http://localhost:8000"; // change in prod

    // 📡 Fetch templates from backend
    useEffect(() => {
        const fetchTemplates = async () => {
            try {
                const res = await axios.get(`${API_URL}/get/mails/`);
                setTemplates(res.data);
            } catch (error) {
                console.error("Error fetching templates:", error);
            }
        };

        fetchTemplates();
    }, []);

    // 🔄 Select template
    const handleSelectTemplate = (template) => {
        setSelectedTemplate(template.id);
        setTitle(template.title || template.heading || "");
        setSubject(template.subject);
        setBody(template.body);
    };

    // 💾 Save template (create/update)
    const handleSave = async () => {
        if (!title || !subject || !body) {
            alert("All fields required!");
            return;
        }

        try {
            if (selectedTemplate) {
                // UPDATE
                await axios.put(
                    `${API_URL}/templates/${selectedTemplate}`,
                    { title, subject, body }
                );
            } else {
                // CREATE
                await axios.post(`${API_URL}/templates`, {
                    title,
                    subject,
                    body
                });
            }

            // 🔁 Refresh list
            const res = await axios.get(`${API_URL}/get/mails/`);
            setTemplates(res.data);

            // reset
            handleNew();

        } catch (error) {
            console.error("Error saving template:", error);
        }
    };

    // 🆕 New template
    const handleNew = () => {
        setSelectedTemplate(null);
        setTitle("");
        setSubject("");
        setBody("");
    };

    return (
        <div className="flex h-screen">

            {/* 📚 Sidebar */}
            <div className="w-[30%] bg-gray-100 p-4 border-r overflow-y-auto">
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
                        onClick={() => handleSelectTemplate(t)}
                        className={`p-3 mb-2 rounded cursor-pointer ${
                            selectedTemplate === t.id
                                ? "bg-blue-200"
                                : "bg-white"
                        }`}
                    >
                        <h3 className="font-medium">
                            {t.title || t.heading}
                        </h3>
                        <p className="text-sm text-gray-600 truncate">
                            {t.subject}
                        </p>
                    </div>
                ))}
            </div>

            {/* ✍️ Editor */}
            <div className="w-[70%] p-6">
                <h2 className="text-2xl font-semibold mb-4">
                    {selectedTemplate ? "Edit Template" : "Create Template"}
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

                {/* Actions */}
                <div className="flex gap-3">
                    <button
                        onClick={handleSave}
                        className="bg-green-500 text-white px-4 py-2 rounded"
                    >
                        Save
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