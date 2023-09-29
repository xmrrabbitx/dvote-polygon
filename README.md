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

```

## Usage
### Import the Class
```js
import {Dvote}  from "dvote-polygon";
```

### New Instance
```js
const endpointUrl = "http://127.0.0.1:8545" // your provider
const walletAddress = "walletAddress" // your wallet Address

const dv = new Dvote(walletAddress , endpointUrl ) // new instance
```

### Compile
```js
let abi = dv.compile().abi()
let bytecode = dv.compile().bytecode()
```

### Deploy 
```js
dv.deploy(abi, bytecode).then(data=>{

   return data;

})
```

### Create a Poll
#### first parameter is the name of your Vote and second is the options of poll. second params must be the instance of Array.
```js
let voteName = "EBAY"
let voteOptions = ["perfect", "good", "bad", "worst"]

dv.createVote(voteName, voteOptions).then(data=>{

   return data;

})
```

### Add Vote
#### there are 3 params, all of them are string type.
```js
let fromAddress = "any Wallet Address"
let voteName = "EBAY"
let voteOptions = "perfect"

dv.addVote(voteName, voteOptions, fromAddress).then(data=>{

   return data;
    
})
```

### Vote Result
####
```js
let voteName = "EBAY"

dv.voteResult(voteName).then((data:any)=>{

    console.log(data)

})
```

### Unit Testing
#### you can use Jest to test of this library. first run ganache cli to start the personal blockchain. then run this command
```bash
npm run test --prefix ./node_modules/dvote-polygon
```

### contribution
If you are interested in contributing to this project, I will be very glad ^__^

### My Social Networks
You can get in contact with me by:
<br>
[Linkedin](https://www.linkedin.com/in/xmrrabbitx/)
<br>
[Twitter](https://twitter.com/xmrrabbittx)
<br>
[Instagram](https://www.instagram.com/xmrrabbitx)
<br>
[Hackernoon](https://hackernoon.com/@xmrrabbitx)

### License
MIT

