import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import CardComponent from "./CardComponent";
import { getContract } from "../actions/index";

function ContractData() {
  const token = useSelector((state) => state.getContract);
  const tokenRef = useRef();
  const dispatch = useDispatch();

  if (token.tokenAddress === null) {
    return (
      <CardComponent>
        <input className="w-75 " type="text" required ref={tokenRef} />
        <button
          className="w-25"
          onClick={() => dispatch(getContract(tokenRef.current.value))}
        >
          Get
        </button>
      </CardComponent>
    );
  } else {
    return (
      <>
        <CardComponent>
          <div className="header d-flex">
            <div className="col-8  data-field">
              <label> Token Amount</label>
              <div>
                <input
                  className="w-25 "
                  type="text"
                  required
                  //   ref={tokenAmount}
                />
                <button>max</button>
              </div>
            </div>
            <div className="col-4 data-field">
              <label>Balance:</label>
              <span></span>
            </div>
          </div>
          <div className="header d-flex">
            <div className="col-8 data-field">
              <label>Unlock Time</label>
              <input className="w-25" type="text" required />
            </div>
            <div className="col-4 data-field">
              <label>Balance:...</label>
              <span>Token</span>
            </div>
          </div>
          <div className="d-flex justify-content-evenly">
            <button>Approve</button>
            <button>Lock</button>
          </div>
        </CardComponent>
      </>
    );
  }
}
export default ContractData;
