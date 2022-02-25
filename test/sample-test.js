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
    const lockAdd = lock.address;
    const ownerAdd = owner.address;
    const reciever = addr1.address;
    console.log("Contract Address:",tokenAdd);
    //now lock the tokens in contract
    expect(await token.balanceOf(owner.address)).to.equal(10000);
    await lock.connect(owner).lockToken(tokenAdd,1000,5);
    await token.transfer(lockAdd,1000);
    
    await token.transfer(reciever, 2000);
    await lock.connect(addr1).lockToken(tokenAdd,1500,5);
    await token.connect(addr1).transfer(lockAdd,1500);
    
    console.log("Token Balance in Contract:" ,await lock.tokenBalanceOf(tokenAdd));
    console.log("Owner's Token:" ,await lock.getAmountOf(ownerAdd));
    console.log("Addr1's Token:" ,await lock.getAmountOf(reciever));
    
    function sleep(milliseconds) {
      const date = Date.now();
      let currentDate = null;
      do {
        currentDate = Date.now();
      } while (currentDate - date < milliseconds);
    }
    sleep(4000);
    console.log("Now withdraw before time");
    await lock.connect(owner).withDrawToken(0);
    await lock.connect(addr1).withDrawToken(0);
    console.log("Token Balance in Contract:" ,await lock.tokenBalanceOf(tokenAdd));
    console.log("Owner's Token:" ,await lock.getAmountOf(ownerAdd));
    console.log("Addr1's Token:" ,await lock.getAmountOf(reciever));
  });
});
