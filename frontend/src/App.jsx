import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
 
function App() {
  const[number,setnumber]=useState("");
  const[result,setresult]=useState(null);
  const sendnumber=async () => {
    
    const response=await fetch("http://127.0.0.1:8000/double",{
      method:"POST",
      headers:{
        "content-type":"application/json"
      },
      body:JSON.stringify({number:Number(number)})
    });
    const data =await response.json();
    setresult(data.result);
  };
  return(<> <Navbar/>
  <Hero/>
  <Footer/>
    <div className="container">

      <h1>testing integration</h1>
      <input type="number" value={number}
      onChange={(e)=>setnumber(e.target.value)}
      placeholder="enet no"/>
      <button onClick={sendnumber}>send</button>
      {result!==null &&(<h2>result form backend
        {result}
      </h2>)}
    </div></>
  )
  
}

export default App
