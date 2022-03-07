function TableContent(props) {
  const tnxs = [];
  async function getDetails() {
    const ids = await props.stateData.lockContract.myTransactions();
    console.log(ids);
    for (let i = 0; i < ids.length; i++) {
      tnxs.push(await props.stateData.lockContract.getDetailsOf(i));
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
          {tnxs.map((item) => (
            <tr key={item.unlockTime}>
              <td>ADT</td>
              <td>{item.amount}</td>
              <td>{item.unlockTime}</td>
              <td>{item.owner}</td>
              <td />
            </tr>
          ))}
          {/* <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td colspan="2">Larry the Bird</td>
            <td>@twitter</td>
          </tr> */}
        </tbody>
      </table>
    </>
  );
}
export default TableContent;
