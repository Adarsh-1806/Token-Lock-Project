import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import "./App.css";
import "./components/Connect.css";
import Home from "./components/Home";
import Lockup from "./components/Lockup";
import About from "./components/About";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/lockup" element={<Lockup />} />
        <Route exact path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
