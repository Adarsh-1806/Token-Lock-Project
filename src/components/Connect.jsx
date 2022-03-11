import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { connect, disconnect } from "../actions/index";
import "./Connect.css";
function Connect() {
  const [data, setData] = useState({});
  const state = useSelector((state) => state.connectMetamask);
  const dispatch = useDispatch();
  state.then((dt) => {
    setData(dt);
  });
  window.ethereum.enable(); // get permission to access accounts

  // detect Metamask account change
  window.ethereum.on("accountsChanged", function (accounts) {
    window.location.reload();
  });

  // detect Network account change
  window.ethereum.on("networkChanged", function (networkId) {
    window.location.reload();
  });
  if (data.isConnected) {
    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="#">
            Token Pool
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse d-flex justify-content-between"
            id="navbarNav"
          >
            <div>
              <ul className="navbar-nav">
                <li className="nav-item active">
                  <a className="nav-link">
                    Explore <span className="sr-only">(current)</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link">About</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link">Lockups</a>
                </li>
              </ul>
            </div>
            <div className="d-flex justify-content-center align-text-center">
              <p className="bg-white dataspan pt-3">{data.account}</p>
              <p className="bg-white dataspan pt-3">{data.balanceInEth}</p>
              <button
                className="btn btn-danger m-1"
                onClick={() => {
                  dispatch(disconnect());
                  window.location.reload();
                }}
              >
                disconnect
              </button>
            </div>
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
