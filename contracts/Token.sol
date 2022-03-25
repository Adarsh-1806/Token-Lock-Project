// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20 {
    constructor(uint256 initialSupply) ERC20("Compound", "CMP") {
        // _setupDecimals(2);
        _mint(msg.sender, initialSupply);
    }
}
