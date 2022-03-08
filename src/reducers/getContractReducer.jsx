import { ethers } from "ethers";
function getTokenContract(address) {
  console.log(address);
  return { tokenAddress: address };
}
const getContract = (state = { tokenAddress: null }, action) => {
  switch (action.type) {
    case "GETCONTRACT":
      return getTokenContract(action.tokenAddress);
    default:
      return state;
  }
};
export default getContract;
