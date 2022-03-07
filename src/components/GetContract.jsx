import { ethers } from "ethers";
import Token from "../artifacts/contracts/Token.sol/Token.json";
import Lock from "../artifacts/contracts/Lock.sol/Lock.json";
const tokenAddress = "0x610178dA211FEF7D417bC0e6FeD39F05609AD788";
const lockAddress = "0xB7f8BC63BbcaD18155201308C8f3540b07f84F5e";

function GetContract(props) {
  const setState = async () => {
    const signer = await props.provider.provider.getSigner();
    const tokenContract = new ethers.Contract(tokenAddress, Token.abi, signer);
    const lockContract = new ethers.Contract(lockAddress, Lock.abi, signer);
    props.updateState({ ...props.provider, lockContract, tokenContract });
    props.getData({ tokenContract, lockContract });
  };

  return <button onClick={setState}>click me</button>;
}
export default GetContract;
