import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

import useWeb3Container from "../hooks/useWeb3User";
import Button from "./button";
import { NETWORKS, NETWORK_ID } from "../helpers/config";

interface IProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export default function ChangeNetworkModal({ isOpen }: IProps) {
  const {
    wallet: { ethereum },
  } = useWeb3Container.useContainer();

  const handleChange = () => {
    if (isOpen) {
      ethereum
        ?.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: `0x${NETWORK_ID.toString(16)}` }],
        })
        .catch(() => console.error("switch wallet error"));
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={() => {}}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-30"
            leave="ease-in duration-200"
            leaveFrom="opacity-30"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 dialogue-overlay opacity-30" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-md my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <div className="flex flex-col">
                <div
                  className="flex flex-col justify-center p-6 py-8 transition-all duration-200 border-b border-gray-200 border-solid cursor-pointer hover:bg-gray-100"
                  onClick={handleChange}
                >
                  <div className="mt-1 text-center">
                    <h2 className="mb-4 text-3xl font-semibold dark:text-gray-900">
                      Change your network to {NETWORKS[NETWORK_ID].name}.
                    </h2>
                    <p className="text-xl text-gray-500">Click here</p>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
          <style jsx>{`
            :global(.dialogue-overlay) {
              background-color: black;
              opacity: 0.3;
            }
          `}</style>
        </div>
      </Dialog>
    </Transition>
  );
}
