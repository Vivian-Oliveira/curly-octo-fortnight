// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract MediaShare {
    uint256 totalMedias;
    uint256 currentMediaId;

    event NewMedia(address indexed from, string media, uint256 timestamp);

    struct Media {
        uint256 id;
        address sender;
        string media;
        uint256 timestamp;
    }

    struct Thanks {
        address thanker;
        address thanked;
        string media;
        uint256 value;
    }

    Media[] medias;
    mapping(address => Thanks[]) public thanks;

    constructor() {
        console.log("We have been constructed!");
    }

    function sendMedia(string memory _media) public {
        totalMedias += 1;
        currentMediaId += 1;
        console.log("%s has posted!", msg.sender);

        medias.push(Media(currentMediaId, msg.sender, _media, block.timestamp));
        emit NewMedia(msg.sender, _media, block.timestamp);
    }

    function getAllMedias() public view returns (Media[] memory) {
        return medias;
    }

    function getTotalMedias() public view returns (uint256) {
        return totalMedias;
    }

    function getMediaIndexById(uint256 _id) private returns (uint256, bool) {
        for (uint j = 0; j < medias.length; j++) {
            if(medias[j].id == _id){
                return (j, false);
            }
        }

        return (0, true);
    }

    function thankMedia(uint256 _id) public payable {
        (uint256 _mediaIndex, bool error) = getMediaIndexById(_id);
        require(!error, "Media does not exist");

        Media memory _media = medias[_mediaIndex];
        address _to = _media.sender;
        (bool sent, bytes memory data) = _to.call{value: msg.value}("");
        require(sent, "Failed to send Ether");

        thanks[msg.sender].push(Thanks(msg.sender, _to, _media.media, msg.value));
    }

    function getThanksByAddress(address thanker) public view returns (Thanks[] memory) {
        return thanks[thanker];
    }
}
