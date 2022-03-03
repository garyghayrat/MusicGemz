//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Gemz {

  address owner;
  uint public fileCount;
  

  constructor() {
    owner = msg.sender;   
    fileCount = 0;
  }

  enum Liked {Yes, No}
  
  struct File {
    uint fileID;
    string fileHash;
    string fileName;
    string artistName;
    address payable artistAddr;
    string genre;
    Donor[] donors;
    mapping(address => Liked) liked;
    uint likesCount;
  }

  struct Donor {
    address addr;
    bool liked;
  }

  event Uploaded (address _artist, string _fileHash, uint _fileID);
  event Donate (address _artistAddr, uint _amount, address _donorAddr);

  File[] public files;
  mapping(address => uint) public balances;

  function uploadFile(
    string memory _fileHash, 
    string memory _fileName, 
    string memory _artistName, 
    string memory _genre) public {

    require(bytes(_fileHash).length > 0, "File hash is not valid");

    Donor memory artist = Donor(msg.sender, true);

    File storage file = files.push();

    file.fileID = fileCount;
    file.fileHash = _fileHash;
    file.fileName = _fileName;
    file.artistName = _artistName;
    file.genre = _genre;
    file.donors.push(artist);
    file.liked[msg.sender] = Liked.Yes;

    fileCount++;

    emit Uploaded(msg.sender, _fileHash, file.fileID);
  }

  function donate(uint id) public payable {
    require(msg.value > 0);
    address payable artist = files[id].artistAddr;
    require(msg.sender != artist, "You cannot donate to yourself");

    balances[artist] += msg.value;
    files[id].likesCount++;

    emit Donate(artist, msg.value, msg.sender);
  }

  function withdraw() public payable {
    uint balance = balances[msg.sender];
    require(balance > 0);
    balances[msg.sender] = 0;

    (bool sent, ) = msg.sender.call{value: balance}("");
    require(sent, "failed to send Ether");
  }

}