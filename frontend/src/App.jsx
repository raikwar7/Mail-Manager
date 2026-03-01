import { useState } from "react";
import { Routes, Route } from "react-router-dom";
 import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import AdminDashboard from "./components/Admin/adminDashboard";
import Login from "./components/Login/Login";
import LoginSucess from "./components/Login/LoginSucess";
import Dashboard from "./components/User/Dashboard";
function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login-success" element={<LoginSucess />} />
        <Route path="/dashboard" element={<Dashboard />} />


      </Routes>

      <Footer />
    </>
  );
}

export default App;