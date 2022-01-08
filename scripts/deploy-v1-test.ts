// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.info(`\n[DEPLOYMENT] Deployer: ${deployer.address}`);

  const TestERC1155 = await ethers.getContractFactory("TestERC1155");
  const test = await TestERC1155.deploy();

  console.info(`[DEPLOYMENT] TestERC1155 Contract: ${test.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
