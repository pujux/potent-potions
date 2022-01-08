import { useState, useEffect } from "react";
import { createContainer } from "unstated-next";
import {
  Web3Provider,
  JsonRpcProvider,
  BaseProvider,
  InfuraProvider,
} from "@ethersproject/providers";

import { ethers, Contract } from "ethers";
import { useWallet } from "use-wallet";

import PotionLabV2 from "../artifacts/contracts/s2/PotionLabV2.sol/PotionLabV2.json";
import {
  CONTRACT_ADDRESS,
  NETWORK_NAME,
  ETHERSCAN_API_KEY,
  INFURA_ID,
  INFURA_SECRET,
} from "../helpers/config";
import { PotionLabV2 as PotionLabV2Contract } from "../typechain";

const Web3UserState = () => {
  const wallet = useWallet();
  const { networkName, account, ethereum } = wallet;

  const [ensName, setEnsName] = useState<null | string>(null); // If the user has an ENS name, it gets set here.
  const [provider, setProvider] = useState<InfuraProvider>(null); // Ethers provider
  const [contract, setContract] = useState<PotionLabV2Contract | null>(null); // Token contract

  useEffect(() => {
    if (account) {
      initializeData(account);
    }

    async function initializeData(address: string) {
      const provider = new ethers.providers.Web3Provider(wallet.ethereum);
      setProvider(provider);

      if (!CONTRACT_ADDRESS)
        return console.error("Could not find contract address");

      // Create contract
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        PotionLabV2.abi,
        provider,
      ) as PotionLabV2Contract;
      setContract(contract);

      let ensName;
      if (networkName === "main") {
        ensName = await provider.lookupAddress(address);
        setEnsName(ensName);
      }
    }
  }, [account, ethereum, networkName]);

  return { wallet, ensName, provider, contract };
};

const web3UserContainer = createContainer(Web3UserState);

export default web3UserContainer;
