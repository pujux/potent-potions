// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.info(`\n[DEPLOYMENT] Deployer: ${deployer.address}`);

  const PotionLabV2 = await ethers.getContractFactory("PotionLabV2");
  const lab = await PotionLabV2.deploy();

  console.info(`[DEPLOYMENT] PotionLabV2 Contract: ${lab.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
