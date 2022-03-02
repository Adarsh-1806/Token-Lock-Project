// import logo from './logo.svg';
import "./App.css";
// import React, { useEffect } from "react";
// import { useState } from "react";
import { ethers } from "ethers";
import React, { Component } from "react";
import Lock from "./artifacts/contracts/Lock.sol/Lock.json";
import Token from "./artifacts/contracts/Token.sol/Token.json";
// import { render } from "@testing-library/react";
const tokenAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const lockAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tokens: 0,
      unlockTime: 0,
      provider: null,
      signer: null,
      tokenContract: null,
      lockContract: null,
    };
  }
  connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert("Please install MetaMask!");
        return;
      }
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const tokenContract = new ethers.Contract(
        tokenAddress,
        Token.abi,
        signer
      );
      const lockContract = new ethers.Contract(lockAddress, Lock.abi, signer);
      const [account] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("account", account);
      this.setState({
        provider: provider,
        signer: signer,
        tokenContract: tokenContract,
        lockContract: lockContract,
      });
    } catch (error) {
      console.log(error);
    }
  };
  getDetails = async () => {
    const token = this.state.tokenContract;
    console.log(await token.name());
  };
  handleChange = (event) => {
    event.persist();
    this.setState({ ...this.state, [event.target.id]: event.target.value });
  };

  sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }

  async lockToken() {
    const [account] = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    // console.log(account);
    let beforeBalance = await this.state.tokenContract.balanceOf(account);
    console.log("Your Balance before Lock:", parseInt(beforeBalance._hex, 16));
    if (this.state.tokens <= parseInt(beforeBalance._hex, 16)) {
      await this.state.lockContract.lockToken(
        tokenAddress,
        this.state.tokens,
        this.state.unlockTime
      );
      await this.state.tokenContract.transfer(lockAddress, this.state.tokens);
    } else {
      console.log("Amount should be less than balance");
    }
    this.sleep(30000);
    let afterBalance = await this.state.tokenContract.balanceOf(account);
    let contractTokenBalance = await this.state.lockContract.tokenBalanceOf(
      tokenAddress
    );
    console.log("Your Balance after Lock:", parseInt(afterBalance._hex, 16));
    console.log(
      "Total Token in Contract:",
      parseInt(contractTokenBalance._hex, 16)
    );
  }
  // const content =
  render() {
    return (
      <div className="App">
        Tokens:
        <input
          type="number"
          id="tokens"
          value={this.state.tokens}
          onChange={(e) => this.handleChange(e)}
        ></input>
        UnlockTime:
        <input
          type="number"
          id="unlockTime"
          value={this.state.unlockTime}
          onChange={(e) => this.handleChange(e)}
        ></input>
        <button onClick={this.lockToken}>Add</button>
        <button onClick={this.connectWallet}>Connect</button>
        <button onClick={this.getDetails}>Details </button>
      </div>
    );
  }
}

export default App;
