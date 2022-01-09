// Next.js detects if deployed on vercel, or running locally
const IS_PROD = process.env.NODE_ENV === "production";

// Retrieve the name of the network the contract is deployed on
export const NETWORK_ID = process.env.NEXT_PUBLIC_NETWORK_ID;

export const ETHERSCAN_API_KEY = process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY;
export const INFURA_ID = process.env.NEXT_PUBLIC_INFURA_ID;
export const INFURA_SECRET = process.env.NEXT_PUBLIC_INFURA_SECRET;

// Hard-coded contract addresses so easy to change in development
const DEV_CONTRACT_ADDRESS = "0x4Dfe70B48C18fBf53c6BA0435995B2953FEBb1DD";

// Address of the contract is fetched from env vars in production, but hard-coded when in development
export const CONTRACT_ADDRESS = IS_PROD
  ? process.env.NEXT_PUBLIC_CONTRACT_ADDRESS
  : DEV_CONTRACT_ADDRESS;

export const NETWORKS = {
  1: { name: "Ethereum Mainnet", txUrl: "https://etherscan.io/tx/" },
  4: { name: "Rinkeby Testnet", txUrl: "https://rinkeby.etherscan.io/tx/" },
  137: { name: "Matic Mainnet", txUrl: "https://polygonscan.com/tx/" },
  8001: {
    name: "Matic Mumbai Testnet",
    txUrl: "https://mumbai.polygonscan.com/tx/",
  },
};
