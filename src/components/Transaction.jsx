import React from "react";

async function Transaction(props) {
  const ids = await props.contract.getAllIds();
  console.log(ids);

  return (
    <>
      <table>
        <tr>
          <th>Token</th>
          <th>Amount</th>
          <th>UnlockTime</th>
          <th>Owner</th>
        </tr>
        {/* {tnxs.map((val) => (
          <tr>
            <td>{val.tokenAddress}</td>
            <td>{val.amount}</td>
            <td>{val.unlockTime}</td>
            <td>{val.owner}</td>
          </tr>
        ))} */}
      </table>
    </>
  );
}
export default Transaction;
