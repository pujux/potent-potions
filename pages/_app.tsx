import "../styles/globals.css";
import "tailwindcss/tailwind.css";

import type { AppProps } from "next/app";

import { ThemeProvider } from "next-themes";
import { UseWalletProvider } from "use-wallet";
import Web3UserProvider from "../hooks/web3UserProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 dark:text-white">
      <UseWalletProvider
        chainId={4}
        autoConnect={true}
        pollBlockNumberInterval={2500}
        pollBalanceInterval={2500}
        connectors={{
          walletconnect: { chainId: 137, rpcUrl: "https://polygon-rpc.com" },
        }}
      >
        <Web3UserProvider>
          <Component {...pageProps} />
        </Web3UserProvider>
      </UseWalletProvider>
    </div>
  );
}
export default MyApp;
