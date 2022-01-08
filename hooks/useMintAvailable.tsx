import { useState, useEffect } from "react";
import { useContainer } from "unstated-next";
import web3UserContainer from "./useWeb3User";
import { toast } from "react-hot-toast";
import { PotionLabV2 } from "../typechain";
import { ethers } from "ethers";

const useMintAvailable = (merkleProof: string[]) => {
  const [isLoading, setLoading] = useState<boolean>();
  const [available, setAvailable] = useState<boolean>();
  let { contract, wallet } = useContainer(web3UserContainer);

  const update = async () => {
    setLoading(true);
    try {
      if (!contract) {
        console.error(`provider or contract is unavailable.`);
        return;
      } else {
        if (merkleProof && wallet.account) {
          console.log(merkleProof, wallet.account);
          setAvailable(await contract.canMint(wallet.account, merkleProof));
        }
      }
    } catch (error: any) {
      console.error({ error });
    }
    setLoading(false);
  };

  useEffect(() => {
    void update();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contract]);

  return { available, isLoading, update };
};

export { useMintAvailable };
