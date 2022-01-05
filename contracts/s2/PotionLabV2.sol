//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "./../ArrayUtils.sol";

contract PotionLabV2 is ERC721URIStorage, Ownable {
    uint16 public maxSupply = 3333;
    uint16 public currentId = 0;
    uint8 public maxMint = 4;

    bytes32 public whiteListMerkleRoot;
    string public baseURI =
        "ipfs://QmenmKXa1j7dvStusfBLbbsL4duWcoqMw5F5PEsLaRKXQM/";

    uint256 public mintPrice;

    mapping(address => uint8) public minted;

    bool public preSale;
    bool public publicSale;
    bool public startedWhitelist;

    event PotionsMinted(address indexed to, uint256 amount, uint256 lastId);

    constructor() ERC721("POTIONS V2", "POTION2") {
        super;
    }

    function contractURI() public pure returns (string memory) {
        return "";
    }

    function setWhitelistRoot(bytes32 merkleRoot) public onlyOwner {
        require(!startedWhitelist, "WHITELIST_SET");
        whiteListMerkleRoot = merkleRoot;
        startedWhitelist = true;
    }

    function startPresale() public onlyOwner {
        require(startedWhitelist, "WHITELIST_FIRST");
        require(!publicSale, "PRESALE_OVER");
        (preSale, mintPrice) = (true, 0.005 ether);
    }

    function startPublicSale() public onlyOwner {
        require(preSale, "PRESALE_FIRST");
        (preSale, publicSale, mintPrice) = (publicSale, preSale, 0.01 ether);
    }

    function canMint(address wallet, bytes32[] calldata _merkleProof)
        public
        view
        returns (bool)
    {
        bool allowed = minted[wallet] < maxMint && (preSale || publicSale);
        if (preSale) {
            bytes32 leaf = keccak256(abi.encodePacked(wallet));
            return
                allowed &&
                MerkleProof.verify(_merkleProof, whiteListMerkleRoot, leaf);
        } else {
            return allowed;
        }
    }

    function totalSupply() public view returns (uint256) {
        return maxSupply;
    }

    function mint(uint256 amount, bytes32[] calldata _merkleProof)
        external
        payable
    {
        require(msg.value > 0, "NO_EMPTY_VALUE");
        require(amount > 0, "NO_EMPTY_AMOUNT");
        require(preSale || publicSale, "NO_SALE");
        require(currentId + amount <= maxSupply, "NO_SUPPLY");
        require(minted[msg.sender] + amount <= maxMint, "QUOTUM_REACHED");
        require(msg.value / amount == mintPrice, "WRONG_VALUE");

        if (preSale) {
            bytes32 leaf = keccak256(abi.encodePacked(msg.sender));
            require(
                MerkleProof.verify(_merkleProof, whiteListMerkleRoot, leaf),
                "NOT_WHITELISTED"
            );
        }

        uint256 counter = amount;
        while (counter > 0) {
            counter--;
            currentId++;
            _mint(msg.sender, currentId);
            _setTokenURI(
                currentId,
                string(
                    abi.encodePacked(
                        baseURI,
                        Strings.toString(currentId),
                        ".json"
                    )
                )
            );
        }
        minted[msg.sender] += uint8(amount);
        emit PotionsMinted(msg.sender, amount, currentId);
    }
}
