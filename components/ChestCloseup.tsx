/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { useState } from "react";
import useMediaQuery from "../hooks/useMediaQuery";
import { useMinting } from "../hooks/useMinting";

const ChestCloseup = ({ toggleCloseup, merkleProof }) => {
  const isSmall = useMediaQuery("(max-width: 600px)");
  const [amount, setAmount] = useState(1);
  const { mint, isLoading } = useMinting();
  return (
    <>
      <div
        className="absolute top-0 z-10 w-full h-full"
        style={{
          backgroundImage: `url(/assets/s1-chest-background.png)`,
          backgroundSize: "cover",
          opacity: 0.95,
        }}
      ></div>
      <div
        className="absolute top-0 z-20 flex flex-col items-center justify-center w-full h-full md:flex-row"
        onClick={toggleCloseup}
      >
        <img
          className="absolute w-full h-auto floating md:h-2/3 md:w-auto"
          src="/assets/s1-chest.png"
        ></img>
        <div
          className="absolute flex flex-col items-center justify-center floating"
          onClick={(e) => e.stopPropagation()}
        >
          <input
            className="w-1/3 mb-2 text-center border-2 rounded-xl md:w-1/3 md:text-4xl md:border-4"
            type="number"
            onChange={(e) => setAmount(parseInt(e.target.value))}
            min={1}
            max={5}
            value={amount}
          ></input>
          <img
            className="w-auto h-28 md:h-60"
            src="/assets/s1-gem-green-mint.png"
            onClick={(e) => {
              e.stopPropagation();
              void mint(amount, merkleProof);
            }}
          ></img>
        </div>
      </div>
      <style jsx>
        {`
          .floating {
            animation-name: floating;
            animation-iteration-count: infinite;
            animation-timing-function: ease-in-out;
            animation-duration: 3s;
          }

          @keyframes floating {
            0% {
              transform: translateY(${isSmall ? -25 : -50}px);
            }
            45% {
              transform: translateY(${isSmall ? 37.5 : 75}px);
            }
            100% {
              transform: translateY(${isSmall ? -25 : -50}px);
            }
          }

          @keyframes floating-gem {
            0% {
              transform: translateY(${isSmall ? -30 : -60}px);
            }
            45% {
              transform: translateY(${isSmall ? 42.5 : 87.5}px);
            }
            100% {
              transform: translateY(${isSmall ? -30 : -60}px);
            }
          }
        `}
      </style>
    </>
  );
};

export default ChestCloseup;
