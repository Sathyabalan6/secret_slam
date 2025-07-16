import React from "react";
import Navbar from "../component/Navbar";
import "./generator.css";

export default function Generator() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
  };

  const [namingMethod, setNamingMethod] = React.useState("dno1");
  const [showNameOptions, setShowNameOptions] = React.useState(false);

  return (
    <div className="generator-container">
      <Navbar />

      <div className="form-wrapper">
        <div className="form-header">
          <h1 className="form-title">Slam Generator</h1>
          <p className="form-subtitle">
            Create your own slam space to interact.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="generator-form">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              placeholder="Enter slam title"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              rows="3"
              placeholder="Enter slam description"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="title">Slam count</label>
            <input
              type="text"
              id="title"
              placeholder="Enter slam count"
              required
            />
          </div>

          {/* <div className="form-group">
            <label htmlFor="naming">Select a naming method</label>
            <select
              id="naming"
              value={namingMethod}
              onChange={(e) => {
                setNamingMethod(e.target.value);
                setShowNameOptions(e.target.value === "name1");
              }}
            >
              <option value="name1">Name</option>
              <option value="dno1">DNO</option>
            </select>
          </div>

          {namingMethod === "dno1" && (
            <>
              <div className="form-group">
                <label htmlFor="startSequence">Starting Sequence</label>
                <input
                  type="number"
                  id="startSequence"
                  placeholder="Enter starting number"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="endSequence">Ending Sequence</label>
                <input
                  type="number"
                  id="endSequence"
                  placeholder="Enter ending number"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="members">Number of Members</label>
                <input
                  type="number"
                  id="members"
                  placeholder="Enter number of members"
                  required
                />
              </div>
            </>
          )}

          {namingMethod === "name1" && (
            <div
              className="form-group radio-group"
              style={{ gridColumn: "span 2" }}
            >
              <label>
                <input type="radio" name="nameOption" value="anonymous" />
                Anonymous
              </label>
              <label>
                <input type="radio" name="nameOption" value="selectDocument" />
                Select Document
              </label>
            </div>
          )} */}

          <div className="submit-group">
            <button type="submit" className="submit-button">
              Create Slam
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
