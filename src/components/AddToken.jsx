import { useRef } from "react";
import LockToken from "./LockToken";
function AddToken(props) {
  const tokenAmount = useRef();
  const unLockTime = useRef();
  function handleAddToken() {
    console.log("Ok Adding Token..");
    const tokens = tokenAmount.current.value;
    const time = unLockTime.current.value;
    // <LockToken amount={tokens} time={time} stateData={}/>;
  }
  if (props.stateData.isConnected) {
    return (
      <>
        <label>Token Amount</label>
        <input type="text" required ref={tokenAmount} />
        <label>Unlock Time</label>
        <input type="text" required ref={unLockTime} />
        <button onClick={handleAddToken}>Add</button>
      </>
    );
  } else {
    return <h2>You need to connect Account</h2>;
  }
}
export default AddToken;
