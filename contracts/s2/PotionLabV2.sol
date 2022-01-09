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
    mapping(address => bool) public vipMints;

    bool public preSale;
    bool public publicSale;
    bool public startedWhitelist;

    event PotionsMinted(address indexed to, uint256 amount, uint256 lastId);

    constructor() ERC721("POTIONS V2", "POTION2") {
        super;
        vipMints[0x1Fc98416c931348987f2d9B9B29CED8a4858bd38] = true;
        vipMints[0xd0A2ecdd7bF6C1a0aA6cB5846E1F2C122f6C7Db4] = true;
        vipMints[0x275972F06be4BA2bA60EC9c6900ba816E5Dd6dB0] = true;
        vipMints[0x5EeC43f819fdF4c9D4Dc0eC8082D5e7Fa40161DD] = true;
        vipMints[0x0E6a56066AfB13D8e6B420ccB29Db4C870958689] = true;
        vipMints[0xe756871084404A48674aCAa669DeCfb38fF9B5d7] = true;
    }

    function withdrawBalance() public onlyOwner {
        (bool sent, ) = payable(msg.sender).call{value: address(this).balance}(
            ""
        );
        require(sent, "WITHDRAW_FAILED");
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

    function getQuotum(address wallet) public view returns (uint8) {
        return maxMint - minted[wallet];
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

    function developerMint() public onlyOwner {
        require(currentId + 1 <= maxSupply, "NO_SUPPLY");
        require(minted[msg.sender] + 1 <= 4, "QUOTUM_REACHED");
        _runMint();
        minted[msg.sender]++;
    }

    function _runMint() internal {
        currentId++;
        _mint(msg.sender, currentId);
        _setTokenURI(
            currentId,
            string(
                abi.encodePacked(baseURI, Strings.toString(currentId), ".json")
            )
        );
    }

    function mint(uint256 amount, bytes32[] calldata _merkleProof)
        external
        payable
    {
        require(amount > 0, "NO_EMPTY_AMOUNT");
        require(preSale || publicSale, "NO_SALE");
        require(currentId + amount <= maxSupply, "NO_SUPPLY");
        require(minted[msg.sender] + amount <= maxMint, "QUOTUM_REACHED");

        if (vipMints[msg.sender]) {
            require(msg.value == 0, "WRONG_VALUE");
            require(amount == 1, "WRONG_AMOUNT");
            vipMints[msg.sender] = false;
        } else {
            require(msg.value / amount == mintPrice, "WRONG_VALUE");
        }

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
            _runMint();
        }
        minted[msg.sender] += uint8(amount);
        emit PotionsMinted(msg.sender, amount, currentId);
    }
}
