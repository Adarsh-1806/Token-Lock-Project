import React, { useState } from "react";

import Connect from "./components/Connect";
import TableContent from "./components/TableContent";
import LockToken from "./components/LockToken";
import "./App.css";
import "./components/Connect.css";
import "bootstrap/dist/css/bootstrap.min.css";
import GetContract from "./components/GetContract";
function App() {
  const [state, setState] = useState({
    isConnected: false,
  });
  function getState() {
    console.log(state);
  }
  return (
    <div className="main-body">
      <Connect stateData={state} editStateData={setState} />
      <LockToken stateData={state} editStateData={setState} />
      {/* <GetContract stateData={state} editStateData={setState} /> */}
      <TableContent stateData={state} editStateData={setState} />
      <br></br>
      <button onClick={getState}>GetState</button>
    </div>
  );
}

export default App;
