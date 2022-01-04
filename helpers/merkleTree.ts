import { MerkleTree } from "merkletreejs";
import keccak256 from "keccak256";
import whitelistAddresses from "./whitelist.json";

const merkleTree = new MerkleTree(
  whitelistAddresses.map(keccak256),
  keccak256,
  { sortPairs: true },
);

console.log(merkleTree.getHexRoot());

export default merkleTree;
