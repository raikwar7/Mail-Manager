import React, { use, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState(null);
   
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
     


    // 🚨 If no token → go to login immediately
    if (!token) {
      navigate("/login");
      return;
    }

    fetchUser(token);
  }, []);

  const fetchUser = async (token) => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/users/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(response.data);
       
      setLoading(false);
     
    } catch (error) {
      console.error("Error fetching user:", error);

      // If token invalid → clear and redirect
      localStorage.removeItem("token");
      navigate("/login");
    }
  };
 
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (loading) return <h2>Loading...</h2>;

  return (
    <div style={{ padding: "40px" }}>
      <h2>User Dashboard</h2>

      <div style={{ marginTop: "20px" }}>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Provider:</strong> {user.provider}</p>

        <button
          onClick={handleLogout}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            cursor: "pointer"
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;