import { useState } from "react";
import { useSelector } from "react-redux";
import "./ClaimToken.css";
import Footer from "./Footer";
import NavBar from "./NavBar";
function ClaimToken() {
  const [data, setData] = useState({});
  const state = useSelector((state) => state.connectMetamask);
  state.then((dt) => {
    console.log(dt);
    setData(dt);
  });
  return (
    <>
      <NavBar />
      <section className="bg-primary p-5">
        <div className="container bg-light rounded tablecontainer">
          {!data.isConnected ? (
            <div className=" d-flex justify-content-center align-items-center">
              <h1 className="mt-3">Connect Wallet</h1>
            </div>
          ) : (
            <div className="p-2">
              <h3>Tokens</h3>
              <div>
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">First</th>
                      <th scope="col">Last</th>
                      <th scope="col">Handle</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>Mark</td>
                      <td>Otto</td>
                      <td>@mdo</td>
                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td>Jacob</td>
                      <td>Thornton</td>
                      <td>@fat</td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td colspan="2">Larry the Bird</td>
                      <td>@twitter</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}

export default ClaimToken;
