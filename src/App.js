import React, { useState } from "react";

import Connect from "./components/Connect";
import AddToken from "./components/AddToken";
import TableContent from "./components/TableContent";
import LockToken from "./components/LockToken";
import "./App.css";
import "./components/Connect.css";
import "bootstrap/dist/css/bootstrap.min.css";
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
      {/* <AddToken stateData={state} /> */}
      <LockToken />
      <TableContent />
      <br></br>
      <button onClick={getState}>GetState</button>
    </div>
  );
}

export default App;
