// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

library ArrayUtils {
    function getFilledArray(uint256 size, uint256 fill)
        internal
        pure
        returns (uint256[] memory array)
    {
        uint256[] memory amounts = new uint256[](size);
        for (uint256 i = 0; i < size; i++) {
            amounts[i] = fill;
        }
        return amounts;
    }
}
