import React from "react";
import Navbar from "../component/Navbar";
import { useNavigate } from "react-router-dom";
import "./homepage.css";

export default function Homepage() {
  const navigate = useNavigate();

  return (
    <div className="homepage-container">
      <Navbar />
      <h1 className="homepage-title">Slam Book</h1>
      <button className="generator-button" onClick={() => navigate('/Generator')}>
        Generator
      </button>
    </div>
  );
}
