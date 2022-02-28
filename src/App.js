import logo from './logo.svg';
import './App.css';
import {useEffect} from 'react';
import {useState} from 'react';
import {ethers} from 'ethers';
const hre = require("hardhat");
import Token from './artifacts/contracts/Lock.sol/Lock.json';
const tokenAddress = '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0';
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
  const [data, setData] = useState({
    tokens:null,
    unlockTime:null,
  });
  const handleChange = (event)=> {
    event.persist();
    setData({...data,[event.target.id]: event.target.value});
    // console.log(data);
    // console.log(event.target.value);
  }

  // handleSubmit = (event) {
  //   alert('A name was submitted: ' + this.state.value);
  //   event.preventDefault();
  // }
    async function lockToken(){
    console.log("inside");
    console.log(data.tokens,data.unlockTime);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const [account] = await window.ethereum.request({method:'eth_requestAccounts'});
    const owner = await hre.ethers.getSigner();
    const contract = new ethers.Contract(tokenAddress,Token.abi,provider);
    await contract.connect(owner).lockToken(tokenAddress,data.tokens,data.unlockTime);  
    console.log("Locked Token:",await contract.tokenBalanceOf(tokenAddress));
  }
  return (
    <div className="App">
      <header className="App-header d-flex">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        {/* <Input ></Input> */}
        <div>

        Tokens:<input type='number' id ="tokens" value={data.tokens} onChange= {(e)=>handleChange(e)}></input>
        </div>
        <div>
        UnlockTime:<input type='number' id="unlockTime"value={data.unlockTime} onChange={(e)=>handleChange(e)}></input>
        </div>
        <button onClick={lockToken}>Add</button>
      </header>
    </div>
  );
}

export default App;
