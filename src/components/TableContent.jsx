import { useState } from "react";
function TableContent(props) {
  const [state, setState] = useState({
    tnxs: [],
  });
  async function getDetails() {
    // const tnxs = [];
    const ids = await props.stateData.lockContract.myTransactions();
    console.log(ids);
    for (let i = 0; i < ids.length; i++) {
      const detail = await props.stateData.lockContract.getDetailsOf(i);
      const obj = {
        id: parseInt(detail.id._hex, 16),
        owner: detail.owner,
        tokenAddress: detail.tokenAddress,
        withdrawed: detail.withdrawed,
        amount: parseInt(detail.amount._hex, 16),
        lockedTime: parseInt(detail.lockedTime._hex, 16),
        unlockTime: parseInt(detail.unlockTime._hex, 16),
      };
      const tnxs = [...state.tnxs];
      console.log(tnxs);
      tnxs.push(obj);
      setState({ tnxs });
    }
  }
  return (
    <>
      <button onClick={getDetails}>getDetails</button>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Token</th>
            <th scope="col">Amount</th>
            <th scope="col">UnlockTime</th>
            <th scope="col">Owner</th>
          </tr>
        </thead>
        <tbody>
          {state.tnxs.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>ADT</td>
              <td>{item.amount}</td>
              <td>{item.unlockTime}</td>
              <td>{item.owner}</td>
              <td />
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
export default TableContent;
