<p style="text-align: center;">
  <img style="border-radius:10px;" src="asset/header/header.png" width="400px" alt="header.png">
</p>

# ⚙️ dvote-polygon

#### dvote-polygon is a typescript library integrated into the [polygon](https://polygon.technology/) network.

##### This library is tested on the polygon Mumbai test network using quicknode provider.
##### This library is tested on Ganache, which is a personal Ethereum blockchain.


### Installation
#### type this command in CMD or Terminal
```bash
   npm i dvote-polygon
```

## Usage
### First Set your Private Key in Dotenv
```env
   PRIVATE_KEY=YOUR_PRIVATE_KEY_OF_CRYPTO_WALLET_ADDRESS
```

### Import the Class
```js
import {Dvote}  from "dvote-polygon";
```

### Create New Instance
#### parameters => endpointUrl:string , true|false
#### second parameter is false byfeault and it could be true if you want to deploy new contract instead using previous one!
```js
const endpointUrl = "http://127.0.0.1:8545" // your provider

const dv = new Dvote(endpointUrl, false) // create new instance
```

### Compile Vote.sol Contract
```js
let abi = dv.compile().abi()
let bytecode = dv.compile().bytecode()
```

### Deploy Contract
```js
dv.deploy(abi, bytecode).then(data=>{

  result = data;

})
```

### Create a Poll
#### parameters => first parameter is the name of your Vote and second is the options of poll. second params must be the instance of Array.
```js
let ballotName = "EBAY-SCORES"
let voteOptions = ["Perfect", "Good", "Bad", "Worst"]

dv.createVote(voteName, voteOptions).then(data=>{

  result = data;

})
```

### Add Vote
#### there are 3 params, all of them are string type.
```js
let fromAddress = "any User Wallet Address"
let ballotName = "EBAY"
let voteOptions = "Perfect"

dv.addVote(voteName, voteOptions, fromAddress).then(data=>{

   result = data;
    
})
```

### Change your Vote
#### you can change your casted vote to another option
```js
let fromAddress = "any User Wallet Address"
let ballotName = "EBAY"
let newOption = "Good"

dv.changeVote(ballotName, newOption, fromAddress).then((data:any)=>{

    result = data;

})
```

### Vote Result
#### show the result of voting - just admin can access this
```js
let ballotName = "EBAY"

dv.voteResult(ballotName).then((data:any)=>{

    result = data;

})
```

### Unit Testing
#### you can use Jest to test of this library. first run ganache cli to start the personal blockchain. then run this command
```bash
npm run test --prefix ./node_modules/dvote-polygon
```

### contribution
If you are interested in contributing to this project, I will be very glad ^__^

### License
MIT

