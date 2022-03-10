import { useState } from "react";
import { useSelector } from "react-redux";

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
      console.log(stateData);
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
  async function withdrawToken(_id) {
    await contract.withDrawToken(_id);
    contract.on("TokenTransfered", (sender, reciever, value) => {
      console.log("Transfer Confirmed");
    });
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
                  onClick={() => withdrawToken(item.id)}
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
        <button
          className="btn btn-secondary"
          disabled={ifConnected}
          onClick={getdata}
        >
          My Transactions
        </button>
      </div>
    </>
  );
}
export default TableContent;
