import NavBar from "./NavBar";
import AllTransactions from "./AllTransactions";
import lock from "./images/lock.svg";
import sell from "./images/sell.svg";
import laptop from "./images/laptop.svg";
import Footer from "./Footer";
function Home() {
  return (
    <>
      <section className="container-fluid bg-primary topheader">
        <div>
          <NavBar />
        </div>
        <div className="text-white">
          <div className="title-block d-flex justify-content-center">
            <h1>Smart Lock</h1>
          </div>
          <p className="d-flex justify-content-center">
            Liquidity Locking & Team Vesting for Token Founders and Community
          </p>
        </div>
        <div className="section-item text-white">
          <section className=" d-flex justify-content-center ">
            <div className="image-item ">Image</div>
            <div className="content-item">
              <h1>$ 6,158,871,211.97</h1>
              <p>Total Locked Token Value</p>
            </div>
          </section>
        </div>
      </section>
      <section className="explore-container">
        <AllTransactions />
      </section>
      <section className="moreinfo-container">
        <div className="container py-5">
          <div className="d-flex justify-content-center">
            <h4>Easy Liquidity Locking & Token Vesting</h4>
          </div>
          <div className="d-flex">
            <div class="card info-card m-2">
              <img src={lock} class="card-img-top" alt="lock" />
              {/* <h5 class="card-title">Lock Liquidity</h5> */}
              <div class="card-body">
                <p class="card-text">
                  Input your liquidity tokens into a time-released vault that
                  returns the tokens at a specified date.
                </p>
              </div>
            </div>
            <div class="card info-card m-2">
              <img src={sell} class="card-img" alt="..." />
              <h5 class="card-title">Team Token Vesting</h5>
              <div class="card-body">
                <p class="card-text">
                  Create a vesting schedule for team members with specified
                  dates and token amounts.
                </p>
              </div>
            </div>
            <div class="card info-card m-2">
              <img src={laptop} class="card-img-top" alt="..." />
              {/* <h5 class="card-title">Public Facing Profile</h5> */}
              <div class="card-body">
                <p class="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Home;
