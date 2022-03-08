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
export const getContract = (props) => {
  return {
    type: "GETCONTRACT",
    tokenAddress: props,
  };
};
