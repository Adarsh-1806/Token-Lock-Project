import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import "./App.css";
import "./components/Connect.css";
import Home from "./components/Home";
import Lockup from "./components/Lockup";
import About from "./components/About";
import ClaimToken from "./components/ClaimToken";
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/lockup" element={<Lockup />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/claimtoken" element={<ClaimToken />} />
      </Routes>
    </Router>
  );
}

export default App;
