import { useState, useEffect } from "react";

export default function MailComposer() {
  const [titles, setTitles] = useState([]);
  const [selectedTitle, setSelectedTitle] = useState("");

  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [to, setTo] = useState("");

  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);

  const [message, setMessage] = useState("");

  // AI states
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  useEffect(() => {
    fetchTitles();
  }, []);

  // ----------------------------
  // FETCH TEMPLATES
  // ----------------------------
  const fetchTitles = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:8000/mail/templates");

      if (!res.ok) throw new Error();

      const data = await res.json();
      setTitles(data || []);
    } catch {
      setMessage("Failed to load template titles");
    } finally {
      setLoading(false);
    }
  };

  // ----------------------------
  // LOAD TEMPLATE
  // ----------------------------
  const loadTemplate = async (title) => {
    if (!title) return;

    try {
      setLoading(true);
      setSelectedTitle(title);

      const res = await fetch(
        `http://localhost:8000/mail/template/${encodeURIComponent(title)}`
      );

      if (!res.ok) throw new Error();

      const data = await res.json();

      setSubject(data.subject || "");
      setBody(data.body || "");
    } catch {
      setMessage("Failed to load template");
    } finally {
      setLoading(false);
    }
  };

  // ---------------------------
  // AI EMAIL GENERATOR
  // ----------------------------
  const generateMail = async () => {
    if (!aiPrompt.trim()) {
      setMessage("Please enter AI prompt");
      return;
    }

    try {
      setAiLoading(true);
      setMessage("");

      const res = await fetch("http://localhost:8000/ai/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: aiPrompt,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detail || "Failed to generate email");
      }

      const text = data.generated_mail;

      // Extract subject/body
      const subjectMatch = text.match(/Subject:(.*)/i);
      const bodyMatch = text.match(/Body:([\s\S]*)/i);

      if (subjectMatch) {
        setSubject(subjectMatch[1].trim());
      }

      if (bodyMatch) {
        setBody(bodyMatch[1].trim());
      }

      setMessage("AI email generated successfully");
    } catch (err) {
      setMessage(err.message);
    } finally {
      setAiLoading(false);
    }
  };

  // ----------------------------
  // SEND MAIL
  // ----------------------------
  const sendMail = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setMessage("Please login first");
      return;
    }

    try {
      setSending(true);
      setMessage("");

      const res = await fetch("http://127.0.0.1:8000/mail/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          to,
          title: selectedTitle,
          subject,
          body,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detail || "Failed to send mail");
      }

      setMessage("Mail sent successfully");

      // clear after send
      setTo("");
      setSubject("");
      setBody("");
      setAiPrompt("");
      setSelectedTitle("");
    } catch (err) {
      setMessage(err.message);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6">
      <div className="max-w-3xl mx-auto bg-zinc-900 rounded-2xl shadow-xl p-6 space-y-6">
        <h1 className="text-2xl font-semibold">Mail Composer</h1>

        {/* TEMPLATE SELECT */}
        <div className="space-y-2">
          <label className="text-sm text-zinc-300">Select Template</label>
          <select
            className="w-full rounded-xl bg-zinc-800 p-3"
            value={selectedTitle}
            onChange={(e) => loadTemplate(e.target.value)}
            disabled={loading}
          >
            <option value="">Choose template</option>
            {titles.map((title) => (
              <option key={title} value={title}>
                {title}
              </option>
            ))}
          </select>
        </div>

        {/* TO FIELD */}
        <div className="space-y-2">
          <label className="text-sm text-zinc-300">To</label>
          <input
            className="w-full rounded-xl bg-zinc-800 p-3"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            placeholder="recipient@example.com"
          />
        </div>

        {/* AI EMAIL ASSISTANT */}
        <div className="space-y-2 border border-zinc-700 rounded-xl p-4">
          <label className="text-sm text-zinc-300">AI Email Assistant</label>

          <textarea
            rows={3}
            className="w-full rounded-xl bg-zinc-800 p-3"
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
            placeholder="Example: Write apology email for delayed project delivery"
          />

          <button
            onClick={generateMail}
            disabled={aiLoading}
            className="w-full rounded-xl bg-blue-500 text-white p-3 disabled:opacity-50"
          >
            {aiLoading ? "Generating..." : "Generate Email with AI"}
          </button>
        </div>

        {/* SUBJECT */}
        <div className="space-y-2">
          <label className="text-sm text-zinc-300">Subject</label>
          <input
            className="w-full rounded-xl bg-zinc-800 p-3"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>

        {/* BODY */}
        <div className="space-y-2">
          <label className="text-sm text-zinc-300">Body</label>
          <textarea
            rows={10}
            className="w-full rounded-xl bg-zinc-800 p-3"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </div>

        {/* SEND */}
        <button
          onClick={sendMail}
          disabled={sending || loading}
          className="w-full rounded-xl bg-white text-black font-medium p-3 disabled:opacity-50"
        >
          {sending ? "Sending..." : "Send Mail"}
        </button>

        {/* MESSAGE */}
        {message && (
          <div className="text-sm text-zinc-300 border border-zinc-700 rounded-xl p-3">
            {message}
          </div>
        )}
      </div>
    </div>
  );
}