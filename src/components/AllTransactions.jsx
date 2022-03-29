import { ethers } from "ethers";
import { useEffect, useState } from "react";
import Lock from "../artifacts/contracts/Lock.sol/Lock.json";
import Token from "../artifacts/contracts/Token.sol/Token.json";
import SimpleDateTime from "react-simple-timestamp-to-date";
import eth from "./images/eth.svg";
import { ProgressBar } from "react-bootstrap";
function AllTransactions() {
  const [transaction, setTransaction] = useState([]);
  useEffect(() => {
    const onLoad = async () => {
      const provider = new ethers.providers.JsonRpcProvider();
      const lockAddress = process.env.REACT_APP_CONTRACTADDRESS;
      const contract = new ethers.Contract(lockAddress, Lock.abi, provider);
      const Ids = await contract.getAllIds();
      const txs = [];
      for (let i = 0; i < Ids.length; i++) {
        const e = Ids[i];
        const data = await contract.getDetailsOf(e);
        const tokenContract = new ethers.Contract(
          data.tokenAddress,
          Token.abi,
          provider
        );
        const name = await tokenContract.name();
        const symbol = await tokenContract.symbol();
        const lockedTime = parseInt(data.lockedTime._hex, 16);
        const unlockTime = parseInt(data.unlockTime._hex, 16);
        let varient = "";
        const progressBar =
          ((Date.now() / 1000 - lockedTime) * 100) / (unlockTime - lockedTime);
        if (progressBar > 80) {
          varient = "success";
        } else if (progressBar > 40) {
          varient = "warning";
        } else {
          varient = "danger";
        }
        const obj = {
          id: parseInt(data.id._hex, 16),
          owner: data.owner,
          tokenAddress: data.tokenAddress,
          name: name,
          symbol: symbol,
          withdrawed: data.withdrawed,
          amount: parseInt(data.amount._hex, 16),
          lockedTime: lockedTime,
          unlockTime: unlockTime,
          progressBar: progressBar,
          varient: varient,
        };
        txs.push(obj);
      }
      setTransaction(txs);
    };
    onLoad();
  }, []);
  return (
    <>
      {transaction.length === 0 ? (
        <h1>No Data Available</h1>
      ) : (
        <>
          <table className="table m-3 border overflow-auto">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Token</th>
                <th scope="col">Blockchain</th>
                <th scope="col">Token Locked</th>
                <th scope="col">LockedTime</th>
                <th scope="col">Unlock In</th>
              </tr>
            </thead>
            <tbody>
              {transaction.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.symbol}</td>
                  <td>
                    <img src={eth} style={{ height: "17px" }} /> ETH
                  </td>
                  <td>{item.amount}</td>
                  <td>
                    <SimpleDateTime
                      dateFormat="DMY"
                      dateSeparator="/"
                      timeSeparator=":"
                    >
                      {item.lockedTime}
                    </SimpleDateTime>
                  </td>
                  <td>
                    <SimpleDateTime
                      dateFormat="DMY"
                      dateSeparator="/"
                      timeSeparator=":"
                    >
                      {item.unlockTime}
                    </SimpleDateTime>
                    <ProgressBar
                      now={item.progressBar}
                      variant={item.varient}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
}

export default AllTransactions;
