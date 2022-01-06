// Next.js detects if deployed on vercel, or running locally
const IS_PROD = process.env.NODE_ENV === "production";

// Retrieve the name of the network the contract is deployed on
export const NETWORK_NAME = process.env.NEXT_PUBLIC_NETWORK_NAME;

export const ETHERSCAN_API_KEY = process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY;
export const INFURA_ID = process.env.NEXT_PUBLIC_INFURA_ID;
export const INFURA_SECRET = process.env.NEXT_PUBLIC_INFURA_SECRET;

// Hard-coded contract addresses so easy to change in development
const DEV_CONTRACT_ADDRESS = "0xEC61cd7dB8d11A751C8039d29c9fc05e3160cc98";

// Address of the contract is fetched from env vars in production, but hard-coded when in development
export const CONTRACT_ADDRESS = IS_PROD
  ? process.env.NEXT_PUBLIC_CONTRACT_ADDRESS
  : DEV_CONTRACT_ADDRESS;
