import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { connect, disconnect } from "../actions/index";
function Connect() {
  const stateData = useSelector((state) => state.connectMetamask);
  let data = null;
  console.log(stateData);
  const dispatch = useDispatch();
  if (stateData.isConnected) {
    return (
      <div className="topHeader">
        <span className="btns">abs</span>
        <button className="btns" onClick={() => dispatch(disconnect())}>
          disconnect
        </button>
        <br />
        <p>Balance:</p>
      </div>
    );
  } else {
    return (
      <div className="topHeader">
        <button className="btns" onClick={() => dispatch(connect())}>
          Connect
        </button>
      </div>
    );
  }
}

export default Connect;
