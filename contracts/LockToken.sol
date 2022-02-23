// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;
import "./Token.sol";
contract LockToken is Token{
    address owner;
    uint unlockTime;
    uint lockingTime;
    uint amount;
    constructor(address _owner,uint _unlockTime,uint _amount){
        owner = _owner;
        unlockTime = _unlockTime;
        amount = _amount;
        lockingTime = block.timestamp;
        balance[msg.sender] -= amount;
    }
    function unlockToken() public{
        require(msg.sender == owner,"You are not authorized to Unlock Token");
        require(block.timestamp >= unlockTime,"You can't Unlock it now...");
        balance[msg.sender] += amount;
    }
}