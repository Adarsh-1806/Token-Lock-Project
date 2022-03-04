import "./LockToken.css";
function LockToken(props) {
  return (
    <>
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="card w-50 ">
            <div className="header d-flex">
              <div className="col-8  data-field">
                <label> Lock Amount</label>
                <div>
                  <input className="w-25 " type="text" />
                  <button>max</button>
                </div>
              </div>
              <div className="col-4 data-field">
                <label>Balance:...</label>
                <span>Token</span>
              </div>
            </div>
            <div className="header d-flex">
              <div className="col-8 data-field">
                <label>Unlock Time</label>
                <input className="w-25" type="text" />
              </div>
              <div className="col-4 data-field">
                <label>Balance:...</label>
                <span>Token</span>
              </div>
            </div>
            <div className="d-flex justify-content-evenly">
              <button>Approve</button>
              <button>Lock</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default LockToken;
