// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/metatx/MinimalForwarder.sol";

contract BudyNFT is ERC721, ERC721Enumerable, ERC721URIStorage, Ownable, MinimalForwarder {
    uint256 private _nextTokenId;
    address internal _trustedForwarder;

    constructor(address _forwarder) ERC721("BudyNFT", "BNFT") Ownable(_msgSender()) {
        require(_forwarder!=address(0x0),"trustedForwarder can't be null");
        _trustedForwarder = _forwarder;
    }

    function safeMint(address to, string memory uri) public {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    // The following functions are overrides required by Solidity.

    
    function trustedForwarder() public view virtual returns (address) {
        return _trustedForwarder;
    }

    function isTrustedForwarder(address _forwarder) public view virtual returns (bool) {
        return _forwarder == trustedForwarder();
    }

    function _msgSender() internal view virtual override returns (address) {
        uint256 calldataLength = msg.data.length;
        uint256 contextSuffixLength = _contextSuffixLength();
        if (isTrustedForwarder(msg.sender) && calldataLength >= contextSuffixLength) {
            return address(bytes20(msg.data[calldataLength - contextSuffixLength:]));
        } else {
            return super._msgSender();
        }
    }

    function _msgData() internal view virtual override returns (bytes calldata) {
        uint256 calldataLength = msg.data.length;
        uint256 contextSuffixLength = _contextSuffixLength();
        if (isTrustedForwarder(msg.sender) && calldataLength >= contextSuffixLength) {
            return msg.data[:calldataLength - contextSuffixLength];
        } else {
            return super._msgData();
        }
    }

    function _contextSuffixLength() internal view virtual override returns (uint256) {
        return 20;
    }

    function _update(address to, uint256 tokenId, address auth)
        internal
        override(ERC721, ERC721Enumerable)
        returns (address)
    {
        return super._update(to, tokenId, auth);
    }

    function _increaseBalance(address account, uint128 value)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._increaseBalance(account, value);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}