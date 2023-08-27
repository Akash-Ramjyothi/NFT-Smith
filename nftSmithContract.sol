// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';

abstract contract NftSmithContract is ERC721URIStorage, Ownable {
    constructor(string memory _name, string memory _symbol) ERC721(_name, _symbol) {}

    function mint(address nftSmithAddress, uint256 tokenId, string memory metadataURI) external { 
        _safeMint(nftSmithAddress, tokenId);
        _setTokenURI(tokenId, metadataURI);
    }
}

contract ConcreteNftSmithContract is NftSmithContract {
    constructor(string memory _name, string memory _symbol) NftSmithContract("NFT-Smith Collection", _symbol) {}

    // You can add more functions or implementations here as needed
}