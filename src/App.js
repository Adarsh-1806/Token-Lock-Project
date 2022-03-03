import "./App.css";
import "./components/connect.css";
import React, { useState } from "react";
import Connect from "./components/Connect";
import Transaction from "./components/Transaction";

function App() {
  const [state, setState] = useState({
    connected: false,
  });
  function showState() {
    console.log(state);
  }
  return (
    <>
      <Connect stateData={state} editStateData={setState} />
      {/* <Transaction /> */}
      <button onClick={showState}>GetState</button>
    </>
  );
}

export default App;
