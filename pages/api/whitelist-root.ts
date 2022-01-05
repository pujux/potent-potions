import merkleTree from "../../helpers/merkleTree";

export default function whitelistRoot(req, res) {
  res.json({ root: merkleTree.getHexRoot() });
}
