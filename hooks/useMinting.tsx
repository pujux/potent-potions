import { useState, useEffect } from "react";
import { useContainer } from "unstated-next";
import web3UserContainer from "./useWeb3User";
import { toast } from "react-hot-toast";
import { ExternalLinkIcon } from "@heroicons/react/solid";
import { NETWORKS, NETWORK_ID } from "../helpers/config";

const useMinting = () => {
  const [isLoading, setIsLoading] = useState(false);
  let {
    provider,
    contract,
    wallet: { account },
  } = useContainer(web3UserContainer);

  const ERROR_MESSAGES = {
    NO_EMPTY_AMOUNT: async () =>
      `Cannot mint 0 tokens, please specify an amount between 1 and ${await contract.getQuotum(
        account,
      )}.`,
    NO_SALE: () => "The sale hasn't started yet.",
    NO_SUPPLY: () => "Sorry! We are sold out!",
    WRONG_VALUE: () => "Wrong value! Please try again.",
    WRONG_AMOUNT: () => "VIP Mints are restricted to 1 token.",
    QUOTUM_REACHED: async () =>
      `Cannot mint that many tokens. You can still mint ${await contract.getQuotum(
        account,
      )}.`,
    INSUFFICIENT_FUNDS: () => "Insufficient funds.",
    NOT_WHITELISTED: () => "You are not whitelisted. Wait for the public sale.",
    4001: () => "Transaction cancelled.",
  };

  async function mint(amount: number, merkleProof: any) {
    setIsLoading(true);
    if (!provider || !contract || !merkleProof) {
      console.error(
        `provider/contract is unavailable or merkle proof is undefined.`,
      );
      return;
    }

    const signer = await provider.getSigner();
    const contractWithSigner = contract.connect(signer);

    try {
      const mintPrice = await contract.mintPrice();
      const value = mintPrice.mul(amount).toHexString();
      const isVipMint = await contract.vipMints(account);
      const transaction = await contractWithSigner.mint(amount, merkleProof, {
        value: isVipMint ? 0 : value,
      });
      const { hash } = transaction;
      const transactionEtherscanUrl = `${NETWORKS[NETWORK_ID].txUrl}${hash}`;

      await toast.promise(transaction.wait(), {
        loading: (
          <span className="flex items-center space-x-4">
            Transaction submitted{" "}
            <a
              className="inline-block ml-2 font-bold"
              target="_blank"
              rel="noreferrer"
              href={transactionEtherscanUrl}
            >
              <ExternalLinkIcon fill="#000000" className="w-4 h-4" />
            </a>
          </span>
        ),
        success: (
          <span className="flex items-center space-x-4">
            Transaction confirmed{" "}
            <a
              className="inline-block ml-2 font-bold"
              target="_blank"
              rel="noreferrer"
              href={transactionEtherscanUrl}
            >
              <ExternalLinkIcon fill="#000000" className="w-4 h-4" />
            </a>
          </span>
        ),
        error: "Error submitting transaction",
      });

      const response = await transaction.wait();

      // wait() returns null if the transaction has not been mined
      if (response === null) toast.error("Transaction has not been mined");
      setIsLoading(false);
    } catch (error: any) {
      let errorKey;
      try {
        errorKey =
          error.error?.message?.replace("execution reverted: ", "") ??
          error.code;
        toast.error(await ERROR_MESSAGES[errorKey]());
      } catch (e: any) {
        console.error(errorKey, error);
        toast.error(
          "An unexpected error happened. Please try refreshing or contact our team.",
        );
      }
      setIsLoading(false);
    }
  }

  return { mint, isLoading };
};

export { useMinting };
