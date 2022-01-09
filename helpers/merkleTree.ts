import { MerkleTree } from "merkletreejs";
import keccak256 from "keccak256";
import whitelistAddresses from "./whitelist.test.json";

const merkleTree = new MerkleTree(
  whitelistAddresses.map(keccak256),
  keccak256,
  { sortPairs: true },
);

export default merkleTree;
