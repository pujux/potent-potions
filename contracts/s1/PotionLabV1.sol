//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PotionLabV1 is ERC1155Holder, Ownable {

  uint256 public startTime;
  uint8 public minted = 0;
  uint8 public maxPotionsPerDay = 3;

  event PotionMinted(address indexed to);

  constructor() {
    startTime = block.timestamp;
  }

  function setMaxPotionsPerDay(uint8 _maxPotionsPerDay) public onlyOwner {
    maxPotionsPerDay = _maxPotionsPerDay;
  }

  function reset() public onlyOwner {
    minted = 0;
    startTime = block.timestamp;
  }

  function checkAvailable() public view returns (uint256 available) {
    uint dayDiff = (block.timestamp - startTime) / 60 / 60 / 24; 
    return (1 + dayDiff) * maxPotionsPerDay - minted;
  }

  modifier onlyAvailable() {
    require(checkAvailable() > 0, "NO_POTIONS_AVAILABLE");
    _;
  }

  function mint() public onlyAvailable {
    minted++;
    emit PotionMinted(msg.sender);
  }
}
