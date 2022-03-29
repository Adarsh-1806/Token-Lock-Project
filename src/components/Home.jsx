import NavBar from "./NavBar";
import lock from "./images/lock.svg";
import sell from "./images/sell.svg";
import doller from "./images/doller.png";
import laptop from "./images/laptop.svg";
import Footer from "./Footer";
import AllTransactions from "./AllTransactions";
import { useEffect, useState } from "react";
import Lock from "../artifacts/contracts/Lock.sol/Lock.json";
import { ethers } from "ethers";
import "./Home.css";
function Home() {
  const [amount, setAmount] = useState(0);
  useEffect(() => {
    const onLoad = async () => {
      const provider = new ethers.providers.JsonRpcProvider();
      const lockAddress = process.env.REACT_APP_CONTRACTADDRESS;
      const contract = new ethers.Contract(lockAddress, Lock.abi, provider);
      const amount = await contract.totolAmount();
      setAmount(parseInt(amount._hex, 16));
    };
    onLoad();
  }, []);
  return (
    <>
      <section className="container-fluid bg-primary text-white">
        <NavBar />

        <div>
          <div className="title-block d-flex justify-content-center">
            <h1>Smart Lock</h1>
          </div>
          <p className="d-flex justify-content-center">
            Liquidity Locking & Team Vesting for Token Founders and Community
          </p>
        </div>
        <div className="d-flex justify-content-center pb-5">
          <div className="d-flex p-3 section-item mx-auto ">
            <div className="image-item p-1 mx-2 my-auto rounded-circle bg-white d-flex justify-content-center align-items-center">
              <img src={lock} alt="lock" style={{ height: "35px" }} />
            </div>
            <div className="content-item section-item ">
              <h2>$ {amount}</h2>
              <p className="text-white">Total Locked Token Value</p>
            </div>
          </div>
          <div className="d-flex p-3 section-item mx-auto">
            <div className="image-item p-1 mx-2 my-auto rounded-circle bg-white d-flex justify-content-center align-items-center">
              <img src={doller} alt="lock" style={{ height: "35px" }} />
            </div>
            <div className="content-item section-item ">
              <h2>255547</h2>
              <p className="text-white">Total Locked Projects</p>
            </div>
          </div>
        </div>
      </section>
      <section className="explore-container">
        <AllTransactions />
      </section>
      <section className="moreinfo-container d-flex justify-content-center">
        <div className="item m-3">
          <div className="item-image d-flex justify-content-center">
            <img src={lock} className="card-img-top itemImage" alt="lock" />
          </div>
          <div className="card-body ">
            <h4 className="item-title d-flex justify-content-center">
              Lock Liquidity
            </h4>
            <center className="item-content text-secondary d-flex text-align-center">
              Input your liquidity tokens into a time-released vault that
              returns the tokens at a specified date.
            </center>
          </div>
        </div>
        <div className="item m-3">
          <div className="item-image d-flex justify-content-center">
            <img src={sell} className="card-img-top itemImage" alt="lock" />
          </div>
          <div className="card-body ">
            <h4 className="item-title d-flex justify-content-center">
              Team Token Vesting
            </h4>
            <center className="item-content text-secondary d-flex justify-content-center">
              Create a vesting schedule for team members with specified dates
              and token amounts.
            </center>
          </div>
        </div>
        <div className="item m-3">
          <div className="item-image d-flex justify-content-center">
            <img src={laptop} className="card-img-top itemImage" alt="lock" />
          </div>
          <div className="card-body ">
            <h4 className="item-title d-flex justify-content-center">
              Public Facing Profile
            </h4>
            <center className="item-content text-secondary d-flex justify-content-center">
              Proudly display your locked tokens and vesting schedules to the
              world as proof.
            </center>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Home;
