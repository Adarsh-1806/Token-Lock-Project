import logo from './logo.svg';
import './App.css';
// import {useEffect} from 'react';
// import {useState} from 'react';
import {ethers} from 'ethers';
import Token from './artifacts/contracts/Token.sol/Token.json';
const tokenAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
function App() {
  // const connectWallet = async () => {
  //   try {
  //     const { ethereum } = window;
  //     if (!ethereum) {
  //       alert("Please install MetaMask!");
  //       return;
  //     }
  //     const accounts = await ethereum.request({
  //       method: "eth_requestAccounts",
  //     });
  //     console.log("Connected", accounts.toString());
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // useEffect(() => {
  //   connectWallet();
  // }, []);
  async function lockToken(){
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const [account] = await window.ethereum.request({method:'eth_requestAccounts'});
    const contract = new ethers.Contract(tokenAddress,Token.abi,provider);
    await contract.lockToken(account);  
    console.log("Account:",account);
  }
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <div className='d-flex'>
        <input type='number' className="m-2"></input>
        <button onClick={lockToken}>Lock Token</button>
        </div>
        {/* <button onClick={transfer}>Transfer</button> */}
        {/* <input></input> */}
      </header>
    </div>
  );
}

export default App;
