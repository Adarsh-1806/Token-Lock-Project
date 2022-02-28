const hre = require("hardhat");
async function main() {
  // const Greeter = await hre.ethers.getContractFactory("Greeter");
  // const greeter = await Greeter.deploy("Hello, Hardhat!");
  // await greeter.deployed();
  // console.log("Greeter deployed to:", greeter.address);

  const Token = await hre.ethers.getContractFactory("Token");
  const token = await Token.deploy(1000000);
  await token.deployed();
  let owner = await hre.ethers.getSigner();
  console.log("ERC20 contract address:", token.address);
  console.log("Owner:",await owner.address);

  const Lock = await hre.ethers.getContractFactory("Lock");
  const lock = await Lock.deploy();
  await lock.deployed();
  console.log("Lock contract address:", lock.address);
  // console.log(token.owner().call());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
