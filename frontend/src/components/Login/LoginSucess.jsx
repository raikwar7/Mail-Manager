import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function LoginSucess() {
  const navigate = useNavigate();
  const hasRun = useRef(false); // 👈 prevents double execution

  useEffect(() => {
    if (hasRun.current) return;   // stop second run
    hasRun.current = true;

    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    console.log("TOKEN FROM URL:", token);

    if (token) {
      localStorage.setItem("token", token);
      console.log("TOKEN SAVED");
        

      navigate("/dashboard");
    } else {
      console.log("NO TOKEN FOUND");
      navigate("/login");
    }
  }, [navigate]);

  return <div>Logging you in...</div>;
}

export default LoginSucess;