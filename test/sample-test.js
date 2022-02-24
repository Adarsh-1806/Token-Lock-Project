const { expect } = require("chai");
const { ethers } = require("hardhat");
let owner;
let addr1;
let Token;
let token;
let Lock;
let lock;
beforeEach(async function(){
  Token = await ethers.getContractFactory("Token");
  token = await Token.deploy(10000);

  Lock = await ethers.getContractFactory("Lock");
  lock = await Lock.deploy();

  [owner,addr1] = await ethers.getSigners();
});
describe("Testing", function () {
  it("Should return the new greeting once it's changed", async function () {
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
  //   console.log("Token address: ",token.address);
  //   const [owner,addr1] = await ethers.getSigners();
  //   expect(await token.balanceOf(owner.address)).to.equal(10000);
  //   await token.transfer(addr1.address, 500);
  //   expect(await token.balanceOf(owner.address)).to.equal(10000-500);
  //   expect(await token.balanceOf(addr1.address)).to.equal(500);
  //   console.log(await token.balanceOf(addr1.address));
  });

  it("Create and lock token into contract", async function () {
    const tokenAdd = token.address;
    const reciever = addr1.address;
    console.log("Contract Address:",tokenAdd);
    //now lock the tokens in contract
    // expect(await token.balanceOf(owner.address)).to.equal(10000);
    await lock.connect(owner).lockToken(tokenAdd,500,10,reciever);
    await token.transfer(lock.address,500);

    await token.transfer(addr1.address, 2000);
    await lock.connect(addr1).lockToken(tokenAdd,1000,10,reciever);
    await token.connect(addr1).transfer(lock.address,1000);

    console.log("contract Balance:" ,await lock.contractTokens(tokenAdd));

    const tokenDetail = await lock.getDetails(addr1.address);
    console.log(tokenDetail);
    // console.log("After:: owner:",token.balanceOf(owner.address)," addr1:",token.balanceOf(addr1.address," Contract:",token.balanceOf(lock.address)));
  });
});
