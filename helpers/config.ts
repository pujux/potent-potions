export const IS_PROD = process.env.NODE_ENV === "production";

export const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;

const DEV_NETWORK_ID = 137;
export const NETWORK_ID = IS_PROD
  ? process.env.NEXT_PUBLIC_NETWORK_ID
  : DEV_NETWORK_ID;

const DEV_CONTRACT_ADDRESS = "0x4d948dcb3d584f038f3f6ed03070ebdb165f879b";
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
