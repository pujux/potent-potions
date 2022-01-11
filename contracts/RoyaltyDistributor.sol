//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";

contract RoyaltyDistributor is Ownable {
    struct RoyaltyReceiver {
        address payable wallet;
        uint256 percentage;
    }

    RoyaltyReceiver[] public receivers;

    uint256 public cumulativePercentage;
    uint256 public receiverCount;

    event ReceiverAdded(address indexed wallet, uint256 percentage);
    event ReceiverRemoved(address indexed wallet, uint256 percentage);
    event PaymentReceived(uint256 amount);

    constructor() payable {
        super;
    }

    receive() external payable {
        emit PaymentReceived(msg.value);
    }

    function receiversArrayLength() public view returns (uint256) {
        return receivers.length;
    }

    function addReceiver(address payable wallet, uint256 percentage)
        public
        onlyOwner
    {
        require(percentage < 100, "TOO_HIGH");
        require(percentage > 0, "TOO_LOW");
        require(cumulativePercentage + percentage <= 100, "MAX_REACHED");
        receivers.push(RoyaltyReceiver(wallet, percentage));
        cumulativePercentage += percentage;
        receiverCount++;
        emit ReceiverAdded(wallet, percentage);
    }

    function removeReceiver(address payable wallet, uint256 percentage)
        public
        onlyOwner
    {
        uint256 i = 0;
        while (
            receivers[i].wallet != wallet &&
            receivers[i].percentage != percentage
        ) {
            i++;
            require(i < receivers.length, "NOT_FOUND");
        }
        receivers[i] = receivers[receivers.length - 1];
        delete receivers[receivers.length - 1];
        cumulativePercentage -= percentage;
        receiverCount--;
        emit ReceiverRemoved(wallet, percentage);
    }

    function distributeBalance() public onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "EMPTY_BALANCE");
        for (uint256 i = 0; i < receivers.length; i++) {
            RoyaltyReceiver memory receiver = receivers[i];
            (bool sent, ) = receiver.wallet.call{
                value: (balance / 100) * receiver.percentage
            }("");
            require(sent, "WITHDRAW_FAILED");
        }
    }
}
