
const { expect } = require("chai");
const { ethers } = require("hardhat");
const { abi, bytecode } = require("usingtellor/artifacts/contracts/TellorPlayground.sol/TellorPlayground.json")
const web3 = require('web3');

function bytes(n) {
  return web3.utils.toHex(n)
}

function hexToNumber(n) {
  return web3.utils.hexToNumber(n)
}

describe("Tellor", function () {
  let sampleUsingTellor;
  let tellorOracle;

  // Set up Tellor Playground Oracle and SampleUsingTellor
  beforeEach(async function () {
    //Set up playground (tellor testing) contract
    let TellorOracle = await ethers.getContractFactory(abi, bytecode);
    tellorOracle = await TellorOracle.deploy();
    await tellorOracle.deployed();

    //Set up sample contract
    let SampleUsingTellor = await ethers.getContractFactory("SampleUsingTellor");
    sampleUsingTellor = await SampleUsingTellor.deploy(tellorOracle.address);
    await sampleUsingTellor.deployed();
  });


  it("Read tellor rng", async function () {
    const abiCoder = new ethers.utils.AbiCoder
    //sample data
    const sampleTimestamp = 1652000000;
    const mockValue = 12345678;
    //setting query for tellor
    const format = ['string', 'bytes']
    const value = ["TellorRNG", abiCoder.encode(['string'], [sampleTimestamp])]
    const queryData = abiCoder.encode(format, value)
    const queryId = ethers.utils.keccak256(queryData);

    // Set values for testing in playground (originally reported by the reporter)
    await tellorOracle.submitValue(queryId, mockValue, 0, queryData);

    // Get value with tellor
    const retrievedVal = await sampleUsingTellor.retrieveRandomNumber(queryId);
    expect(hexToNumber(retrievedVal)).to.equal(mockValue);
  });
});
