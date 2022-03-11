import { ethers } from "ethers";
import Lock from "../artifacts/contracts/Lock.sol/Lock.json";
import Token from "../artifacts/contracts/Token.sol/Token.json";
// const lockAddress = "0xB7f8BC63BbcaD18155201308C8f3540b07f84F5e";
async function getTokenContract(address, signer, account) {
  const lockAddress = process.env.REACT_APP_CONTRACTADDRESS;

  const lockContract = new ethers.Contract(lockAddress, Lock.abi, signer);
  const tokenContract = new ethers.Contract(address, Token.abi, signer);
  const symbol = await tokenContract.symbol();
  const tokenBal = parseInt((await tokenContract.balanceOf(account))._hex, 16);
  return { tokenContract, lockContract, tokenBal, symbol };
}
const getContract = (
  state = { tokenAddress: null, lockContract: null },
  action
) => {
  switch (action.type) {
    case "GETCONTRACT":
      return getTokenContract(
        action.tokenAddress,
        action.signer,
        action.account
      );
    default:
      return state;
  }
};
export default getContract;
