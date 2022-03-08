import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { connect, disconnect } from "../actions/index";
function Connect() {
  const [data, setData] = useState({});
  const state = useSelector((state) => state.connectMetamask);
  const dispatch = useDispatch();
  state.then((dt) => {
    setData(dt);
  });
  if (data.isConnected) {
    return (
      <div className="topHeader">
        <span className="btns">{data.account}</span>
        <button className="btns" onClick={() => dispatch(disconnect())}>
          disconnect
        </button>
        <br />
        <p>Balance:{data.balanceInEth}</p>
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
