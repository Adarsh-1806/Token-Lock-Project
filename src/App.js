import React, { useState } from "react";

import Connect from "./components/Connect";
import TableContent from "./components/TableContent";
import LockToken from "./components/LockToken";
import "./App.css";
import "./components/Connect.css";
import "bootstrap/dist/css/bootstrap.min.css";
import GetContract from "./components/GetContract";
function App() {
  return (
    <div className="main-body">
      <Connect />
      <br></br>
      {/* <button onClick={getState}>GetState</button> */}
    </div>
  );
}

export default App;
