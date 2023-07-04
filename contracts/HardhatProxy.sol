// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.18;
// import "@openzeppelin/contracts/proxy/ERC1967/ERC1967Upgrade.sol";
import "@openzeppelin/contracts/proxy/utils/Initializable.sol";

contract Version1 is Initializable {
    uint256 public x;

    function init(uint256 _x) public initializer {
        x = _x;
    }

    function mintX(uint256 _x) public {
        x = 2 * _x;
    }
}

contract Version2 is Initializable {
    uint256 public x;

    function init(uint256 _x) public initializer {
        x = _x;
    }

    function mintX(uint256 _x) public {
        x = 3 * _x;
    }
}
