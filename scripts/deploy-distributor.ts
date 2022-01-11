import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.info(`\nDeployer: ${deployer.address}`);

  const RoyaltyDistributor = await ethers.getContractFactory(
    "RoyaltyDistributor",
  );
  const distributor = await RoyaltyDistributor.deploy();

  console.info(`RoyaltyDistributor Contract: ${distributor.address}`);
}

main().catch((error: any) => {
  console.error(error);
  process.exitCode = 1;
});
