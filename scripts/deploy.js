const hre = require("hardhat");
const fs = require("fs");
const os = require("os");

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

  function setEnvValue(key, value) {
    const ENV_VARS = fs.readFileSync(".env", "utf8").split(os.EOL);
    const target = ENV_VARS.indexOf(
      ENV_VARS.find((line) => {
        return line.match(new RegExp(key));
      })
    );
    ENV_VARS.splice(target, 1, `${key}=${value}`);
    fs.writeFileSync(".env", ENV_VARS.join(os.EOL));
  }
  setEnvValue("REACT_APP_CONTRACTADDRESS", lock.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
