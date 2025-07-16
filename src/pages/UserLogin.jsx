import React from "react";
import Navbar from "../component/Navbar";
import "./UserLogin.css";

export default function UserLogin() {
  const [formData, setFormData] = React.useState({
    nameOrReg: "",
    email: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User Login Data:", formData);
    // Add your backend API call here
  };

  return (
    <div className="generator-container">
      <Navbar />

      <div className="form-wrapper">
        <div className="form-header">
          <h1 className="form-title">User Login</h1>
          <p className="form-subtitle">
            Enter your details to join the slam book.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="generator-form">
          <div className="form-group">
            <label htmlFor="nameOrReg">Name or Reg No</label>
            <input
              type="text"
              id="nameOrReg"
              name="nameOrReg"
              placeholder="Enter name or registration number"
              value={formData.nameOrReg}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email ID</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="submit-group">
            <button type="submit" className="submit-button">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
