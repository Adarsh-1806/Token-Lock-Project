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
      const signer = provider.getSigner();
      props.editStateData({
        ...props.stateData,
        provider,
        signer,
        connected: true,
        account: await signer.getAddress(),
      });
    } catch (error) {
      console.log(error);
    }
  };
  const disConnectWallet = async () => {
    props.editStateData({
      ...props.stateData,
      provider: null,
      signer: null,
      account: null,
      connected: false,
    });
  };
  if (props.stateData.connected) {
    return (
      <div className="topHeader">
        <span className="btns">{props.stateData.account}</span>
        <button className="btns" onClick={disConnectWallet}>
          disconnect
        </button>
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
