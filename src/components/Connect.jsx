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
  window.ethereum.enable();

  window.ethereum.on("accountsChanged", function (accounts) {
    window.location.reload();
  });

  window.ethereum.on("chainChanged", function (networkId) {
    window.location.reload();
  });
  if (data.isConnected) {
    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              Navbar
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse " id="navbarNav">
              <ul className="navbar-nav me-auto">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="#">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Features
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Pricing
                  </a>
                </li>
              </ul>
              {/*right part */}
              <div className="d-flex  ">
                <div className="d-flex">
                  <p className=" dataspan pt-3 mb-0 px-2 accdiv">
                    {data.account}
                  </p>
                  <p className="dataspan pt-3 mb-0 px-2 accBal">
                    {data.balanceInEth}
                  </p>
                </div>
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
