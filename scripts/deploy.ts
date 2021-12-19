// `npx hardhat run <script>`
const { ethers } = require('hardhat')

async function main() {
  const [deployer] = await ethers.getSigners()

  console.log(`\n[DEPLOYMENT] Deployer: ${deployer.address}`)

  const PotionLabV1 = await ethers.getContractFactory('PotionLabV1')
  const lab = await PotionLabV1.deploy()

  console.log(`[DEPLOYMENT] PotionLabV1 Contract: ${lab.address}`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
