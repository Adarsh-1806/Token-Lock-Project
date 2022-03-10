import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import store from "../store";
function TableContent() {
  const stateData = useSelector((state) => state.getContract);
  const [contract, setContract] = useState(null);
  const [connect, setconnect] = useState();
  const [transaction, setTransaction] = useState([]);
  if (stateData.lockContract !== null && contract === null) {
    stateData.then((dt) => {
      setContract(dt.lockContract);
    });
  }
  async function getdata() {
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
  async function withdrawToken() {
    console.log("Button Clicked");
  }

  return (
    <>
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
              <td>{item.lockedTime}</td>
              <td>{item.unlockTime}</td>
              <td>{item.owner}</td>
              <td>
                <button
                  className="btn btn-success"
                  onClick={withdrawToken}
                  disabled={item.withdrawed}
                >
                  withdraw
                </button>
              </td>
              <td />
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-center m-2">
        <button className="btn btn-secondary" onClick={getdata}>
          My Transactions
        </button>
      </div>
    </>
  );
  // }
}
export default TableContent;
