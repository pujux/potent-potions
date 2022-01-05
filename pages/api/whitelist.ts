import keccak256 from "keccak256";
import merkleTree from "../../helpers/merkleTree";

export default function whitelist(req, res) {
  const leaf = keccak256(req.query.address);
  res.json(merkleTree.getHexProof(leaf));
}
