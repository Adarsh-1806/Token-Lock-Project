import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { connect, disconnect } from "../actions/index";
import "./Connect.css";
import teamwhite from "./images/teamwhite.png";
function NavBar() {
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
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-primary">
        <div className="container-fluid">
          <a className="navbar-brand">
            <img src={teamwhite} style={{ height: "50px" }} />
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
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link
                  className="nav-link active text-white"
                  aria-current="page"
                  to="/"
                >
                  Explore
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/lockup">
                  Lockup
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/claimtoken">
                  Caim Token
                </Link>
              </li>
            </ul>
            <div className="d-flex  ">
              {data.isConnected ? (
                <>
                  <div className="d-flex">
                    <p className=" dataspan pt-3 mb-0 px-2 accdiv">
                      {data.account}
                    </p>
                    <p className="dataspan pt-3 mb-0 px-2 accBal">
                      {data.balanceInEth}
                    </p>
                  </div>
                  <button
                    className="btn btn-outline-warning m-1"
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(disconnect());
                      window.location.reload();
                    }}
                  >
                    disconnect
                  </button>
                </>
              ) : (
                <button
                  className="btn btn-outline-light m-1"
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(connect());
                    // window.location.reload();
                  }}
                >
                  Connect
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
