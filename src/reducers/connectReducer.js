import { ethers } from "ethers";
async function connectWallet() {
  try {
    const { ethereum } = window;
    if (!ethereum) {
      alert("Please install MetaMask!");
      return;
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const account = await signer.getAddress();
    const balance = await provider.getBalance(account);
    const balanceInEth = ethers.utils.formatEther(balance);
    return { provider, signer, account, balanceInEth, isConnected: true };
  } catch (error) {
    console.log(error);
  }
}
const connectMetamask = async (state = { isConnected: false }, action) => {
  switch (action.type) {
    case "CONNECT":
      return connectWallet();
    case "DISCONNECT":
      return {
        provider: null,
        signer: null,
        account: null,
        balanceInEth: null,
        isConnected: false,
      };
    default:
      return state;
  }
};
export default connectMetamask;
