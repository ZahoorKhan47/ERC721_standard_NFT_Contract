// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Import this file to use console.log
import "hardhat/console.sol";

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";



contract zkNFT is ERC721URIStorage,Ownable {
   
   using Counters for Counters.Counter;

   Counters.Counter private _tokenIds;


   constructor() ERC721("Zahoor Khan" ," ZK") {}

   function mintNFT(address recipient , string memory tokenURI) public onlyOwner returns(uint256){

     _tokenIds.increment();

     uint256 newItemId = _tokenIds.current();
     _mint(recipient,newItemId);
     _setTokenURI(newItemId,tokenURI);

     return newItemId;
   }


}
