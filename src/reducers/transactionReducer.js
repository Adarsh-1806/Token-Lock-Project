async function setTransactionData(contract) {
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
  return { locks: tnx };
}
const getTransactiondata = (state = { transactions: null }, action) => {
  switch (action.type) {
    case "GETTRANSACTIONDATA":
      return setTransactionData(action.lockContract);
    case "UPDATETRANSACTIONDATA":
      return { transactions: "updated Transaction " };
    default:
      return state;
  }
};
export default getTransactiondata;
