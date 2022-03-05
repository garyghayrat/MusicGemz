//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Gemz is Ownable {

  uint public fileCount;
  

  constructor() Ownable() {
    fileCount = 0;
  }

  enum Liked {Yes, No}
  
  struct File {
    uint fileID;
    string fileHash;
    string coverHash;
    string fileName;
    string artistName;
    address payable artistAddr;
    string genre;
    address[] donors;
    mapping(address => Liked) liked;
    uint likesCount;
  }

  event Uploaded (address _artist, string _fileHash, uint _fileID);
  event Donate (address _artistAddr, uint _amount, address _donorAddr);

  File[] public files;
  // mapping(address => uint) public balances;

  function uploadFile(
    string memory _fileHash,
    string memory _coverHash, 
    string memory _fileName, 
    string memory _artistName, 
    string memory _genre) public {

    require(bytes(_fileHash).length > 0, "File hash is not valid");

    File storage file = files.push();

    file.fileID = fileCount+1;
    file.fileHash = _fileHash;
    file.coverHash = _coverHash;
    file.fileName = _fileName;
    file.artistName = _artistName;
    file.genre = _genre;
    file.donors.push(msg.sender);
    file.liked[msg.sender] = Liked.Yes;

    fileCount++;

    emit Uploaded(msg.sender, _fileHash, file.fileID);
  }

  function donate(uint id) public payable {
    require(msg.value > 0);
    address payable artist = files[id].artistAddr;
    require(msg.sender != artist, "You cannot donate to yourself");

    (bool sent, ) = artist.call{value: msg.value}("");
    require(sent, "failed to send Ether");

    // balances[artist] += msg.value;
    files[id].likesCount++;

    emit Donate(artist, msg.value, msg.sender);
  }

  // function withdraw() public payable {
  //   uint balance = balances[msg.sender];
  //   require(balance > 0);
  //   balances[msg.sender] = 0;

  //   (bool sent, ) = msg.sender.call{value: balance}("");
  //   require(sent, "failed to send Ether");
  // }

}