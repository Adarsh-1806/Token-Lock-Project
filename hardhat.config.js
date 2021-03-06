require("@nomiclabs/hardhat-waffle");
const ALCHEMY_API_KEY = "868412380c3b4a13bfd60c45ff18005f";
const RINKEBY_PRIVATE_KEY =
  "604479196f566546d0734ed4967e37a8fabfff8b0e142f4fb6fef5bf67ae8c25";
// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
// task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
//   const accounts = await hre.ethers.getSigners();

//   for (const account of accounts) {
//     console.log(account.address);
//   }
// });

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.11",
  paths: {
    artifacts: "./src/artifacts",
  },
  networks: {
    hardhat: {
      chainId: 1337,
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${ALCHEMY_API_KEY}`,
      accounts: [`${RINKEBY_PRIVATE_KEY}`],
      gas: 7000000,
    },
  },
};
