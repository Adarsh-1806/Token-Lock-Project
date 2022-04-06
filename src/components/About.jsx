import Connect from "./Connect";
import { ethers } from "ethers";
import Test from "../artifacts/contracts/Test.sol/Test.json";
function About() {
  let contract;
  const connectWallet = async () => {
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
      console.log(account);
      contract = new ethers.Contract(
        "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
        Test.abi,
        signer
      );
    } catch (error) {
      console.log(error);
    }
  };
  // const teststart = async () => {
  //   await contract.swapToToken({ value: ethers.utils.parseEther("1.5") });
  //   console.log(
  //     parseInt(
  //       (await contract.balanceOf("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"))
  //         ._hex,
  //       16
  //     )
  //   );
  // };
  const teststart = async () => {
    await contract.swapToEth((0.5 * 10 ** 18).toString());
  };
  connectWallet();
  return <button onClick={teststart}>Testing</button>;
}

export default About;
