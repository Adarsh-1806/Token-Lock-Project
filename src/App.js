import logo from './logo.svg';
import './App.css';
import {useEffect} from 'react';
// import {useState} from 'react';
import {ethers} from 'ethers';
import Token from './artifacts/contracts/Token.sol/Token.json';
const tokenAddress = '0xa513E6E4b8f2a923D98304ec87F64353C4D5C853';
function App() {
  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Please install MetaMask!");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Connected", accounts.toString());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    connectWallet();
  }, []);
  async function getbalance(){
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const [account] = await window.ethereum.request({method:'eth_requestAccounts'});
    const contract = new ethers.Contract(tokenAddress,Token.abi,provider);
    const balance = await contract.balanceOf(account);  
    console.log("Account:",account);
    console.log("Balance of Account:",balance.toString());
  }
  async function transfer(){
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const [account] = await window.ethereum.request({method:'eth_requestAccounts'});
    const contract = new ethers.Contract(tokenAddress,Token.abi,provider);
    const balance = await contract.transferToken(5000,0x70997970C51812dc3A010C7d01b50e0d17dc79C8);  
    console.log("Account:",account);
    console.log("Balance of Account:",balance.toString());
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={getbalance}>Get Token Balance</button>
        <button onClick={transfer}>Transfer</button>
        {/* <input></input> */}
      </header>
    </div>
  );
}

export default App;
