// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20 {

    constructor(uint256 initialSupply) ERC20("Adarsh", "ADT") {
        _mint(msg.sender, initialSupply);
    }
}
contract Lock{
    struct Details{
        address tokenAddress;
        address owner;
        uint lockedTime;
        uint unlockTime;
        uint amount;
    }
    mapping(address=>Details) wallets;
    function lockToken(address _tokenAddress,uint _amount,uint _unlockTime, address _owner) public{
        wallets[_owner].tokenAddress = _tokenAddress;
        wallets[_owner].owner = _owner;
        wallets[_owner].lockedTime = block.timestamp;
        wallets[_owner].unlockTime = block.timestamp + _unlockTime;
        wallets[_owner].amount = _amount;
        // Token(_tokenAddress).transferFrom(msg.sender,address(this),_amount);           
    }
    function contractTokens(address _tokenAddress) public view returns(uint){
        return Token(_tokenAddress).balanceOf(address(this));
    }
    function getDetails(address _address) public view returns(Details memory){
        return wallets[_address];
    }
}