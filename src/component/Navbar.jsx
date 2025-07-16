import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            backgroundColor: "#eee",
            padding: "10px 20px",
            zIndex: 1000,
            borderBottom: "1px solid #ccc"
        }}>
            <Link to="/">Home </Link>
            <Link to="/about" style={{ marginRight: "10px" }}>About</Link>
            <Link to="/contact">Contact</Link>
        </nav>
    );
}
