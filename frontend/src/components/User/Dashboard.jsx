import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const [mailConfig, setMailConfig] = useState({
    EMAIL_SERVICE: "gmail",
    MAIL_SERVER: "smtp.gmail.com",
    MAIL_PORT: 587,
    MAIL_USE_TLS: true,
    MAIL_USERNAME: "",
    MAIL_PASSWORD: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    fetchUser(token);
    fetchMailConfig(token);
  }, []);

  const fetchUser = async (token) => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUser(response.data);
      setLoading(false);
    } catch (error) {
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  const fetchMailConfig = async (token) => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/mail-config", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data) {
        setMailConfig(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setMailConfig((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");

    try {
      await axios.post(
        "http://127.0.0.1:8000/mail-config",
        mailConfig,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Credentials saved successfully!");
    } catch (error) {
      alert("Failed to save credentials");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (loading)
    return (
      <div style={styles.loaderContainer}>
        <h2>Loading...</h2>
      </div>
    );

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.title}>Mail Dashboard</h1>
          <button style={styles.logoutBtn} onClick={handleLogout}>
            Logout
          </button>
        </div>

        {/* User Section */}
        <div style={styles.userBox}>
          <h3>User Information</h3>
          <p>
            <strong>Email:</strong> {user?.email}
          </p>
          <p>
            <strong>Provider:</strong> {user?.provider}
          </p>
        </div>

        {/* Mail Config */}
        <div style={styles.formBox}>
          <h3>SMTP Mail Configuration</h3>

          <div style={styles.inputGroup}>
            <label>Email Service</label>
            <input
              type="text"
              name="EMAIL_SERVICE"
              value={mailConfig.EMAIL_SERVICE}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label>Mail Server</label>
            <input
              type="text"
              name="MAIL_SERVER"
              value={mailConfig.MAIL_SERVER}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label>Mail Port</label>
            <input
              type="number"
              name="MAIL_PORT"
              value={mailConfig.MAIL_PORT}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label>Mail Username</label>
            <input
              type="email"
              name="MAIL_USERNAME"
              value={mailConfig.MAIL_USERNAME}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          {/* Password */}
          <div style={styles.inputGroup}>
            <label>Mail Password / App Password</label>

            <div style={styles.passwordWrapper}>
              <input
                type={showPassword ? "text" : "password"}
                name="MAIL_PASSWORD"
                value={mailConfig.MAIL_PASSWORD}
                onChange={handleChange}
                style={styles.passwordInput}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={styles.eyeBtn}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* TLS */}
          <div style={styles.checkbox}>
            <input
              type="checkbox"
              name="MAIL_USE_TLS"
              checked={mailConfig.MAIL_USE_TLS}
              onChange={handleChange}
            />
            <span>Use TLS Security</span>
          </div>

          {/* Save Button */}
          <button style={styles.saveBtn} onClick={handleSave}>
            Save Credentials
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "30px",
    fontFamily: "Arial, sans-serif",
  },

  card: {
    width: "100%",
    maxWidth: "750px",
    background: "#fff",
    borderRadius: "20px",
    boxShadow: "0 15px 35px rgba(0,0,0,0.15)",
    padding: "35px",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "25px",
  },

  title: {
    margin: 0,
    color: "#333",
  },

  logoutBtn: {
    background: "#ff4d4f",
    color: "white",
    border: "none",
    padding: "10px 16px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },

  userBox: {
    background: "#f8f9fc",
    padding: "20px",
    borderRadius: "12px",
    marginBottom: "25px",
    border: "1px solid #eee",
  },

  formBox: {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },

  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },

  input: {
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    fontSize: "15px",
    outline: "none",
  },

  passwordWrapper: {
    display: "flex",
    alignItems: "center",
    border: "1px solid #ccc",
    borderRadius: "10px",
    overflow: "hidden",
  },

  passwordInput: {
    flex: 1,
    padding: "12px",
    border: "none",
    outline: "none",
    fontSize: "15px",
  },

  eyeBtn: {
    padding: "12px 16px",
    border: "none",
    background: "#f1f1f1",
    cursor: "pointer",
    fontWeight: "bold",
  },

  checkbox: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontSize: "15px",
  },

  saveBtn: {
    background: "#4f46e5",
    color: "white",
    border: "none",
    padding: "14px",
    borderRadius: "10px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "10px",
  },

  loaderContainer: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};

export default Dashboard;