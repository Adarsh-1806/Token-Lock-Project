import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import CardComponent from "./CardComponent";
import { getContract } from "../actions/index";

function ContractData() {
  const connectdata = useSelector((state) => state.connectMetamask);
  const [signer, setSigner] = useState();
  const [account, setAccount] = useState();
  connectdata.then((dt) => {
    setSigner(dt.signer);
    setAccount(dt.account);
  });
  const [data, setData] = useState({ bal: 0 });
  const token = useSelector((state) => state.getContract);
  if (token.tokenAddress !== null && data.bal === 0) {
    token.then((dt) => {
      setData({
        bal: dt.tokenBal,
        tokenContract: dt.tokenContract,
        lockContract: dt.lockContract,
      });
    });
  }
  const [button, setButton] = useState(true);
  const tokenRef = useRef();
  const amount = useRef();
  const time = useRef();
  const dispatch = useDispatch();
  async function getApproval() {
    const tokenAmount = amount.current.value;
    const unlockTime = time.current.value;
    await data.tokenContract.approve(data.lockContract.address, tokenAmount);
    data.tokenContract.on("Approval", (owner, spender, value) => {
      setButton(false);
      console.log(
        "Approval from:",
        owner,
        " to:",
        spender,
        " of Amount:",
        value
      );
    });
    setData({
      ...data,
      tokenAmount,
      unlockTime,
    });
  }
  async function getLockToken() {
    await data.lockContract.lockToken(
      data.tokenContract.address,
      data.tokenAmount,
      data.unlockTime
    );
    data.lockContract.on("TokenTransfered", async (sender, reciever, value) => {
      const newBal = parseInt(
        (await data.tokenContract.balanceOf(account))._hex,
        16
      );
      setData({ ...data, bal: newBal });
      setButton(true);
    });
  }
  if (token.tokenAddress === null) {
    return (
      <CardComponent>
        <input className="w-75 " type="text" required ref={tokenRef} />
        <button
          className="w-25"
          onClick={() =>
            dispatch(getContract(tokenRef.current.value, signer, account))
          }
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
                <input className="w-25 " type="text" required ref={amount} />
                <button>max</button>
              </div>
            </div>
            <div className="col-4 data-field">
              <label>Balance:{data.bal}</label>
              <span></span>
            </div>
          </div>
          <div className="header d-flex">
            <div className="col-8 data-field">
              <label>Unlock Time</label>
              <input className="w-25" type="text" required ref={time} />
            </div>
            <div className="col-4 data-field"></div>
          </div>
          <div className="d-flex justify-content-evenly">
            <button onClick={getApproval}>Approve</button>
            <button disabled={button} onClick={getLockToken}>
              Lock
            </button>
          </div>
        </CardComponent>
      </>
    );
  }
}
export default ContractData;
