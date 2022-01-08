import { useState, useEffect } from "react";
import { useContainer } from "unstated-next";
import web3UserContainer from "./useWeb3User";
import { toast } from "react-hot-toast";
import { ExternalLinkIcon } from "@heroicons/react/solid";

const ERROR_MESSAGES = {
  NO_EMPTY_VALUE: "Don't try to send transactions without value.",
  NO_EMPTY_AMOUNT:
    "Cannot mint 0 tokens, please specify an amount between 1 and 4.",
  NO_SALE: "The sale hasn't started yet.",
  NO_SUPPLY: "Sorry! We are sold out!",
  WRONG_VALUE: "Wrong value! Please try again.",
  QUOTUM_REACHED:
    "You cannot mint that many tokens. The maximum per wallet is 4.",
  INSUFFICIENT_FUNDS: "Insufficient funds.",
};

const useMinting = () => {
  const [isLoading, setIsLoading] = useState(false);
  let { provider, contract } = useContainer(web3UserContainer);

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
      const transaction = await contractWithSigner.mint(amount, merkleProof, {
        value,
      });
      const { hash } = transaction;
      const transactionEtherscanUrl = `https://rinkeby.etherscan.io/tx/${hash}`;

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
      try {
        toast.error(
          ERROR_MESSAGES[
            error.code ||
              error.error.message.replace("execution reverted: ", "")
          ],
        );
      } catch (e) {
        console.error(e);
      }
      setIsLoading(false);
    }
  }

  return { mint, isLoading };
};

export { useMinting };
