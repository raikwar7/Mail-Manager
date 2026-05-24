import { useState } from "react";
import { Routes, Route } from "react-router-dom";
 import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import AdminDashboard from "./components/Admin/adminDashboard";
import Login from "./components/Login/Login";
import LoginSucess from "./components/Login/LoginSucess";
import Dashboard from "./components/User/Dashboard";
import MailBox from "./components/Mails/mailBox";
import SentMail from "./components/Mails/MailView/SentMailView";
import ReceivedMail from "./components/Mails/MailView/ReceivedMailView";
import ReceivedFilteredMail from "./components/User/recievedMailsFiltered";
import SentFilteredMail from "./components/User/sentMailsFiltered";
import MailContent from "./components/User/sendMail";
import TemplateManager from "./components/User/mailTemplate";
// 1. Import at the top
import MailComposer from "./components/User/sendAmail";

  function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mailTemplate" element={<TemplateManager/>}/>
        <Route path="/login-success" element={<LoginSucess />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/mail" element={<MailBox/>}/>
       <Route path="/sendMail" element={<MailContent/>}/>
        <Route path="/mailComposer" element={<MailComposer />} />
       <Route path="/mailDashboard/recieved/" element={<ReceivedFilteredMail/>}/>
       <Route path="/mailDashboard/sent/" element={<SentFilteredMail/>}/>



      </Routes>

      <Footer />
    </>
  );
}

export default App;