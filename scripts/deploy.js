const hre = require("hardhat");
async function main() {
  const Token = await hre.ethers.getContractFactory("Token");
  const token = await Token.deploy(1000000);
  await token.deployed();
  let owner = await hre.ethers.getSigner();
  console.log("ERC20 contract address:", token.address);
  console.log("Owner:", owner.address);

  const Lock = await hre.ethers.getContractFactory("Lock");
  const lock = await Lock.deploy();
  await lock.deployed();
  console.log("Lock contract address:", lock.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
