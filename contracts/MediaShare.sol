// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract MediaShare {
    uint256 totalMedias;

    event NewMedia(address indexed from, string media, uint256 timestamp);

    struct Media {
        address sender;
        string media;
        uint256 timestamp;
    }

    Media[] medias;

    /*
     * This is an address => uint mapping, meaning I can associate an address with a number!
     * In this case, I'll be storing the address with the last time the user waved at us.
     */
    mapping(address => uint256) public lastWavedAt;

    constructor() {
        console.log("We have been constructed!");
    }

    function sendMedia(string memory _media) public {
        totalMedias += 1;
        console.log("%s has posted!", msg.sender);

        medias.push(Media(msg.sender, _media, block.timestamp));
        emit NewMedia(msg.sender, _media, block.timestamp);
    }

    function getAllMedias() public view returns (Media[] memory) {
        return medias;
    }

    function getTotalMedias() public view returns (uint256) {
        return totalMedias;
    }
}
