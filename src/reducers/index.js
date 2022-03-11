import connectMetamask from "./connectReducer";
import getContract from "./getContractReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  connectMetamask,
  getContract,
});
export default rootReducer;
