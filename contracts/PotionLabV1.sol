//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";

contract PotionLabV1 is ERC1155Holder {

  uint256 public creationTimestamp;
  uint8 public minted = 0;
  uint8 public maxMintPerDay = 3;

  constructor() {
    creationTimestamp = block.timestamp;
  }

  function checkAvailable() public view returns (bool available) {
    uint dayDiff = (block.timestamp - creationTimestamp) / 60 / 60 / 24; 
    return minted < dayDiff * maxMintPerDay;
  }

  modifier onlyAvailable() {
    require(checkAvailable());
    _;
  }

  function mint() public onlyAvailable {
    
  }
    
}
