import React from "react";
import { ethers } from "ethers";
import Lock from "./../artifacts/contracts/Lock.sol/Lock.json";
import Token from "./../artifacts/contracts/Token.sol/Token.json";
const tokenAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const lockAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
// import { Container } from "react-bootstrap";
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
      const tokenContract = new ethers.Contract(
        tokenAddress,
        Token.abi,
        signer
      );
      const lockContract = new ethers.Contract(lockAddress, Lock.abi, signer);
      const [account] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      props.editStateData({
        ...props.stateData,
        provider,
        signer,
        tokenContract,
        lockContract,
        account,
        connected: true,
      });
      alert(`connected with => ${account}`);
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
      <>
        <span>{props.stateData.account}</span>
        <button onClick={disConnectWallet}>disconnect</button>
      </>
    );
  } else {
    return <button onClick={connectWallet}>Connect</button>;
  }
}

export default Connect;
