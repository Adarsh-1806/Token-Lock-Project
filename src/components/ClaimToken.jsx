import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./ClaimToken.css";
import Footer from "./Footer";
import NavBar from "./NavBar";
import Lock from "../artifacts/contracts/Lock.sol/Lock.json";
import Token from "../artifacts/contracts/Token.sol/Token.json";
import { ethers } from "ethers";
import SimpleDateTime from "react-simple-timestamp-to-date";
import eth from "./images/eth.svg";
import { ProgressBar } from "react-bootstrap";

function ClaimToken() {
  const [data, setData] = useState({});
  const [contract, setContract] = useState({});
  const [transaction, setTransaction] = useState([]);
  const state = useSelector((state) => state.connectMetamask);
  const cnt = 0;
  state.then((dt) => {
    setData(dt);
  });
  useEffect(() => {
    console.log(data);
    const onLoad = async () => {
      const lockAddress = process.env.REACT_APP_CONTRACTADDRESS;
      const contract = new ethers.Contract(lockAddress, Lock.abi, data.signer);
      setContract(contract);
      const Ids = await contract.myTransactions();
      const txs = [];
      for (let i = 0; i < Ids.length; i++) {
        const e = Ids[i];
        const dt = await contract.getDetailsOf(e);
        const tokenContract = new ethers.Contract(
          dt.tokenAddress,
          Token.abi,
          data.provider
        );
        const name = await tokenContract.name();
        const symbol = await tokenContract.symbol();
        const lockedTime = parseInt(dt.lockedTime._hex, 16);
        const unlockTime = parseInt(dt.unlockTime._hex, 16);
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
          id: parseInt(dt.id._hex, 16),
          owner: dt.owner,
          tokenAddress: dt.tokenAddress,
          name: name,
          symbol: symbol,
          withdrawed: dt.withdrawed,
          amount: parseInt(dt.amount._hex, 16),
          lockedTime: lockedTime,
          unlockTime: unlockTime,
          progressBar: progressBar,
          varient: varient,
        };
        txs.push(obj);
        console.log(obj);
      }
      setTransaction(txs);
    };
    onLoad();
  }, [data, cnt]);
  async function withdrawToken(_id) {
    await contract.withDrawToken(_id);
    cnt++;
  }
  return (
    <>
      <NavBar />
      <section className="bg-primary p-5">
        <div className="container bg-light rounded tablecontainer">
          {!data.isConnected ? (
            <div className=" d-flex justify-content-center align-items-center">
              <h1 className="mt-3">Connect Wallet</h1>
            </div>
          ) : (
            <div className="p-2">
              <h3>Lock Ups</h3>
              <div>
                <table className="table m-3 border overflow-auto">
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Token</th>
                      <th scope="col">Blockchain</th>
                      <th scope="col">Token Locked</th>
                      <th scope="col">LockedTime</th>
                      <th scope="col">Unlock In</th>
                      <th scope="col">Withdraw</th>
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
                            variant={item.varient}
                            now={item.progressBar}
                          />
                        </td>
                        <td>
                          <button
                            className="btn btn-success"
                            onClick={() => withdrawToken(item.id)}
                            disabled={item.withdrawed}
                          >
                            withdraw
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}

export default ClaimToken;
