const { expect } = require("chai");
const { ethers } = require("hardhat");
let owner;
let addr1;
let addr2;
// let addrs;
let token;
let token2;
let lock;
beforeEach(async function () {
  let Token = await ethers.getContractFactory("Token");
  token = await Token.deploy(10000);

  let Token2 = await ethers.getContractFactory("Token");
  token2 = await Token2.deploy(20000);

  let Lock = await ethers.getContractFactory("Lock");
  lock = await Lock.deploy();

  [owner, addr1, addr2] = await ethers.getSigners();
});
describe("Testing", function () {
  // it("Should return the new greeting once it's changed", async function () {
  //   const Greeter = await ethers.getContractFactory("Greeter");
  //   const greeter = await Greeter.deploy("Hello, world!");
  //   await greeter.deployed();

  //   expect(await greeter.greet()).to.equal("Hello, world!");

  //   const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

  //   // wait until the transaction is mined
  //   await setGreetingTx.wait();

  //   expect(await greeter.greet()).to.equal("Hola, mundo!");
  // });

  // it("Basic deployment of ERC20 token", async function () {
  //   // console.log("Token address: ",token.address);
  //   const [owner, addr1] = await ethers.getSigners();
  //   expect(await token.balanceOf(owner.address)).to.equal(10000);
  //   await token.transfer(addr1.address, 500);
  //   expect(await token.balanceOf(owner.address)).to.equal(10000 - 500);
  //   expect(await token.balanceOf(addr1.address)).to.equal(500);
  // });

  // it("Lock Tokens into Smart Contract(single account)", async function () {
  //   expect(await token.balanceOf(owner.address)).to.equal(10000);
  //   await lock.lockToken(token.address, 1000, 10);
  //   await token.transfer(lock.address, 1000);
  //   expect(await token.balanceOf(owner.address)).to.equal(9000);
  //   expect(await lock.tokenBalanceOf(token.address)).to.equal(1000);
  //   expect(await lock.myTokenBalance(token.address)).to.equal(1000);
  //   await lock.lockToken(token.address, 500, 10);
  //   await token.transfer(lock.address, 500);
  //   expect(await lock.myTokenBalance(token.address)).to.equal(1500);
  //   expect(await token.balanceOf(owner.address)).to.equal(8500);
  // });
  // it("Lock Tokens into Smart Contract(multiple account)", async function () {
  //   expect(await token.balanceOf(owner.address)).to.equal(10000);
  //   await token.transfer(addr1.address, 5000);

  //   await lock.lockToken(token.address, 1000, 10);
  //   await token.transfer(lock.address, 1000);
  //   await lock.connect(addr1).lockToken(token.address, 1500, 10);
  //   await token.transfer(lock.address, 1500);

  //   expect(await lock.tokenBalanceOf(token.address)).to.equal(2500);
  //   expect(await lock.connect(owner).myTokenBalance(token.address)).to.equal(
  //     1000
  //   );
  //   expect(await lock.connect(addr1).myTokenBalance(token.address)).to.equal(
  //     1500
  //   );
  // });
  // it("Lock Multiple Tokens into Smart Contract", async function () {
  //   expect(await token.balanceOf(owner.address)).to.equal(10000);
  //   expect(await token2.balanceOf(owner.address)).to.equal(20000);

  //   await lock.lockToken(token.address, 1000, 10);
  //   await token.transfer(lock.address, 1000);
  //   await lock.lockToken(token2.address, 5000, 10);
  //   await token2.transfer(lock.address, 5000);

  //   expect(await lock.tokenBalanceOf(token.address)).to.equal(1000);
  //   expect(await lock.tokenBalanceOf(token2.address)).to.equal(5000);
  // });
  // it("Withdraw Token", async function () {
  //   await lock.lockToken(token.address, 1000, 5);
  //   await token.transfer(lock.address, 1000);
  //   function sleep(milliseconds) {
  //     const date = Date.now();
  //     let currentDate = null;
  //     do {
  //       currentDate = Date.now();
  //     } while (currentDate - date < milliseconds);
  //   }
  //   sleep(5000);
  //   await lock.withDrawToken(0);
  //   expect(await token.balanceOf(owner.address)).to.equal(10000);
  //   expect(await token.balanceOf(token.address)).to.equal(0);
  // });
  // it("Withdraw Token (multiple)", async function () {
  //   await lock.lockToken(token.address, 1000, 5);
  //   await token.transfer(lock.address, 1000);
  //   await lock.lockToken(token.address, 2000, 5);
  //   await token.transfer(lock.address, 2000);
  //   function sleep(milliseconds) {
  //     const date = Date.now();
  //     let currentDate = null;
  //     do {
  //       currentDate = Date.now();
  //     } while (currentDate - date < milliseconds);
  //   }
  //   sleep(5000);
  //   await lock.withDrawToken(1);
  //   expect(await token.balanceOf(owner.address)).to.equal(9000);
  //   expect(await token.balanceOf(lock.address)).to.equal(1000);
  // });
  // it("Display all the Locked Token", async function () {
  //   await token.transfer(addr1.address, 5000);
  //   await token.transfer(addr2.address, 3000);
  //   await token2.transfer(addr1.address, 4000);
  //   await token2.transfer(addr2.address, 5000);

  //   await lock.lockToken(token.address, 500, 10);
  //   await token.transfer(lock.address, 500);
  //   await lock.lockToken(token2.address, 2500, 10);
  //   await token2.transfer(lock.address, 2500);

  //   await lock.connect(addr1).lockToken(token.address, 2000, 10);
  //   await token.connect(addr1).transfer(lock.address, 2000);
  //   await lock.connect(addr1).lockToken(token2.address, 1000, 10);
  //   await token2.connect(addr1).transfer(lock.address, 1000);

  //   await lock.connect(addr2).lockToken(token.address, 1250, 10);
  //   await token.connect(addr2).transfer(lock.address, 1250);
  //   await lock.connect(addr2).lockToken(token2.address, 250, 10);
  //   await token2.connect(addr2).transfer(lock.address, 250);
  //   // const ids = await lock.getAllIds();
  //   // for (const i of ids) {
  //   //   console.log(await lock.getDetailsOf(i));
  //   // }
  //   console.log("Contract (token)", await lock.tokenBalanceOf(token.address));
  //   console.log("Contract (token2)", await lock.tokenBalanceOf(token2.address));

  //   console.log(
  //     "Addr1's Token",
  //     await lock.connect(addr1).myTokenBalance(token.address)
  //   );
  //   console.log(
  //     "Addr1's Token2",
  //     await lock.connect(addr1).myTokenBalance(token2.address)
  //   );

  //   console.log(
  //     "Addr2's Token",
  //     await lock.connect(addr2).myTokenBalance(token.address)
  //   );
  //   console.log(
  //     "Addr2's Token2",
  //     await lock.connect(addr2).myTokenBalance(token2.address)
  //   );
  // });
  it("Token Approve testing", async function () {
    await token.approve(addr1.address, 5000);
    console.log("Before:", await token.balanceOf(owner.address));
    await token.connect(addr1).transferFrom(owner.address, lock.address, 1000);
    console.log("After:", await token.balanceOf(owner.address));
    console.log("Conttract Balance:", await token.balanceOf(lock.address));
  });
  it("Lock Token With Approve", async function () {
    await token.approve(lock.address, 1000);
    console.log("Before:", await token.balanceOf(owner.address));
    await lock.lockToken(token.address, 500, 10);
    await lock.lockToken(token.address, 300, 15);
    console.log(await lock.myTransactions());
    console.log("After:", await token.balanceOf(owner.address));
    console.log("Conttract Balance:", await token.balanceOf(lock.address));
  });
});
