// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "./UsingTellor.sol";
import "hardhat/console.sol";

contract SampleUsingTellor is UsingTellor {
    constructor(address payable _tellorAddress) UsingTellor(_tellorAddress) {}

    function retrieveRandomNumber(bytes32 queryId)
        public
        view
        returns (bytes memory)
    {
        (bool ifRetrieve, bytes memory _randomNumberBytes, ) = getCurrentValue(
            queryId
        );
        if (!ifRetrieve) return "0x";
        return _randomNumberBytes;
    }
}
