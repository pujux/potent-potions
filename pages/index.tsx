import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useWallet } from "use-wallet";
import toast, { Toaster } from "react-hot-toast";
import { useTransition, animated } from "react-spring";
import Navbar from "../components/Navbar";
import ChestCloseup from "../components/ChestCloseup";
import { useEffect, useState } from "react";
import { useMintAvailable } from "../hooks/useMintAvailable";
import { NETWORK_ID } from "../helpers/config";
import ChangeNetworkModal from "../components/ChangeNetworkModal";
import useWeb3Container from "../hooks/useWeb3User";
import { useAvailableTokenInfo } from "../hooks/useAvailableTokenInfo";

const BACKGROUND_IMAGES = {
  open: "/assets/mint-background-open.png",
  closed: "/assets/mint-background-closed.png",
};

const BACKGROUND_SPARKLES = {
  open: "/assets/sparkles.gif",
  closed: "",
};

const Home: NextPage = () => {
  const { wallet } = useWeb3Container.useContainer();
  const { status, chainId } = wallet;
  const [background, setBackground] = useState("closed");
  const [closeUp, setCloseup] = useState(false);
  const [merkleProof, setMerkleProof] = useState([]);
  const toggleCloseup = () => setCloseup(!closeUp);

  const { available, update: updateMintAvailable } =
    useMintAvailable(merkleProof);

  const { availableTokenInfo } = useAvailableTokenInfo();

  useEffect(() => {
    if (status === "connected") {
      fetch(`/api/whitelist?address=${wallet.account}`).then(async (res) => {
        setMerkleProof(await res.json());
        updateMintAvailable();
      });
    }
    setCloseup(available && closeUp);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, available, closeUp, wallet]);

  const newBg = available && status === "connected" ? "open" : "closed";
  if (newBg !== background) setBackground(newBg);

  const handleClick = (e) => {
    switch (background) {
      case "open":
        if (status === "connected") toggleCloseup();
        else toast("Connect your wallet.", { icon: "👝" });
        break;
      case "closed":
        toast("The chest is closed. Wait for it to open up.", {
          icon: "💤",
        });
        break;
    }
  };

  return (
    <>
      <ChangeNetworkModal
        isOpen={status === "connected" && chainId != NETWORK_ID}
      />
      <div
        className="absolute top-0 left-0 w-screen h-screen"
        style={{
          backgroundImage: `url(${BACKGROUND_IMAGES[background]})`,
          backgroundPosition: `${
            background === "closed" ? "35" : "45"
          }% center`,
          backgroundSize: "cover",
          pointerEvents: "none",
        }}
      ></div>
      <div
        className="absolute top-0 left-0 w-screen h-screen"
        style={{
          backgroundImage: `url(${BACKGROUND_SPARKLES[background]})`,
          backgroundPosition: "45% center",
          backgroundSize: "cover",
          opacity: 0.35,
          pointerEvents: "none",
        }}
      ></div>
      <div>
        <Head>
          <title>Potent Potions - Season 2</title>
          <meta
            name="description"
            content="Join the fight to save the World of Potent Potions by collecting potions and keeping them away from the evil Professor!"
          />
          <link
            rel="icon"
            sizes="192x192"
            href="https://static.wixstatic.com/media/ced532_5e8241ddd0294b76b9ab251c3e129eee%7Emv2.png/v1/fill/w_32%2Ch_32%2Clg_1%2Cusm_0.66_1.00_0.01/ced532_5e8241ddd0294b76b9ab251c3e129eee%7Emv2.png"
          />
          <link
            rel="shortcut icon"
            href="https://static.wixstatic.com/media/ced532_5e8241ddd0294b76b9ab251c3e129eee%7Emv2.png/v1/fill/w_32%2Ch_32%2Clg_1%2Cusm_0.66_1.00_0.01/ced532_5e8241ddd0294b76b9ab251c3e129eee%7Emv2.png"
            type="image/png"
          />
          <link
            rel="apple-touch-icon"
            href="https://static.wixstatic.com/media/ced532_5e8241ddd0294b76b9ab251c3e129eee%7Emv2.png/v1/fill/w_32%2Ch_32%2Clg_1%2Cusm_0.66_1.00_0.01/ced532_5e8241ddd0294b76b9ab251c3e129eee%7Emv2.png"
            type="image/png"
          />
        </Head>
        <Toaster position="bottom-right" reverseOrder={true} />
        <Navbar availableTokenInfo={availableTokenInfo} />
        <div className="z-50 w-screen h-screen" onClick={handleClick}></div>
        {closeUp && (
          <ChestCloseup
            toggleCloseup={toggleCloseup}
            merkleProof={merkleProof}
          />
        )}
      </div>
    </>
  );
};

export default Home;
