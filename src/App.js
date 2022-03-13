import React from "react";
import "./App.css";
import "./components/Connect.css";
import Connect from "./components/Connect";
import ContractData from "./components/ContractData";
import TableContent from "./components/TableContent";

function App() {
  return (
    <>
      <Connect />
      <ContractData />
      <TableContent />
    </>
  );
}

export default App;
