import { useState } from "react";
const Login=()=>{
    const[Loading,setLoading]=useState(false);
    const googleLogin=()=>{
        try{
            setLoading(true);
            const baseUrl=import.meta.env.VITE_API_BASE_URL;
            const redirectUrl=`${baseUrl}/auth/google/login`;
            window.location.assign(redirectUrl);

        }
        catch(error){
            console.error("oauth filed",error)
            setLoading(false);

        }
    };
    return(
        <div className="login-container">
            <button
            onClick={googleLogin}
            disabled={Loading}
            className="google-button">
                {Loading? "redirecting ...":"sign in with google"}
            </button>
        </div>
    );
    
 
};
export default Login;