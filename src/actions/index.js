export const connect = () => {
  return {
    type: "CONNECT",
  };
};
export const disconnect = () => {
  return {
    type: "DISCONNECT",
  };
};
export const getContract = (address, signer, account) => {
  return {
    type: "GETCONTRACT",
    tokenAddress: address,
    signer: signer,
    account: account,
  };
};
export const getTransactiondata = () => {
  return {
    type: "GETTRANSACTIONDATA",
  };
};
