// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {


  const zkNFT = await hre.ethers.getContractFactory("zkNFT");
  const zknft = await zkNFT.deploy();

  await zknft.deployed();

  console.log("zkNFT  deployed to:", zknft.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});


//  0xedC0F71bA3809E7C5eb1432f2783902a68900D3B   at this address it is already deployed at goerli network