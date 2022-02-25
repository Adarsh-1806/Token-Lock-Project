// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;
import "./Token.sol";
contract Lock{
    struct Details{
        address tokenAddress;
        address owner;
        uint lockedTime;
        uint unlockTime;
        uint amount;
        bool withdrawed;
    }
    uint id=0;
    mapping(uint=>Details) lockedTokens;
    mapping(address=>uint[]) depositor;
    mapping(address=>uint[]) tokenDetail;

    function lockToken(address _tokenAddress,uint _amount,uint _unlockTime) public{
        lockedTokens[id].tokenAddress = _tokenAddress;
        lockedTokens[id].owner = msg.sender;
        lockedTokens[id].lockedTime = block.timestamp;
        lockedTokens[id].unlockTime = block.timestamp + _unlockTime;
        lockedTokens[id].amount = _amount;
        lockedTokens[id].withdrawed = false;

        depositor[msg.sender].push(id);
        tokenDetail[_tokenAddress].push(id);
        id++;
        // Token(_tokenAddress).transfer(_to,_amount);           
    }
    function tokenBalanceOf(address _tokenAddress) public view returns(uint){
        return Token(_tokenAddress).balanceOf(address(this));
    }
    function getAmountOf(address _address) public view returns(uint){
        return lockedTokens[depositor[_address][0]].amount;
    }
    function withDrawToken(uint _id) public{
        require(_id <= depositor[msg.sender].length,"Please Enter valid Id");
        require(msg.sender == lockedTokens[depositor[msg.sender][_id]].owner,"You are not authorized for withdrawal");
        require(block.timestamp >= lockedTokens[depositor[msg.sender][_id]].unlockTime,"You can't withdraw token before unlocktime");
        require(lockedTokens[depositor[msg.sender][_id]].withdrawed==false,"You have already withdrawed tokens");
        uint _amount = lockedTokens[depositor[msg.sender][_id]].amount;
        lockedTokens[depositor[msg.sender][_id]].amount = 0;
        lockedTokens[depositor[msg.sender][_id]].withdrawed = true;
        address _tokenAddress = lockedTokens[depositor[msg.sender][_id]].tokenAddress;
        Token(_tokenAddress).transfer(msg.sender,_amount);
    }
}