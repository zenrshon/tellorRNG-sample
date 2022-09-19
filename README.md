# Sample TellorRNG

Tellor is a transparent and permissionless oracle protocol for your smart contract.

https://tellor.io/

This sample uses a function called TellorRNG to obtain random numbers in Oracle.

# Getting started

Flow of Tellor in production.
(Details are omitted)

1. Request RNG from the contract to the reporter
2. Bet a tip (TRB Token)
3. Reporter obtains a random number
   (in TellorRNG, the random number is calculated bitcoin next block hash value and ethereum next block hash value. Tied to timestamp.)
4. Reporter(s) reports value
5. the value can be pulled from the contract
6. Reporter receives a tip

However, since there are currently few reporters, we will use a tool for testing called TellorPlaygroud.
The flow is as follows

1. prepare random numbers in advance using Playground (tied to timestamp)
2. use Tellor to pull out random numbers with the above timestamp
3. get the prepared random numbers.

# Development

## Installation

```
yarn add usingtellor
```

```
npm install usingtellor
```

## worldcoin-snnipet-react

### SampleTellorRNG.sol

This is a contract for getting random numbers from Tellor.

### UsingTellor.sol

Tellor official contract to create SampleTellorRNG.sol

### testSampleTellorRNG.js

Test code to experience the above flow
