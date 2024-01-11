---
title: Smart contract oracle with Solidity
---

# Build a smart contract oracle with Solidity, Node.js, and Replit

Oracles are bridges between smart contract protocols running on the blockchain and real-world data feeds. In previous Solidity tutorials, we've designed a [simple Ethereum escrow protocol](/tutorials/web3/escrow-contract-with-solidity) into our smart contracts by building an oracle, as well as how to combine different contract protocols.

By the end of this tutorial, you will have:

- An understanding of how to use oracles in smart contracts and how oracles work internally.
- Experience with building a hybrid on-and-off chain system.
- Experience with composing contract protocols.

## Getting started

We need two things to get started with this project: a Solidity repl and a browser wallet.

### Solidity repl

Sign in to [Replit](https://replit.com) or [create an account](https://replit.com/signup) if you haven't already. Once logged in, create a Solidity starter repl.

![Create Solidity starter REPL](https://docimg.replit.com/images/tutorials/44-smart-contract-oracle/solidity-repl.png)

The Solidity starter repl works a little differently from other repls you may have used in the past. Rather than running our repl every time we want to test out a new piece of code, we can run our repl once, to start it up, and it will automatically reload when changes are made to our Solidity code in `contract.sol`.

The Solidity starter repl comes with a friendly web interface, built using the [web3 Ethereum JavaScript API](https://web3js.readthedocs.io/en/v1.5.2/), which we will use to deploy and interact with our contracts. We will deploy to Replit Testnet, a custom version of the Ethereum blockchain managed by Replit and optimised for testing.

### Browser wallet

We will need a browser-based Web3 wallet to interact with the Replit Testnet and our deployed contracts. [MetaMask](https://metamask.io) is a popular and feature-rich wallet implemented as a WebExtension. You can install it from [MetaMask's download page](https://metamask.io/download/). Make sure you're using a supported browser – Chrome, Firefox, Brave, or Edge.

Once you've installed MetaMask, follow the prompts to create a wallet and sign in. MetaMask will give you a 12-word _secret recovery phrase_ – this is your wallet's private key, and must be kept safe and secret. If you lose this phrase, you will not be able to access your wallet. If someone else finds it, they will.

If you're already using MetaMask, we recommend creating a new account for testing with Replit. You can do this from the account menu, which appears when you click on the account avatar in the top right corner of the MetaMask interface.

![New testing account in metamask](https://docimg.replit.com/images/tutorials/44-smart-contract-oracle/createaccount.png)

## Oracle design

An oracle is a hybrid system, made up of both contracts and traditional web server code. The contracts provide an interface for other contracts to request and receive data, and the web server code uses events and contract functions to respond to these requests and supply the required data. At a high level, the architecture looks like this:

![Oracle diagram](https://docimg.replit.com/images/tutorials/44-smart-contract-oracle/oracle-diagram.svg)

Users interact with different smart contract protocols, such as decentralized exchanges or NFT markets. These protocols can source data from an oracle smart contract, which receives its data from off-chain data providers (these are usually some form of API).

In this tutorial, we will be building an oracle for random number generation, using the [RANDOM.ORG API](https://www.random.org/clients/http/api/). If you've completed our [ReplBot NFT tutorial](/tutorials/build-a-robot-nft), you'll know that true randomness is pretty much impossible to come by on the blockchain, and so an oracle is really the only solution for code that requires random numbers.

In much discussion and documentation of Ethereum oracles, the word "oracle" is used interchangeably to refer to three different things:

1. Off-chain data providers
2. Oracle contracts that bridge data onto the blockchain
3. Complete solutions made up of 1 and 2

To avoid confusion, we'll use the following terms throughout this tutorial:

1. Providers
2. Oracle contracts
3. Oracles

## Caller contract

We'll start off by pretending that our oracle has already been built, and develop a contract that will request random numbers from it. This may sound like putting the cart before the horse, but developing this way will give us a clear idea of what we want from the finished product and how it will have to work.

This contract, which we'll name `Caller`, will be very bare-bones. All it's going to do is allow users to request random numbers and emit those numbers in [events](https://docs.soliditylang.org/en/v0.8.2/contracts.html#events). At the end of this tutorial, you can expand `Caller` to do something more interesting with the numbers.

We'll design our oracle using Chainlink's [Basic Request Model](https://docs.chain.link/docs/architecture-request-model/) as a basis. As getting data from an oracle requires off-chain interaction, we won't be able to get our random number with a single function call. Instead, we'll implement a function to request a random number, which will be called by the contract's users, and a second function to fulfill a request, which will be called by the oracle contract. The request function will return a request ID that we can use to identify the final result. This is a similar pattern to [callbacks](<https://en.wikipedia.org/wiki/Callback_(computer_programming)>) in JavaScript.

Create a new directory in your repl called `contracts`. Then create a subdirectory at `contracts/caller`. Inside this subdirectory, create a new file named `Caller.sol`. Enter the following code into your new file:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin-solidity/contracts/access/Ownable.sol";
import "./IRandOracle.sol";

contract Caller is Ownable {
}
```

This `Caller` contract stub imports two dependencies:

- OpenZeppelin's [`Ownable`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.6.0/contracts/access/Ownable.sol), an access control mix-in that allows us to implement functions that only the contract's owner (the address that deploys the contract) will be able to call.
- A local contract called `IRandOracle`. This is an [interface](https://docs.soliditylang.org/en/v0.8.2/contracts.html#interfaces) that tells this contract how to interact with the oracle contract.

Before we fill in `Caller`'s logic, let's create that interface. Make a new file in the same directory named `IRandOracle.sol`, and add the following code to it:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

interface IRandOracle {
    function requestRandomNumber() external returns (uint256);
}
```

That's it! Interfaces don't contain any implementation details, and don't even have to specify every external function in the contract they're referencing. As `Caller` will only call this one oracle contract function, that's the only one we have to specify.

Now let's go back to `Caller.sol` and implement some logic. Add the code below between your contract's opening and closing curly brace:

```solidity
    IRandOracle private randOracle;

    mapping(uint256=>bool) requests;
    mapping(uint256=>uint256) results;
```

We first create a variable to reference our oracle contract, and then two [mappings](https://docs.soliditylang.org/en/v0.8.2/types.html?#mapping-types):

- `requests`, which will keep track of active request IDs.
- `results`, which will store the random numbers received for each request ID.

Then we can add some housekeeping functions:

```solidity
    modifier onlyRandOracle() {
        require(msg.sender == address(randOracle), "Unauthorized.");
        _;
    }

    function setRandOracleAddress(address newAddress) external onlyOwner {
        randOracle = IRandOracle(newAddress);

        emit OracleAddressChanged(newAddress);
    }
```

First, we define the `onlyRandOracle` [modifier](https://docs.soliditylang.org/en/v0.8.2/contracts.html?#function-modifiers), which we'll use to restrict access to our fulfillment function. It does this by using a [`require`](https://docs.soliditylang.org/en/v0.8.2/control-structures.html#error-handling-assert-require-revert-and-exceptions) statement to throw an error if the function caller's address is not that of the oracle contract. Without that, any user would be able to submit "random" numbers of their chosing to fulfill our requests.

Second, we add an `onlyOwner` function (this is another modifier, defined in OpenZeppelin's `Ownable`) to set the address of the oracle contract we'll be using. As the contract owner, we'll be able to change the oracle address when necessary.

Our code creates an instance of our `IRandOracle` interface with the provided address, and then emits an event to let users know that a change has been made to the contract. Well-written contracts should emit events for configuration changes like this, so that their operations remain transparent to users.

With our housekeeping done, we can now write `Caller`'s main functions below the definition of `setRandOracleAddress()`. First, `getRandomNumber()`:

```solidity
    function getRandomNumber() external {
        require(randOracle != IRandOracle(address(0)), "Oracle not initialized.");

        uint256 id = randOracle.requestRandomNumber();
        requests[id] = true;

        emit RandomNumberRequested(id);
    }
```

Here we use a `require` statement to ensure that the contract's oracle is initialized. We do this by checking that it is not a contract at [the null address](https://etherscan.io/address/0x0000000000000000000000000000000000000000), which is the address of uninitialized contract references. We then call `requestRandomNumber()`, the function that we declared in the `IRandOracle` interface. This function will return a request ID, which we mark as valid in our `requests` mapping. Finally, we emit an event to show that a random number has been requested.

Now we need to write the callback function. Add the following code below the function you added above:

```solidity
    function fulfillRandomNumberRequest(uint256 randomNumber, uint256 id) external onlyRandOracle {
        require(requests[id], "Request is invalid or already fulfilled.");

        results[id] = randomNumber;
        delete requests[id];

        emit RandomNumberReceived(randomNumber, id);
    }
```

When the oracle contract calls this function (which only it is allowed to do, per `onlyRandOracle`) it will supply the random number requested along with the request ID it's fufilling. The function will first check if the request ID is valid and then store the random number in the `results` mapping.

Now that the request has been fulfilled, it will also [`delete`](https://docs.soliditylang.org/en/v0.8.2/types.html?#delete) the request ID from `requests`, which is equivalent to setting it to `false`. This will ensure that only active requests are tracked.

Finally, our callback function emits an event to announce that the request has been fulfilled. In a more complex contract, this function would do more than just store the random number in a results mapping: for example, it might use the number to determine a lottery winner, or generate an attribute of an NFT.

Before we wrap up this contract, we need to define the events we've emitted above. Add the following code to the bottom of the contract body:

```solidity
    event OracleAddressChanged(address oracleAddress);
    event RandomNumberRequested(uint256 id);
    event RandomNumberReceived(uint256 number, uint256 id);
```

Our caller contract is now complete. But it won't be able to do much of anything until we implement the oracle contract it depends on.

## Oracle contract

If you take another look at the architecture diagram above, you'll notice that the oracle contract is intended to interact with multiple off-chain data providers. This is to ensure decentralization, a key attribute of robust smart contract protocols. If we relied on a single data provider for our random numbers, we'd be in trouble if that provider was compromised and the numbers it sent to us started being fixed, or if it had an outage and stopped returning anything.

So to minimize the impact of any single provider being compromised or going down, we'll implement functionality to source several different random numbers from several different providers, which we'll combine at the end using a [bitwise XOR](https://en.wikipedia.org/wiki/Bitwise_operation#XOR).

Create a new subdirectory in your repl at `contracts/oracle`. Inside this subdirectory, create a new file named `RandOracle.sol`. Enter the following code into your new file:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "./ICaller.sol";

contract RandOracle is AccessControl {
}
```

This stub is quite similar to the code we started out with when writing `Caller`, having only two key differences:

- Instead of `Ownable`, we import [`AccessControl`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.6.0/contracts/access/AccessControl.sol) from OpenZeppelin, which will allow us to implement role-based access control, a more complex and granular authorization model than we used in `Caller`. While we could have used this for `Caller` as well, it would have been overkill, and we'd like to keep our contracts as small as possible to save on deployment costs.
- Instead of `IRandOracle`, we import the interface `ICaller`. You can probably guess what it will contain. Let's create it now, in a file named `ICaller.sol` within the same directory:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

interface ICaller {
    function fulfillRandomNumberRequest(uint256 randomNumber, uint256 id) external;
}
```

Like `Caller`, `RandOracle` only needs to know about a single function in the other contract.

Let's return to `RandOracle.sol` and define some state variables.

```solidity
    bytes32 public constant PROVIDER_ROLE = keccak256("PROVIDER_ROLE");
```

First we define a name for our data provider role, in accordance with the `AccessControl` contract's [documentation](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.6.0/contracts/access/AccessControl.sol#L23). We then define two variables which we'll use to manage multiple providers:

```solidity
    uint private numProviders = 0;
    uint private providersThreshold = 1;
```

We use `numProviders` to store the total count of data providers we've added to the contract, and `providersThreshold` to define the minimum number of provider responses we need to consider a request fulfilled. For now, we've set `providersThreshold` to just one, opening ourselves up to the centralization risk mentioned above, but it will suffice for getting a basic demo up and running.

Next, we need to define some variables we'll use to deal with requests and responses. Enter the following code below the definitions you just added above:

```solidity
    uint private randNonce = 0;

    mapping(uint256=>bool) private pendingRequests;

    struct Response {
        address providerAddress;
        address callerAddress;
        uint256 randomNumber;
    }

    mapping(uint256=>Response[]) private idToResponses;
```

Here we define:

- `randNonce`, a [cryptographic nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce) we'll use to generate request IDs. This will be a simple counter that we increment every time `requestRandomNumber()` is called.
- `pendingRequests`, a mapping of requests awaiting fulfillment, similar to `requests` in our `Caller` contract.
- The `Response` struct, in which we'll store all the key details of each random number we receive from data providers: who requested the number, who provided the number, and the number itself.
- `idToResponses`, a mapping of request IDs to arrays of Response structs. This will allow us to track responses per request.

Now let's define our contract's constructor, the function that will run when it's deployed.

```solidity
    constructor() {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender); // make the deployer admin
    }
```

This function assigns `AccessControl`'s `DEFAULT_ADMIN_ROLE` to the contract's deploying address, commonly called its owner. This role has the power to grant and revoke other roles.

Now we're ready to define `requestRandomNumber()`, the function we called from `Caller`. Add the following code below the constructor's definition:

```solidity
    function requestRandomNumber() external returns (uint256) {
        require(numProviders > 0, " No data providers not yet added.");

        randNonce++;
        uint id = uint(keccak256(abi.encodePacked(block.timestamp, msg.sender, randNonce))) % 1000;
        pendingRequests[id] = true;

        emit RandomNumberRequested(msg.sender, id);
        return id;
    }
```

All this code does is generate a unique ID for the request, based on `randNonce`, adds that ID to `pendingRequests`, emits an event and returns the ID, similar to the concept of a support desk ticketing system. The `require` statement at the top of the code will revert if the contract's administrator has not yet added any data providers.

An off-chain data provider, which we'll create later on using Node.js, will watch the contract for `RandomNumberRequested` events and respond to them by submitting a random number to the contract function `returnRandomNumber()`, which will in turn return the number to the caller contract using `fulfillRandomNumberRequest()`. Let's start writing `returnRandomNumber()` now, just below `requestRandomNumber()`:

```solidity
    function returnRandomNumber(uint256 randomNumber, address callerAddress, uint256 id) external onlyRole(PROVIDER_ROLE) {
        require(pendingRequests[id], "Request not found.");

        // Add newest response to list
        Response memory res = Response(msg.sender, callerAddress, randomNumber);
        idToResponses[id].push(res);
        uint numResponses = idToResponses[id].length;
    }
```

Here, `returnRandomNumber` is a public function which we'll restrict to the addresses with the `PROVIDER_ROLE`. It takes three arguments: the random number, the address that made the initial request, and the request ID. In the code above, we ensure that the request ID is valid and then add the response to the array of responses for the request with this ID, stored in `idToResponses`. We then store the length of the array in `numResponses`, which we'll use to check if we've met the response threshold.

In the next part of the function, we'll combine all the responses we receive and submit the result back to the caller. Add the following code below the line that starts with `uint numResponses`:

```solidity
        // Check if we've received enough responses
        if (numResponses == providersThreshold) {
            uint compositeRandomNumber = 0;

            // Loop through the array and combine responses
            for (uint i=0; i < idToResponses[id].length; i++) {
                compositeRandomNumber = compositeRandomNumber ^ idToResponses[id][i].randomNumber; // bitwise XOR
            }

            // Clean up
            delete pendingRequests[id];
            delete idToResponses[id];

            // Fulfill request
            ICaller(callerAddress).fulfillRandomNumberRequest(compositeRandomNumber, id);

            emit RandomNumberReturned(compositeRandomNumber, callerAddress, id);
        }
```

The code in this `if` block will only run when the final data provider submits its random number. It combines all the random numbers through a [bitwise XOR](https://en.wikipedia.org/wiki/Bitwise_operation), as taking an average would reduce the randomness. It then deletes the data for this request – without this step, data providers could keep submitting different random numbers and changing the result. It then fulfills the request by invoking the caller function's callback, and finally emits an event.

Functions in external contracts should almost always be invoked at or near the end of a given function, after all state change operations have been performed. This avoids the risk of [reentrancy](https://dasp.co/#item-1), a common smart contract bug that was the cause of the famous [2016 DAO hack](https://www.gemini.com/cryptopedia/the-dao-hack-makerdao#section-what-is-a-dao).

Having now completed our oracle contract's main functions, we need to add a few housekeeping functions for the contract admin to manage data providers. We'll start with a function for adding new data providers. Add the following code at the bottom of the contract body:

```solidity
    // Admin functions
    function addProvider(address provider) external onlyRole(DEFAULT_ADMIN_ROLE) {
        require(!hasRole(PROVIDER_ROLE, provider), "Provider already added.");

        _grantRole(PROVIDER_ROLE, provider);
        numProviders++;

        emit ProviderAdded(provider);
    }
```

This code is quite straight-forward. Following a duplication check, it uses the [`_grantRole()`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.6.0/contracts/access/AccessControl.sol#L217) function from `AccessControl` to assign `PROVIDER_ROLE` to the specified address, increments `numProviders`, and emits an event to let users know of a contract configuration change.

Note that we've used the `internal` function `_grantRole()` rather than the `public` function `grantRole()`: we can do this because `internal` functions are usable inside the same contract and all contracts which inherit from it. This is distinct from `private` functions, which cannot be called in child contracts.

Next, we add a function to remove data providers:

```solidity
    function removeProvider(address provider) external onlyRole(DEFAULT_ADMIN_ROLE) {
        require(!hasRole(PROVIDER_ROLE, provider), "Address is not a recognized provider.");
        require (numProviders > 1, "Cannot remove the only provider.");

        _revokeRole(PROVIDER_ROLE, provider);
        numProviders--;

        emit ProviderRemoved(provider);
    }
```

This function performs the reverse operation of the one above, with an extra check to ensure that the administrator does not remove all providers from the contract, rendering it unusable.

The last admin function we need is one that sets the provider threshold. Add the following code below the body of `removeProvider()`:

```solidity
    function setProvidersThreshold(uint threshold) external onlyRole(DEFAULT_ADMIN_ROLE) {
        require(threshold > 0, "Threshold cannot be zero.");

        providersThreshold = threshold;
        emit ProvidersThresholdChanged(providersThreshold);
    }
```

Finally, let's define the events we've emitted above. Add the following code to the bottom of the contract body:

```solidity
    // Events
    event RandomNumberRequested(address callerAddress, uint id);
    event RandomNumberReturned(uint256 randomNumber, address callerAddress, uint id);
    event ProviderAdded(address providerAddress);
    event ProviderRemoved(address providerAddress);
    event ProvidersThresholdChanged(uint threshold);
```

Our oracle contract is complete. Next, we need to create a data provider to feed it random numbers.

## Node.js data provider

We'll write our data provider as a simple Node.js application, using the [Hardhat](https://hardhat.org) Ethereum development environment to help us interact with the blockchain. This environment provides a host of features for writing, testing, and deploying smart contracts, and for building applications that interface with the blockchain, such as this one. It includes a slightly modified version of the [ethers](https://docs.ethers.io/v5/) library, which is the main component we'll be using.

As previously stated, our data provider will monitor the oracle contract for random number requests and submit responses to them. As JavaScript programs are single-threaded, we'll use a chunked queue structure to split the program's time between taking note of new requests and processing existing requests.

We'll need to install Hardhat before we can start developing. Open your repl's `package.json` file and add the following line to the bottom of the `dependencies` object (remember to add a comma to the end of the preceding line):

```json
    "hardhat": "^2.9.3",
```

Create a new directory in your repl named `provider`. Inside that directory, create a JavaScript file named `index.js`. Add the following initial code to the file:

```javascript
const hardhat = require("hardhat");
const axios = require("axios");

const MAX_RETRIES = 5;
const SLEEP_TIME = 2000;
const BATCH_SIZE = 3;
```

Here we import `hardhat` and [`axios`](https://www.npmjs.com/package/axios), which we'll need to request random numbers from the [RANDOM.ORG](https://www.random.org/integers/) API.

The constants we've defined will be used as follows:

- `MAX_RETRIES` is the maximum number of times we'll attempt to fulfill a request. Our ability to fulfill requests could be hampered by RANDOM.ORG experiencing an outage, or our data provider's wallet not having enough Ethereum to pay the gas cost of executing `returnRandomNumber()`.
- `SLEEP_TIME` is how long we'll pause between processing batches of the request queue to give our application a chance to add new requests to the queue.
- `BATCH_SIZE` is how many requests we'll fufill between sleeps when processing the request queue.

Before we dive into our application's main code, let's create a function for getting a random number from RANDOM.ORG. Add the following code below your constant definitions:

```javascript
async function requestRandomNumber() {
  const res = await axios({
    url: "https://www.random.org/integers/",
    params: {
      num: 1,
      min: 1,
      max: 1000,
      col: 1,
      base: 10,
      format: "plain",
      rnd: "new",
    },
    method: "get",
  });

  return parseInt(res.data);
}
```

Here we use `axios` to construct and submit an HTTP request to RANDOM.ORG's integer generator, in accordance with [their documentation](https://www.random.org/clients/http/). As [`axios`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) is an asynchronous function, we must use the [`await`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await) keyword to receive its final return value. The same will be true of most functions we use from the ethers library.

Now let's start with the meat of our application. Add the following code to the bottom of the file:

```javascript
async function main() {
  // Initialize account
  const [dataProvider] = await hardhat.ethers.getSigners();

  // Initialize contract
  const oracleContractAddress = "ORACLE-CONTRACT-ADDRESS-HERE";
  const oracleContractABI = require("./randOracleABI.json");
  const oracleContract = new hardhat.ethers.Contract(
    oracleContractAddress,
    oracleContractABI,
    dataProvider
  );
}

main();
```

The `getSigners()` function from Hardhat's modified ethers library retrieves Ethereum accounts based on a provided wallet. For frontend dapps, this will usually be a wallet extension like MetaMask, but for scripts like this one, we'll need to specify a private key. We'll do that later, when we combine everything together.

The next chunk of code initializes a [`Contract`](https://docs.ethers.io/v5/api/contract/contract/) object. To connect to a contract and run its functions, we need two things: the contract's address, which shows us where to find it, and its [Application Binary Interface](https://docs.soliditylang.org/en/v0.8.2/abi-spec.html) (ABI), which tells us what functions it implements and what their parameters are. We'll leave these as placeholders for now.

Note that we've also specified `dataProvider` as an argument for our `Contract` object's constructor. This provides a default account to use when calling contract functions.

With that setup complete, we can start watching for requests and populating our queue. Add the following code to the bottom of your `main()` function:

```javascript
// Populate requests queue
var requestsQueue = [];

oracleContract.on("RandomNumberRequested", async (callerAddress, id) => {
  requestsQueue.push({ callerAddress, id });
});
```

Here we've initialized an empty requests queue and used `oracleContract`'s [`on`](https://docs.ethers.io/v5/api/contract/contract/#Contract-on) method to subscribe to the `RandomNumberRequested` event. Whenever a new event of this type is emitted by our contract, the code in our callback will execute, appending an object containing the event's arguments to `requestsQueue`.

That's the input part of our functionality done, so now we need the output. As mentioned above, we'll process the queue in chunks at regular intervals, so let's wrap this next bit of code in a [`setInterval()`] function. Add the following code to the bottom your `main()` function:

```javascript
// Poll and process requests queue at intervals
setInterval(async () => {
  let processedRequests = 0;
}, SLEEP_TIME);
```

We use `processedRequests` to track how many requests we've processed in this cycle, up to `BATCH_SIZE`. Let's start with a simple `while` loop, using the [`shift()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/shift) method to pop the first element off the requests queue. Add the following code below the definition of `processedRequests` within the body of `setInterval`:

```javascript
while (requestsQueue.length > 0 && processedRequests < BATCH_SIZE) {
  const request = requestsQueue.shift();
}
```

Now we can process the request with the next bit of code, which you can add to the `while` loop, below the definition of `request`:

```javascript
let retries = 0;
while (retries < MAX_RETRIES) {
  try {
    const randomNumber = await requestRandomNumber();

    await oracleContract.returnRandomNumber(
      randomNumber,
      request.callerAddress,
      request.id
    );
    break;
  } catch (error) {
    retries++;
  }
}

processedRequests++;
```

We use a [`try... catch`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch) to smoothly handle any errors that occur. We want to be able to leave this program running without worrying about it crashing on an error.

First, this code attempts to request a random number and send it to our oracle contract by calling `returnRandomNumber()`. All contract function calls in ethers are asynchronous, so we must `await` them. If the operation is successful, we break out of the retry loop and move on to the next request. If not, we increment the `retries` counter and try again.

If we reach the maximum number of retries, we'll go to the next request without submitting anything to the oracle contract.

That's it for our data provider. The last thing we need to write before we can put it all together is a simple frontend for our `Caller` contract, providing a user-friendly way for people to request and recieve random numbers.

## Caller contract frontend

Create a new folder in your repl called `frontend` and then create two files inside it: `index.html` and `app.js`. Add the following markup to `frontend/index.html`:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Random Oracle Client</title>
    <style>
      .request {
        color: red;
      }

      .response {
        color: green;
      }
    </style>
  <head>
  <body>
    <button id="request-rand" class="button">Request random number</button><br>
    <pre id="request-id"></pre>
    <ul id="events"></ul>

    <script src="https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js"></script>
    <script src="./callerABI.js"></script>
    <script src="./app.js"></script>
  </body>
</html>
```

In this file, we've created the following:

- A `button` element for requesting new random numbers.
- A `pre` element, in which we'll print the ID of the last request.
- A `ul` element for logging contract events as they occur.

We've also linked our stylesheet at the top of the file and the following JavaScript files at the bottom:

- [`web3.js`](https://web3js.readthedocs.io/en/v1.7.1/), the library we'll be using to interact with the blockchain.
- The `Caller` contract's ABI, which we'll get once we compile and deploy it.
- Our `app.js` file, which will contain the frontend's logic.

Open `frontend/app.js` and enter the code skeleton:

```javascript
App = {
  callerAddress: "FILL-ME-IN",
  callerContract: null,

  init: async function () {},
};

App.init();
```

This `App` object will contain all of the status and functionality we'll implement. Note that this frontend will only interact with `Caller`, and not `RandOracle`. We'll come back and enter the contract address in the next section, once we've deployed everything.

The `init()` function will connect to the blockchain and initialize our application's behavior. Populate your empty function body as follows:

```javascript
    init: async function() {
        if (window.ethereum) {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            window.web3 = new Web3(window.ethereum);

            App.callerContract = new web3.eth.Contract(callerABI, callerAddress);

            // Switch networks
            App.switchToReplitTestnet();
        }
    },
```

This code will interface with MetaMask and show a pop-up window asking the user to connect their wallet to our dapp. If the user accepts, we'll instantiate a `Web3` object using their account details. As with ethers, the majority of Web3's functions are asynchronous.

Because we're building on the Replit Testnet, we need to prompt the user to switch to this network, which we'll do in the function `switchToReplitTestnet()`. Add the definition for this function below the definition of `init`:

```javascript
    switchToReplitTestnet: function() {
        window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
                {
                    chainId: "0x7265706c",
                    chainName: "Replit Testnet",
                    rpcUrls: ["https://eth.replit.com"],
                    iconUrls: [
                        "https://upload.wikimedia.org/wikipedia/commons/b/b2/Repl.it_logo.svg",
                    ],
                    nativeCurrency: {
                        name: "Replit ETH",
                        symbol: "RΞ",
                        decimals: 18,
                    },
                },
            ],
        });
    },
```

This code provides the details MetaMask needs to prompt the user to switch networks.

Set up done, we can move on to app functionality. We'll start with a function that calls the `Caller` contract's `getRandomNumber()` function.

```javascript
    // contract interactions
    getRandomNumber: async function() {
        const accounts = await web3.eth.getAccounts();
        const account = accounts[0];

        // Request random number & return request ID
        return (await App.callerContract.methods.getRandomNumber().send({from: account}));
    },
```

Here we use [`web3.eth.getAccounts()`](https://web3js.readthedocs.io/en/v1.7.1/web3-eth.html#getaccounts) to find the user's wallet address, which we use to call the contract function `getRandomNumber()`. Note that the pattern and syntax for calling functions in Web3 differs substantially from the syntax we used in ethers.

Next we need a function that subscribes to contract events and prepends their details to our webpage's event log. Add the following code:

```javascript
    subscribeToContractEvents: function() {
        App.callerContract.events.RandomNumberRequested(async (err, event) => {
            if (err) console.error('Error on event', err)

            // Create list item
            let reqEventLi = document.createElement("li");
            reqEventLi.classList.add("request");
            reqEventLi.innerHTML = `Random number requested, ID: ${event.returnValues.id}`;

            // Add to top of list
            const eventLog = document.getElementById("events");
            eventLog.prepend(reqEventLi);
          });

        App.callerContract.events.RandomNumberReceived(async (err, event) => {
            if (err) console.error('Error on event', err)

            // Create list item
            let recEventLi = document.createElement("li");
            recEventLi.classList.add("response");
            recEventLi.innerHTML = `Random number received for ID ${event.returnValues.id}: ${event.returnValues.number}`;

            // Add to top of list
            const eventLog = document.getElementById("events");
            eventLog.prepend(recEventLi);
          });
    },
```

This code is similar to the event subscription code we used in our data provider, but uses the [web3.js `Contract.events` property](https://web3js.readthedocs.io/en/v1.7.1/web3-eth-contract.html#contract-events). It waits for new contract events to be emitted and adds a record of each one to the top of the page's events list.

Next we need to work with JavaScript events and bind our random number button to the contract interaction function we wrote above. Add the following code:

```javascript
    // interface
    bindBrowserEvents: function () {
        const requestButton = document.getElementById("request-rand");
        requestButton.addEventListener("click", async function() {
            const transaction = await App.getRandomNumber();

            const requestID = document.getElementById("request-id");
            requestID.innerHTML = `Submitted! Request ID: ${transaction.events.RandomNumberRequested.returnValues.id}`;
        });
    },
```

This code will ensure that when we click the button, the contract function will be invoked, and the request ID in its emitted event will be printed to the page.

Before we wrap this file up, we need to invoke both of these event-related functions in our `init()` function. Amend the function as follows:

```javascript
    init: async function() {
        if (window.ethereum) {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            window.web3 = new Web3(window.ethereum);

            App.callerContract = new web3.eth.Contract(callerABI, App.callerAddress);

            // Switch networks
            App.switchToReplitTestnet();
        }

        // NEW CODE BELOW
        App.subscribeToContractEvents();
        App.bindBrowserEvents();
    },
```

We've now got everything we need to get both oracle and oracle client up and running. In the next section, we'll deploy our contracts and connect up everything we've built.

## Putting it all together

We've created a lot of different pieces in the sections above. It's now time to put the puzzle together.

### Compiling and deploying the contracts

We'll start by compiling and deploying our contracts. But first, we need to make a change to our dependencies. Our oracle contract relies on code from version 4.6.0 of OpenZeppelin, so we'll need to edit our repl's `package.json` to ensure that we import that version. Open `package.json` now, find the dependency `@openzeppelin/contracts` and change the version number next to it to `^4.6.0`.

To compile our contracts in the Solidity starter repository, we'll need to import them into `contract.sol` by their full paths. Delete the current contents of `contract.sol` and replace them with the following:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "/home/runner/YOUR-REPL-NAME-HERE/contracts/caller/Caller.sol";
import "/home/runner/YOUR-REPL-NAME-HERE/contracts/oracle/RandOracle.sol";
```

Enter your repl's name as indicated. Then run your repl and wait for the Solidity starter web interface to appear, and for both contracts to compile.

Once we've compiled, we can deploy, but for that we'll need some funds. Connect your MetaMask wallet to the web interface and switch to the Replit Testnet. Then click the link to get 1 ETH for testing. Wait until 1 ETH shows up in your wallet balance on the top right of the page.

![Switch to test](https://docimg.replit.com/images/tutorials/44-smart-contract-oracle/switch-to-test.png)
![Get one Ether](https://docimg.replit.com/images/tutorials/44-smart-contract-oracle/get-one.png)

Now you can deploy your contracts. Select "Caller" from the drop-down box and click **Deploy**. Approve the MetaMask pop-up that appears. Then do the same with "RandOracle".

![Contract deployment](https://docimg.replit.com/images/tutorials/44-smart-contract-oracle/contractdeploy.png)

Once both contracts have been deployed, they will show up as expandable boxes below the drop-down box. Expand them and take a look at the functions available in each.

![Deployed contracts](https://docimg.replit.com/images/tutorials/44-smart-contract-oracle/deployedcontracts.png)

In practice, the `Caller` and `RandOracle` contracts would usually be deployed by different addresses, potentially belonging to entirely different teams, but we're using a single one to avoid having to log in and out of MetaMask over and over.

### Initializing the contracts

Next, we need to connect `Caller` to `RandOracle`. Find the `setRandOracleAddress` function in `Caller`. Then click on the address at the bottom of `RandOracle`'s dropdown box to copy it and paste it in as the value for `newAddress`. Then click **Run**.

![RandOrcale address](https://docimg.replit.com/images/tutorials/44-smart-contract-oracle/roracleaddress.png)

We're done setting up our contracts, but leave your repl running with the Solidity starter web interface open, as we'll need it to set up our data provider application and client frontend.

### Preparing the data provider

Before we do anything to integrate our data provider with the blockchain, let's include `axios` in our repl's `package.json` file. Add the following line to the bottom of the `dependencies` object if `axios` is not already included as a dependency (remember to add a comma to the end of the preceding line):

```json
    "axios": "^0.27.2"
```

With that done, we need to copy `RandOracle`'s ABI into a file where the data provider can see it. Click on **Copy ABI** next to `RandOracle`'s address to load the ABI into your clipboard. Then create a new file in `provider` named `randOracleABI.json` and paste the contents of your clipboard into it.

![Copy ABI](https://docimg.replit.com/images/tutorials/44-smart-contract-oracle/copyabi.png)

Now open `index.js`, find the line beginning with `const oracleContractAddress`, and replace the placeholder string with the address of the deployed `RandOracle` contract.

The last thing we need to do to get our data provider working is to provide it with a wallet. The wallet we use for MetaMask is locked by a password, so it can't easily be used for automated operations. In any case, it's more hygenic for us to create a dedicated wallet for our data provider. We'll do this with a simple Node.js script and the [`ethereumjs-wallet`](https://www.npmjs.com/package/ethereumjs-wallet) library.

Open your repl's `package.json` file. Add the following line to the bottom of the `dependencies` object (remember to add a comma to the end of the preceding line):

```json
    "ethereumjs-wallet": "^1.0.2"
```

Now create a new file named `walletGen.js`. Populate it with the code below:

```javascript
const wallet = require("ethereumjs-wallet").default;

const addressData = wallet.generate();

console.log(`Private key: ${addressData.getPrivateKeyString()}`);
console.log(`Address: ${addressData.getAddressString()}`);
```

Stop and run your repl. Navigate to the Shell tab in bottom-right panel and run the command `node walletGen.js`. You should see two long strings of letters and numbers appear beneath your command. The first is your new wallet's private key, and the second is your new wallet's address.

![Wallet credentials](https://docimg.replit.com/images/tutorials/44-smart-contract-oracle/tempwallet.png)

Anyone who knows this private key can control the wallet, so we'll need to keep it safe. Open the Secrets tab on your repl's sidebar. Create new key named `DATAPROVIDER_PRIVATE_KEY` and paste in the private key as its value. Click the button "Add new value" to save the entry.

Now we need to add the address of the new wallet as a data provider for our `RandOracle` contract. In your repl's web browser, navigate to the `addProvider` function in `RandOracle`. Paste in the address of your new wallet as the value for `provider`. Then click **Run**.

Our new wallet will also need some ETH to send random number responses to the blockchain. We can send it some of ours using MetaMask. Open the MetaMask extension interface and click on the button marked **Send**. It should be right underneath your balance. Paste the data provider's wallet address into the search bar that appears. Then enter a small number into the _Amount_ field, such as 0.2, click **Next**, and confirm the transaction.

Now we need to configure Hardhat, so that it knows what network to connect to (the Replit Testnet) and what wallet to use (the one we just created) when running our data provider application. First add the following line to the bottom of the `dependencies` object (remember to add a comma to the end of the preceding line):

```json
"@nomiclabs/hardhat-waffle": "^2.0.3"
```

Create a file named `hardhat.config.js` with the following contents:

```javascript
require("@nomiclabs/hardhat-waffle");

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  networks: {
    replit: {
      url: `https://eth.replit.com`,
      accounts: [process.env.DATAPROVIDER_PRIVATE_KEY],
    },
  },
  solidity: "0.8.2",
};
```

That's it for our data provider. Now we just need to prepare the client frontend.

### Preparing the client frontend

We need to fill in the ABI and address for `Caller`. Click on **Copy ABI** next to `Caller`'s address to load the ABI into your clipboard. Then create a new file in `frontend` named `callerABI.js` and add the following code to it:

```javascript
callerABI =
```

Paste the contents of your clipboard after the equals sign. We've already included this file in `frontend/index.html`, so now we just need the contract address. Open `frontend/app.js` and paste the address of `Caller` in place of the placeholder value of `callerAddress` near the top of the file.

We'll also need to create a simple [Node.js Express](https://expressjs.com/) application to render the frontend. Create a file named `frontend.js` in your repl and add the following code to it:

```javascript
const express = require("express");
const app = express();
const PORT = 433;

app.use(express.static("frontend"));

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
```

### Running the repl

Now that we have everything connected, we want to replace the Solidity starter interface with our data provider application and client frontend. To do this, make sure that hidden files are showing and open `.replit`.

![Show hidden](https://docimg.replit.com/images/tutorials/44-smart-contract-oracle/showhidden.png)

Replace `run = "node tools"` with the following:

```
run = "sh start.sh"
```

This will make our repl run a [Bash script](https://ryanstutorials.net/bash-scripting-tutorial/bash-script.php) instead of single command, which is useful when we need to run more than one thing. Create a file named `start.sh` and add the following code to it:

```bash
# Start data provider in the background
npx hardhat run provider --network replit &

# Start client frontend
node frontend.js
```

We must run the provider as a Hardhat script rather than a plain Node.js application to use our Hardhat configuration. The `&` symbol will make the data provider [run in the background](https://superuser.com/questions/358491/what-does-the-mean-when-used-in-the-end-of-a-bash-script), so that we can also start the frontend.

Our client and oracle are finally both ready to roll. Stop your repl and rerun it. You should see our frontend in the repl browser. Click the button to request a random number and watch the events come in.

![Final app](https://docimg.replit.com/images/tutorials/44-smart-contract-oracle/finalapp.png)

## Where next?

In this tutorial, we've built a simplified version of [Chainlink's Verifiable Random Function oracle](https://docs.chain.link/docs/chainlink-vrf/). While ours doesn't provide the same level of robust security, building it has given us insight into how smart contracts can work with off-chain data, and we can use it for other projects in the future, or let other Solidity developers on Replit use it for their projects.

Some next steps you might want to try:

- Create a few new repls containing just the data provider code and give each one its own wallet. Add the addresses as data providers to `RandOracle`, increase the providers threshold, and see how the contract works with more than one provider.
- Build something more sophisticated on top of `Client`. For example, you could adapt the [ReplBot NFT contracts](/tutorials/web3/build-a-robot-nft) to use this oracle as a source of randomness. Or you could write something like a lottery contract.
- Experiment with different data sources. An oracle can be a source for any data you can think of, from stock prices to the weather.

You can find our repl below:

<iframe height="400px" width="100%" src="https://replit.com/@ritza/Oracle?embed=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>
