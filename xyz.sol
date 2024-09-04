// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

/// @title GameVault Token (GMV)
/// @dev ERC20 token with 18 decimals, burnable functionality, and a fixed total supply of 10 million tokens.
contract GameVaultToken is ERC20, ERC20Burnable {
    uint256 public constant TOTAL_SUPPLY = 10_000_000 * 10 ** 18;

    /// @notice Constructor for GameVault Token (GMV)
    /// @dev Mints the total supply of tokens to the deployer's address.
    constructor() ERC20("GameVault Token", "GMV") {
        _mint(msg.sender, TOTAL_SUPPLY);
    }
}

