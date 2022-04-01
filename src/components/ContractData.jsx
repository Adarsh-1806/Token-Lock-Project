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
  const [button, setButton] = useState({ lock: true, approval: false });
  const tokenRef = useRef();
  const amount = useRef();
  const time = useRef();
  const dispatch = useDispatch();
  async function getApproval() {
    const tokenAmount = amount.current.value;
    const unlockTime = time.current.value;
    if (tokenAmount == 0) {
      alert("amount should not be 0");
      return;
    }
    setButton({ ...button, approve: true });
    await data.tokenContract
      .approve(data.lockContract.address, tokenAmount)
      .then((result) => {
        data.tokenContract.on("Approval", (owner, spender, value) => {
          setData({
            ...data,
            tokenAmount,
            unlockTime,
          });
          setButton({ ...button, lock: false });
        });
      })
      .catch((e) => {
        console.log(e);
        setButton({ ...button, approve: false });
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
      setButton({ ...button, lock: true });
    });
  }
  function handleMaxbtn() {
    setData({ ...data, val: data.bal });
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
            onClick={() => {
              if (tokenRef.current.value === "") {
                alert("Address is empty");
                return;
              }
              if (tokenRef.current.value.toString().length !== 42) {
                alert("invalid token address");
                console.log(tokenRef.current.value.toString().length);
                return;
              }
              try {
                dispatch(getContract(tokenRef.current.value, signer, account));
              } catch (error) {
                console.log(error);
              }
            }}
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
          <div className="p-4">
            <div className="header d-flex  align-items-center data-field">
              <div className="col-8 ">
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
              <div className="col-4">
                <div className="text-center">
                  <label>Balance:{data.bal}</label>
                </div>
                <div className="text-center">
                  <h4 className="mb-0">{data.symbol}</h4>
                </div>
              </div>
            </div>
            <div className="header d-flex  align-items-center data-field">
              <div className="col-8 ">
                <label>Unlock Time</label>
                <div>
                  <input className="w-25" type="text" required ref={time} />
                </div>
              </div>
              <div className="col-4">
                <Dropdown>
                  <Dropdown.Toggle variant="light" id="dropdown-basic">
                    Timestamp
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item>Days</Dropdown.Item>
                    <Dropdown.Item>Months</Dropdown.Item>
                    <Dropdown.Item>Timestamp</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
            <div className="d-flex align-items-center data-field justify-content-evenly">
              <button
                className="btn btn-success"
                disabled={button.approve}
                onClick={getApproval}
              >
                Approve
              </button>
              <button
                className="btn btn-success"
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
