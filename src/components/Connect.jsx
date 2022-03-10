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
        <nav className="navbar navbar-light bg-light mb-1">
          <img src="../../public/team.png" alt="team" />
          <a className="navbar-brand" href="#">
            Lock Token
          </a>
          {/* <button style={{ maxWidth: 250 }}> */}
          <span className="bg-white">{data.account}</span>
          {/* </button> */}
          {/* <button style={{ maxWidth: 250 }}> */}
          <span className="bg-white">{data.balanceInEth}</span>
          {/* </button> */}
          <div className="topHeader m-2">
            <button
              className="btn btn-danger m-1"
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
