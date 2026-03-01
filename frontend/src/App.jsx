import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGoogleLogin = () => {
    try {
      if (!API_BASE_URL) {
        setError("API base URL not configured.");
        return;
      }

      setLoading(true);
      setError("");

      const redirectUrl = `${API_BASE_URL}/auth/google/login`;
      window.location.assign(redirectUrl);

    } catch (err) {
      console.error("OAuth Error:", err);
      setError("Login failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <Hero />

      <div className="container">
        <h1>Login to Continue</h1>

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="google-button"
        >
          {loading ? "Redirecting..." : "Sign in with Google"}
        </button>

        {error && <p className="error">{error}</p>}
      </div>

      <Footer />
    </>
  );
}

export default App;