// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.18;
// import "@openzeppelin/contracts/proxy/ERC1967/ERC1967Upgrade.sol";
import "@openzeppelin/contracts/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/proxy/transparent/TransparentUpgradeableProxy.sol";

// you need use this
// contract ContractProxy is TransparentUpgradeableProxy, ITransparentUpgradeableProxy {
// this is simple example for fun
contract ContractProxy is TransparentUpgradeableProxy {
    // uint256 public x;

    constructor(
        address _logic,
        bytes memory _data
    ) TransparentUpgradeableProxy(_logic, msg.sender, _data) {}

    function upgradeTo(address _addr) public {
        _upgradeTo(_addr);
    }
}

contract Ver1 is Initializable {
    uint256 public x;

    function init(uint256 _x) public initializer {
        x = _x;
    }

    function mintX(uint256 _x) public {
        x = 2 * _x;
    }
}

contract Ver2 is Initializable {
    uint256 public x;

    function init(uint256 _x) public initializer {
        x = _x;
    }

    function mintX(uint256 _x) public {
        x = 3 * _x;
    }
}
