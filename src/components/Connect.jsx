import React from "react";
import { ethers } from "ethers";

function Connect(props) {
  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert("Please install MetaMask!");
        return;
      }
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      props.editStateData({
        ...props.stateData,
        provider,
        connected: true,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const disConnectWallet = async () => {
    props.editStateData({
      ...props.stateData,
      provider: null,
      signer:null,
      account:null,
      connected: false,
    });
  };
  async function getBalance(){
    const signer = props.stateData.provider.getSigner();
    const account = await signer.getAddress();
    const balance = await props.stateData.provider.getBalance(account);
    console.log(ethers.utils.formatEther(balance));
    return [ethers.utils.formatEther(balance),account];
  }
  const dt = getBalance();
  if (props.stateData.connected) {
    console.log(dt);
    return (
      <div className="topHeader">
        <span className="btns">{dt[1]}</span>
        <button className="btns" onClick={disConnectWallet}>
          disconnect
        </button>
        <br />
        <p>Balance:{dt[0]}</p>
      </div>
    );
  } else {
    return (
      <div className="topHeader">
        <button className="btns" onClick={connectWallet}>
          Connect
        </button>
      </div>
    );
  }
}

export default Connect;
