import { ethers } from "ethers";
import { useEffect } from "react";
import Lock from "../artifacts/contracts/Lock.sol/Lock.json";
function AllTransactions() {
  useEffect(() => {
    const onLoad = async () => {
      const provider = new ethers.providers.JsonRpcProvider();
      const lockAddress = process.env.REACT_APP_CONTRACTADDRESS;
      const contract = new ethers.Contract(lockAddress, Lock.abi, provider);
      console.log(lockAddress);
    };
    onLoad();
  }, []);
  return <h1>Table Avse</h1>;
}

export default AllTransactions;
