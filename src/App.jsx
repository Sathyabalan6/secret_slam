import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import NextPage from "./pages/Generator";
import Link from "./pages/Link";
import './App.css';
import UserLogin from "./pages/UserLogin";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/Generator" element={<NextPage />} />
        <Route path="/link" element={< Link/>} />
        <Route path="/userlogin" element={<UserLogin />} />
      </Routes>
    </Router>
  );
}

export default App;
