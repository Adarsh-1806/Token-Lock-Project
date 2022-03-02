import React, { Component } from "react";
// import { Container } from "react-bootstrap";

class Navbar extends Component {
  state = {};
  render() {
    return (
      <>
        <div>
          <button onClick={this.conncect}>Connect</button>
        </div>
      </>
    );
  }
}

export default Navbar;
