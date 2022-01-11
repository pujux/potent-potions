import { MerkleTree } from "merkletreejs";
import keccak256 from "keccak256";
import { IS_PROD } from "./config";

let whitelistAddresses = [];
if (IS_PROD) whitelistAddresses = require("./whitelist.json");
else whitelistAddresses = require("./whitelist.test.json");

const merkleTree = new MerkleTree(
  whitelistAddresses.map(keccak256),
  keccak256,
  { sortPairs: true },
);

export default merkleTree;
