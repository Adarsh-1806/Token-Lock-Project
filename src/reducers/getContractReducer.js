import { ethers } from "ethers";
import Lock from "../artifacts/contracts/Lock.sol/Lock.json";
import Token from "../artifacts/contracts/Token.sol/Token.json";
const lockAddress = "0xc6e7DF5E7b4f2A278906862b61205850344D4e7d";
async function getTokenContract(address, signer, account) {
  const lockContract = new ethers.Contract(lockAddress, Lock.abi, signer);
  const tokenContract = new ethers.Contract(address, Token.abi, signer);
  const tokenBal = parseInt((await tokenContract.balanceOf(account))._hex, 16);
  return { tokenContract, lockContract, tokenBal };
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
