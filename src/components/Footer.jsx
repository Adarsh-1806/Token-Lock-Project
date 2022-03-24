import React from "react";
import logofooter from "./images/logofooter.png";
import "./Footer.css";
export default function Footer() {
  return (
    <div className="container-fluid">
      <div className="container footer">
        <hr className="mb-5" />
        <div className="row">
          <div className="col-lg-4 col-md-12 me-auto">
            <img src={logofooter} alt="brand-logo" className="brand-logo" />
          </div>
          <div className="col-lg-2 col-md-3 col ">
            <h5>Platform</h5>

            <li className="my-2 ">Explore</li>
            <li className="my-2">All Coin</li>
            <li className="my-2">About</li>
            <li className="my-2">TrustSwap</li>
          </div>
          <div className="col-lg-2 col-md-3 col">
            <h5>Lockups</h5>

            <li className="my-2">Create Lock</li>
            <li className="my-2">My Lockups</li>
            <li className="my-2">Help Locking</li>
            <li className="my-2">FAQ</li>
          </div>
          <div className="col-lg-2 col-md-3 col footer-list">
            <h5>Company</h5>

            <li className="my-2">Privacy Policy</li>
            <li className="my-2">Terms & Condition</li>
            <li className="my-2">GitBook</li>
            <li className="my-2">Help Center</li>
          </div>
          <div className="col-lg-2 col-md-3 col">
            <h5>Connect</h5>
            <li className="my-2">Facebook</li>
            <li className="my-2">Discord</li>
            <li className="my-2">Github</li>
            <li className="my-2">Twitter</li>
          </div>
        </div>
        <div className="col-lg-3 col-md-4 col">
          <p>© 2022 All Rights Resevied</p>
        </div>
      </div>
    </div>
  );
}
