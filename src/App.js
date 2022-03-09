import React from "react";
import "./App.css";
import "./components/Connect.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Connect from "./components/Connect";
import ContractData from "./components/ContractData";
import TableContent from "./components/TableContent";

function App() {
  return (
    <div className="main-body">
      <Connect />
      <ContractData />
      <TableContent />
    </div>
  );
}

export default App;
