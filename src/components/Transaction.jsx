import React from "react";
import { ethers } from "ethers";

const Transaction = (props) => {
  //   const ids = await props.stateData.lockContract.getAllIds;
  async function allTransactions() {
    const tnxs = await props.contract.getAllIds;
    console.log(tnxs);
  }
  return <button onClick={allTransactions}>Transactions</button>;
};
export default Transaction;
