import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import CardComponent from "./CardComponent";
import { getContract } from "../actions/index";
import { Dropdown } from "react-bootstrap";
import "./ContractData.css";
function ContractData() {
  const connectdata = useSelector((state) => state.connectMetamask);
  const [signer, setSigner] = useState();
  const [account, setAccount] = useState();
  const [ifConnected, setifConnected] = useState(true);
  connectdata.then((dt) => {
    setSigner(dt.signer);
    setAccount(dt.account);
    setifConnected(!dt.isConnected);
  });
  const [data, setData] = useState({ bal: 0, val: 0, lockContract: null });
  const token = useSelector((state) => state.getContract);
  if (token.tokenAddress !== null && data.bal === 0) {
    token.then((dt) => {
      setData({
        ...data,
        bal: dt.tokenBal,
        symbol: dt.symbol,
        tokenContract: dt.tokenContract,
        lockContract: dt.lockContract,
      });
    });
  }
  const [button, setButton] = useState({ lock: true });
  const tokenRef = useRef();
  const amount = useRef();
  const time = useRef();
  const dispatch = useDispatch();
  async function getApproval() {
    const tokenAmount = amount.current.value;
    const unlockTime = time.current.value;
    await data.tokenContract.approve(data.lockContract.address, tokenAmount);
    data.tokenContract.on("Approval", (owner, spender, value) => {
      setData({
        ...data,
        tokenAmount,
        unlockTime,
      });
      setButton({ lock: false });
      console.log(
        "Approval from:",
        owner,
        " to:",
        spender,
        " of Amount:",
        value
      );
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
      setButton({ lock: true });
    });
  }
  function handleMaxbtn() {
    console.log("Clicked....");
    // amount.current = data.bal;
    setData({ ...data, val: data.bal });
    console.log(data.val);
  }
  if (token.tokenAddress === null) {
    return (
      <CardComponent>
        <div className="mx-auto text-center mt-5">
          <input className="w-75 m-2" type="text" required ref={tokenRef} />
          <small style={{ color: "gray" }}>
            e.g.0x5FbDB2315678afecb367f032d93F642f64180aa3
          </small>
          <button
            className="w-50 m-2 btn btn-secondary"
            disabled={ifConnected}
            onClick={() =>
              dispatch(getContract(tokenRef.current.value, signer, account))
            }
          >
            Address
          </button>
        </div>
      </CardComponent>
    );
  } else {
    return (
      <>
        <CardComponent>
          <div className="p-1">
            <div className="header d-flex">
              <div className="col-8  data-field">
                <label> Lock Amount</label>
                <div>
                  <input
                    className="w-50 align-middle "
                    type="text"
                    required
                    ref={amount}
                    value={data.val}
                    onChange={(e) => {
                      setData({ ...data, val: e.target.value });
                    }}
                  />
                  <button
                    className="btn btn-light align-middle"
                    onClick={handleMaxbtn}
                  >
                    max
                  </button>
                </div>
              </div>
              <div className="col-4 data-field">
                <label>Balance:{data.bal}</label>
                <div>
                  <h4>{data.symbol}</h4>
                </div>
              </div>
            </div>
            <div className="header d-flex">
              <div className="col-8 data-field">
                <label>Unlock Time</label>
                <div>
                  <input className="w-25" type="text" required ref={time} />
                </div>
              </div>
              <div className="col-4 data-field">
                <Dropdown>
                  <Dropdown.Toggle variant="light" id="dropdown-basic">
                    Days
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item>Days</Dropdown.Item>
                    <Dropdown.Item>Months</Dropdown.Item>
                    <Dropdown.Item>Timestamp</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
            <div className="d-flex justify-content-evenly">
              <button className="btn btn-outline-success" onClick={getApproval}>
                Approve
              </button>
              <button
                className="btn btn-outline-success"
                disabled={button.lock}
                onClick={getLockToken}
              >
                Lock
              </button>
            </div>
          </div>
        </CardComponent>
      </>
    );
  }
}
export default ContractData;
