const getTransactiondata = (state = { transactions: null }, action) => {
  switch (action.type) {
    case "GETTRANSACTIONDATA":
      return { transactions: "nathi pan kai " };
    default:
      return state;
  }
};
export default getTransactiondata;
