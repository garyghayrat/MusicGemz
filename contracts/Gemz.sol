
//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Gemz {
  uint public photoCount = 0;

  constructor() {
    
  }
  
  struct Photo {
    string photoHash;
    string authorName;
    address payable author;
    string description;
    uint totalDonation;
  }

  event Donate (
    address receiver,
    uint amount,
    address donator
  );

  mapping(uint => Photo) public photos;

  function uploadPhoto(string memory photoHash, string memory authorName, string memory description) public {
    require(bytes(photoHash).length > 0, "Photo hash is not valid");

    // adding photo to the key
    photos[photoCount+1] = Photo({
      photoHash: photoHash,
      authorName: authorName,
      author: payable(msg.sender),
      description: description,
      totalDonation: 0
    });

    // increasing the photoCount
    photoCount++;
  }

  function donate(uint id, uint amount) public payable {
    // Throwing an  error is balance is not sufficient
    require(msg.sender.balance > amount, "Insufficient Balance");
    
    // getting the photo data from the `photos` mapping
    address payable receiver = photos[id].author;

    // throwing an error if user is trying to send money to himself
    require(msg.sender != receiver, "You cannot donate to yourself");


    // updating donated amount
    photos[id].totalDonation += msg.value;

    console.log("Donating %s amount to %s", msg.value, receiver);

    // emitting donate event
    emit Donate(receiver, msg.value, msg.sender);
  }
}