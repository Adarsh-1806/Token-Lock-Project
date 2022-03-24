import { useState } from "react";
import { useSelector } from "react-redux";
import Content from "./Content";
import SimpleDateTime from "react-simple-timestamp-to-date";
/**
 *
 *
 * @return {*}
 */
function TableContent() {
  const stateData = useSelector((state) => state.getContract);
  const connectdata = useSelector((state) => state.connectMetamask);
  const [contract, setContract] = useState(null);
  const [transaction, setTransaction] = useState([]);
  const [ifConnected, setifConnected] = useState(true);
  connectdata.then((dt) => {
    setifConnected(!dt.isConnected);
  });
  if (stateData.lockContract !== null && contract === null) {
    stateData.then((dt) => {
      setContract(dt.lockContract);
    });
  }
  if (contract !== null) {
    contract.on("TokenTransfered", async (sender, reciever, value) => {
      /* const arr = await contract.myTransactions();
      const tnx = transaction;
      if (arr.length == tnx.length + 1) {
        const e = parseInt(arr[arr.length - 1]._hex, 16);
        const trns = await contract.getDetailsOf(e);
        const obj = {
          id: parseInt(trns.id._hex, 16),
          owner: trns.owner,
          tokenAddress: trns.tokenAddress,
          withdrawed: trns.withdrawed,
          amount: parseInt(trns.amount._hex, 16),
          lockedTime: parseInt(trns.lockedTime._hex, 16),
          unlockTime: parseInt(trns.unlockTime._hex, 16),
        };
        tnx.push(obj);
        setTransaction(tnx);
      }*/
      await getdata();
    });
  }
  /**
   *@dev function to get Token Lock data
   * @return {*} set Data in component State
   */
  async function getdata() {
    if (contract === null) return;
    const arr = await contract.myTransactions();
    const tnx = [];
    for (let i = 0; i < arr.length; i++) {
      const e = parseInt(arr[i]._hex, 16);
      const trns = await contract.getDetailsOf(e);
      const obj = {
        id: parseInt(trns.id._hex, 16),
        owner: trns.owner,
        tokenAddress: trns.tokenAddress,
        withdrawed: trns.withdrawed,
        amount: parseInt(trns.amount._hex, 16),
        lockedTime: parseInt(trns.lockedTime._hex, 16),
        unlockTime: parseInt(trns.unlockTime._hex, 16),
      };
      tnx.push(obj);
    }
    setTransaction(tnx);
  }
  /**
   * @dev function to withdraw token
   * @param _id {uint} id of Lock transaction
   */
  async function withdrawToken(_id) {
    await contract.withDrawToken(_id);
    contract.on("TokenTransfered", (sender, reciever, value) => {
      console.log("Transfer Confirmed");
    });
  }
  if (transaction.length === 0) {
    return (
      <Content>
        <h3 className="d-flex justify-content-center">No Locks </h3>
        <div className="text-center m-2">
          <button
            className="btn btn-secondary"
            disabled={ifConnected}
            onClick={getdata}
          >
            <i className="fa fa-refresh" aria-hidden="true"></i>
          </button>
        </div>
      </Content>
    );
  } else {
    return (
      <Content>
        <table className="table m-3 border">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Token</th>
              <th scope="col">Amount</th>
              <th scope="col">LockedTime</th>
              <th scope="col">UnlockTime</th>
              <th scope="col">Owner</th>
              <th scope="col">Withdrawed</th>
            </tr>
          </thead>
          <tbody>
            {transaction.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>ADT</td>
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
                </td>
                <td className="ownerCell">{item.owner}</td>
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
        <div className="text-center m-2">
          <button
            className="btn btn-secondary"
            disabled={ifConnected}
            onClick={getdata}
          >
            <i className="fa fa-refresh" aria-hidden="true"></i>
          </button>
        </div>
      </Content>
    );
  }
}
export default TableContent;
