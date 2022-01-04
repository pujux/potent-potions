/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { ERC1155Holder, ERC1155HolderInterface } from "../ERC1155Holder";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "onERC1155BatchReceived",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "onERC1155Received",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50610445806100206000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c806301ffc9a714610046578063bc197c811461006e578063f23a6e61146100bf575b600080fd5b610059610054366004610380565b6100f7565b60405190151581526020015b60405180910390f35b6100a661007c366004610277565b7fbc197c810000000000000000000000000000000000000000000000000000000095945050505050565b6040516001600160e01b03199091168152602001610065565b6100a66100cd36600461031d565b7ff23a6e610000000000000000000000000000000000000000000000000000000095945050505050565b60006001600160e01b031982167f4e2312e000000000000000000000000000000000000000000000000000000000148061015a57507f01ffc9a7000000000000000000000000000000000000000000000000000000006001600160e01b03198316145b92915050565b803573ffffffffffffffffffffffffffffffffffffffff8116811461018457600080fd5b919050565b600082601f830112610199578081fd5b8135602067ffffffffffffffff8211156101b5576101b56103e0565b8160051b6101c48282016103af565b8381528281019086840183880185018910156101de578687fd5b8693505b858410156102005780358352600193909301929184019184016101e2565b50979650505050505050565b600082601f83011261021c578081fd5b813567ffffffffffffffff811115610236576102366103e0565b610249601f8201601f19166020016103af565b81815284602083860101111561025d578283fd5b816020850160208301379081016020019190915292915050565b600080600080600060a0868803121561028e578081fd5b61029786610160565b94506102a560208701610160565b9350604086013567ffffffffffffffff808211156102c1578283fd5b6102cd89838a01610189565b945060608801359150808211156102e2578283fd5b6102ee89838a01610189565b93506080880135915080821115610303578283fd5b506103108882890161020c565b9150509295509295909350565b600080600080600060a08688031215610334578081fd5b61033d86610160565b945061034b60208701610160565b93506040860135925060608601359150608086013567ffffffffffffffff811115610374578182fd5b6103108882890161020c565b600060208284031215610391578081fd5b81356001600160e01b0319811681146103a8578182fd5b9392505050565b604051601f8201601f1916810167ffffffffffffffff811182821017156103d8576103d86103e0565b604052919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fdfea2646970667358221220ed980c12bf3c7d90ea7a37b2ecdd0cc2648396b7e0c9f7fff98437a7cf015fa564736f6c63430008040033";

export class ERC1155Holder__factory extends ContractFactory {
  constructor(
    ...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>
  ) {
    if (args.length === 1) {
      super(_abi, _bytecode, args[0]);
    } else {
      super(...args);
    }
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ERC1155Holder> {
    return super.deploy(overrides || {}) as Promise<ERC1155Holder>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): ERC1155Holder {
    return super.attach(address) as ERC1155Holder;
  }
  connect(signer: Signer): ERC1155Holder__factory {
    return super.connect(signer) as ERC1155Holder__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ERC1155HolderInterface {
    return new utils.Interface(_abi) as ERC1155HolderInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ERC1155Holder {
    return new Contract(address, _abi, signerOrProvider) as ERC1155Holder;
  }
}