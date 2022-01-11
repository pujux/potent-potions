import { useState, useEffect } from "react";
import classnames from "classnames";
import { utils } from "ethers";
import { LogoutIcon } from "@heroicons/react/solid";

import useWeb3Container from "../hooks/useWeb3User";
import AddressPill from "./AddressPill";
import Button from "./Button";
import ConnectModal from "./ConnectWalletModal";

/**
 * Navigation bar that enables connect/disconnect from Web3.
 */
const Navbar = ({
  availableTokenInfo,
}: {
  availableTokenInfo: { supply: number; minted: number };
}) => {
  const { wallet, ensName } = useWeb3Container.useContainer();
  const { status, reset, account, balance } = wallet;
  const [connectModalIsOpen, setConnectModalIsOpen] = useState(false);
  const formattedETH = parseFloat(utils.formatUnits(balance || 0)).toFixed(2);

  const handleConnect = () => {
    wallet.connect("injected").then(() => {
      setConnectModalIsOpen(false);
      localStorage.setItem("wallet-status", 1);
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("wallet-status");
    reset();
  };

  useEffect(() => {
    if (localStorage.getItem("wallet-status") == 1) handleConnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <nav className="absolute top-0 z-50 flex-col justify-center w-full p-4 space-y-2 md:p-8 md:justify-end">
      <ConnectModal
        isOpen={connectModalIsOpen}
        close={() => setConnectModalIsOpen(false)}
        handleConnect={handleConnect}
      />
      <div className="flex items-center justify-center space-x-2 md:justify-end">
        {status === "connected" ? (
          <AddressPill
            address={account ? account : ""}
            ensName={ensName}
            balance={formattedETH}
            handleLogout={handleLogout}
          />
        ) : (
          <Button
            bgColor="gray-100"
            textColor="black"
            onClick={() => setConnectModalIsOpen(true)}
          >
            Connect Wallet
          </Button>
        )}
      </div>
      {status === "connected" &&
        availableTokenInfo.minted >= 0 &&
        availableTokenInfo.supply > 0 && (
          <div className="flex items-center justify-center space-x-2 md:justify-end">
            <div className="inline-flex items-center bg-gray-100 rounded-full dark:text-black">
              <div className="px-4 py-2 overflow-hidden text-sm font-medium whitespace-nowrap overflow-ellipsis">
                Minted: {availableTokenInfo.minted} /{" "}
                {availableTokenInfo.supply}
              </div>
            </div>
          </div>
        )}
    </nav>
  );
};

export default Navbar;
