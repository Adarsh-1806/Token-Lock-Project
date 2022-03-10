import React, { useState } from "react";
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
      <>
        <nav class="navbar navbar-light bg-light">
          <a class="navbar-brand" href="#">
            Time Based Token Lock
          </a>

          <div className="topHeader m-2">
            <span className="btns">{data.account}</span>
            <span>Balance:{data.balanceInEth}</span>
            <button
              className="btn btn-secondary m-1"
              onClick={() => dispatch(disconnect())}
            >
              disconnect
            </button>
          </div>
        </nav>
      </>
    );
  } else {
    return (
      <div className="topHeader m-2">
        <button
          className="btn btn-secondary"
          onClick={() => dispatch(connect())}
        >
          Connect
        </button>
      </div>
    );
  }
}

export default Connect;
