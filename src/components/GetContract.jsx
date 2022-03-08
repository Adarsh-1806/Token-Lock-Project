import { useRef } from "react";
import { ethers } from "ethers";
import Token from "../artifacts/contracts/Token.sol/Token.json";
import Lock from "../artifacts/contracts/Lock.sol/Lock.json";
import LockToken from "./LockToken";
const tokenAddress = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9";
const lockAddress = "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707";

function GetContract(props) {
  // const address = useRef();
  const handleContract = async () => {
    // const lockAddress = address.current.value;
    const signer = await props.provider.provider.getSigner();
    const tokenContract = new ethers.Contract(tokenAddress, Token.abi, signer);
    const lockContract = new ethers.Contract(lockAddress, Lock.abi, signer);
    props.updateState({ ...props.Provider, lockContract, tokenContract });
    props.getData({ tokenContract, lockContract });
    // return <Justcheck />;
  };

  return (
    <div>
      {/* <input type="text" required ref={address} /> */}
      <button onClick={handleContract}>contract</button>
    </div>
  );
}
export default GetContract;
