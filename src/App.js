import "./App.css";
import "./components/connect.css";
// import { ethers } from "ethers";
import React, { useState } from "react";
import Connect from "./components/Connect";
import Transaction from "./components/Transaction";
const tokenAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const lockAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
function App() {
  const [state, setState] = useState({
    tokens: 0,
    unlockTime: 0,
    tokenContract: null,
    lockContract: null,
    account: null,
    provider: null,
    signer: null,
    connected: false,
  });
  const handleChange = (event) => {
    setState({ ...state, [event.target.id]: event.target.value });
  };
  function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }
  async function lockToken() {
    let beforeBalance = await state.tokenContract.balanceOf(state.account);
    console.log("Your Balance before Lock:", parseInt(beforeBalance._hex, 16));
    if (state.tokens <= parseInt(beforeBalance._hex, 16)) {
      await state.lockContract.lockToken(
        tokenAddress,
        state.tokens,
        state.unlockTime
      );
      await state.tokenContract.transfer(lockAddress, state.tokens);
    } else {
      console.log("Amount should be less than balance");
    }
    sleep(15000);
    let afterBalance = await state.tokenContract.balanceOf(state.account);
    let contractTokenBalance = await state.lockContract.tokenBalanceOf(
      tokenAddress
    );
    console.log("Your Balance after Lock:", parseInt(afterBalance._hex, 16));
    console.log(
      "Total Token in Contract:",
      parseInt(contractTokenBalance._hex, 16)
    );
  }
  function getState() {
    console.log(state);
  }
  async function withdrawToken() {}
  const walletBalance = async () => {
    const b = await state.provider.getBalance(state.account);
    console.log(b);
    console.log(state.account);
    return b;
  };
  return (
    <>
      <Connect stateData={state} editStateData={setState} />
      <br />
      {/* <Transaction contract={state.lockContract} /> */}
      <div className="App">
        <div className="addToken">
          Tokens:
          <input
            type="number"
            id="tokens"
            value={state.tokens}
            onChange={(e) => handleChange(e)}
          ></input>
          UnlockTime:
          <input
            type="number"
            id="unlockTime"
            value={state.unlockTime}
            onChange={(e) => handleChange(e)}
          ></input>
          <button onClick={lockToken}>Add</button>
        </div>
        <div className="withdrawToken">
          <button onClick={withdrawToken}>withdrawToken</button>
        </div>
        <button onClick={getState}>getState</button>
        <span>Balance :{walletBalance}</span>
      </div>
    </>
  );
}

export default App;
