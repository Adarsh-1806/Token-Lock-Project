import logo from './logo.svg';
import './App.css';
import {useEffect} from 'react';
// import {useState} from 'react';
import {ethers} from 'ethers';
import Token from './artifacts/contracts/Token.sol/Token.json';
const tokenAddress = '0x8A791620dd6260079BF849Dc5567aDC3F2FdC318';
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

      console.log("Connected", accounts[0]);
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
    console.log("Balance of Account:",balance.toString());
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={getbalance}>Get Token Balance</button>
        {/* <input></input> */}
      </header>
    </div>
  );
}

export default App;
