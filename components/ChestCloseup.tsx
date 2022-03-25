/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { useState } from "react";
import useMediaQuery from "../hooks/useMediaQuery";
import { toast } from "react-hot-toast";
import { useMinting } from "../hooks/useMinting";

const ChestCloseup = ({ toggleCloseup, merkleProof }) => {
  const isSmall = useMediaQuery("(max-width: 600px)");
  const { mint, isLoading } = useMinting();
  const [amount, setAmount] = useState(1);

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
          className="absolute flex flex-col items-center justify-center pb-4 -mt-8 floating"
          onClick={(e) => e.stopPropagation()}
        >
          <input
            className="w-1/3 font-black text-center text-black border-4 border-black rounded-xl md:w-1/3 md:text-4xl md:border-[6px]"
            style={{ minWidth: isSmall ? "50px" : "75px" }}
            type="number"
            onChange={(e) => setAmount(parseInt(e.target.value))}
            min={1}
            max={4}
            value={amount}
          ></input>
          <img
            className="w-auto h-32 -mt-1 sm:h-44 md:h-56"
            // style={{ maxHeight: "20vh" }}
            src="/assets/s1-gem-green-mint.png"
            onClick={(e) => {
              e.stopPropagation();
              if (isLoading)
                toast.error("Please finish your last transaction request.");
              else void mint(amount, merkleProof);
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
            animation-duration: 4s;
          }

          @keyframes floating {
            0% {
              transform: translateY(${isSmall ? -12 : -24}px);
            }
            45% {
              transform: translateY(${isSmall ? 18 : 36}px);
            }
            100% {
              transform: translateY(${isSmall ? -12 : -25}px);
            }
          }
        `}
      </style>
    </>
  );
};

export default ChestCloseup;
