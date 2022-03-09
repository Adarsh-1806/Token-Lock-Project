import connectMetamask from "./connectReducer";
import getContract from "./getContractReducer";
import getTransactiondata from "./transactionReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  connectMetamask,
  getContract,
  getTransactiondata,
});
export default rootReducer;
