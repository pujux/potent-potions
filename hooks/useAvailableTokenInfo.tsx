import { useState, useEffect, useCallback } from "react";
import { useContainer } from "unstated-next";
import web3UserContainer from "./useWeb3User";
import { toast } from "react-hot-toast";
import { PotionLabV2 } from "../typechain";
import { ethers } from "ethers";

const useAvailableTokenInfo = () => {
  const [isLoading, setLoading] = useState(false);
  const [availableTokenInfo, setAvailableTokenInfo] = useState({
    supply: -1,
    minted: -1,
  });
  const { contract, wallet } = useContainer(web3UserContainer);

  const update = async () => {
    setLoading(true);
    try {
      if (wallet.account) {
        if (!contract) {
          console.error(`provider or contract is unavailable.`);
        } else {
          console.debug("fetching token availability for " + wallet.account);
          setAvailableTokenInfo({
            supply: await contract.maxSupply(),
            minted: await contract.currentId(),
          });
        }
      }
    } catch (error: any) {
      console.error({ error });
    }
    setLoading(false);
  };

  useEffect(() => {
    update();
    const interval = setInterval(update, 2500);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contract]);

  return { availableTokenInfo, isLoading };
};

export { useAvailableTokenInfo };
