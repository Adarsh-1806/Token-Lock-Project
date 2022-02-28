// import logo from './logo.svg'; 
import './App.css';
import {useEffect} from 'react';
import {useState} from 'react';
import {ethers} from 'ethers';

import Lock from './artifacts/contracts/Lock.sol/Lock.json';
import Token from './artifacts/contracts/Token.sol/Token.json';
const tokenAddress = '0xf5059a5D33d5853360D16C683c16e67980206f36';
const lockAddress = '0x95401dc811bb5740090279Ba06cfA8fcF6113778';
function App() {
  const [data, setData] = useState({
    tokens:null,
    unlockTime:null,
    provider:null,
    signer:null,
    tokenContract:null,
    lockContract:null
  });

  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert("Please install MetaMask!");
        return;
      }
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const tokenContract = new ethers.Contract(tokenAddress,Token.abi,signer);
      const lockContract = new ethers.Contract(lockAddress,Lock.abi,signer);
      setData({...data,provider,signer,tokenContract,lockContract});
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    connectWallet();
  }, []);
  const handleChange = (event)=> {
    event.persist();
    setData({...data,[event.target.id]: event.target.value});
  }

  function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }
  
    async function lockToken(){
    const [account] = await window.ethereum.request({method:'eth_requestAccounts'});
    // console.log(account);
    let beforeBalance = await data.tokenContract.balanceOf(account);
    console.log("Your Balance before Lock:",parseInt(beforeBalance._hex,16));
    if(data.tokens <= parseInt(beforeBalance._hex,16)){
      await data.lockContract.lockToken(tokenAddress,data.tokens,data.unlockTime);
      await data.tokenContract.transfer(lockAddress,data.tokens);
    }else{
      console.log("Amount should be less than balance");
    }
    sleep(30000);
    let afterBalance = await data.tokenContract.balanceOf(account);
    let contractTokenBalance = await data.lockContract.tokenBalanceOf(tokenAddress);
    console.log("Your Balance after Lock:",parseInt(afterBalance._hex,16));
    console.log("Total Token in Contract:",parseInt(contractTokenBalance._hex,16));
  }
  // const content = 
  return (
    <div className="App">
        {/* <div>
        Tokens:<input type='number' id ="tokens" value={data.tokens} onChange= {(e)=>handleChange(e)}></input>
        </div>
        <div>
        UnlockTime:<input type='number' id="unlockTime"value={data.unlockTime} onChange={(e)=>handleChange(e)}></input>
        </div>
        <button onClick={lockToken}>Add</button> */}
      <table>
        <tr>
          <th>Token</th>
          <th>Unlock</th>
          <th>Amount</th>
        </tr>
        {data.map((val, key) => {
          return (
            <tr key={key}>
              <td>{val.name}</td>
              <td>{val.age}</td>
              <td>{val.gender}</td>
            </tr>
          )
        })}
      </table>
    </div>
  );
}

export default App;
