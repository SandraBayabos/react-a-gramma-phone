import React from "react";
import { Router, Link, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import UserProfilePage from "./pages/UserProfilePage";
import "./App.css";

function App() {
  return (
    <div
      className="App"
      style={{ height: "100vh", width: "100vw", padding: "0", margin: "0" }}
    >
      <Navbar />

      {/* USING REACT ROUTER TO LINK TO SPECIFIC PAGES */}
      <div>
        <Link to="/">Home</Link>
        <Link to="/users/1">My Profile</Link>

        <Route exact path="/" component={HomePage} />
        <Route path="/users/:id" component={UserProfilePage} />
      </div>
    </div>
  );
}

export default App;
