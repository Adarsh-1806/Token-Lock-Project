import GetContract from "./GetContract";
import { useState } from "react";
import { useRef } from "react";
import "./LockToken.css";
function LockToken(props) {
  const tokenAmount = useRef();
  const unlockTime = useRef();
  const [state, setState] = useState({});

  async function handleApprove() {
    const tokens = tokenAmount.current.value;
    const time = unlockTime.current.value;
    setState({ tokenAmount: tokens, unlockTime: time });
    await state.token.approve(state.lock.address, tokens);
  }

  async function handleLock() {
    await props.stateData.lockContract.lockToken(
      props.stateData.tokenContract.address,
      state.tokenAmount,
      state.unlockTime
    );
    console.log(await props.stateData.lockContract);
  }
  async function data(contracts) {
    const bal = await contracts.tokenContract.balanceOf(
      props.stateData.account
    );
    const balance = parseInt(parseInt(bal._hex, 16));
    const symbol = await contracts.tokenContract.symbol();
    setState({
      balance: balance,
      symbol: symbol,
      token: contracts.tokenContract,
      lock: contracts.lockContract,
    });
  }
  if (props.stateData.isConnected) {
    return (
      <>
        <GetContract
          provider={props.stateData}
          getData={data}
          updateState={props.editStateData}
        />
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="card w-50 ">
              <div className="header d-flex">
                <div className="col-8  data-field">
                  <label> Token Amount</label>
                  <div>
                    <input
                      className="w-25 "
                      type="text"
                      required
                      ref={tokenAmount}
                    />
                    <button>max</button>
                  </div>
                </div>
                <div className="col-4 data-field">
                  <label>Balance:{state.balance}</label>
                  <span>{state.symbol}</span>
                </div>
              </div>
              <div className="header d-flex">
                <div className="col-8 data-field">
                  <label>Unlock Time</label>
                  <input
                    className="w-25"
                    type="text"
                    required
                    ref={unlockTime}
                  />
                </div>
                <div className="col-4 data-field">
                  <label>Balance:...</label>
                  <span>Token</span>
                </div>
              </div>
              <div className="d-flex justify-content-evenly">
                <button onClick={handleApprove}>Approve</button>
                <button onClick={handleLock}>Lock</button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return <h1>Connect Wallet</h1>;
  }
}
export default LockToken;
