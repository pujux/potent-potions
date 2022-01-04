//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract TestERC1155 is ERC1155 {

  constructor() ERC1155("") {
    _mint(msg.sender, 1, 10**18, "");
    _mint(msg.sender, 2, 1, "");
    _mint(msg.sender, 3, 1, "");
    _mint(msg.sender, 4, 1, "");
    _mint(msg.sender, 5, 1, "");
  }
}
