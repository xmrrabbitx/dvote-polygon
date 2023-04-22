

export  function createVote(web3:any, contract:any, abi:any, contractAddress:any, voteName:string, candidate:any, fromAccount:any){
       
        contract.methods.createVote(voteName, candidate).send({from:fromAccount,gas: 3000000}).on('confirmation', function(confirmationNumber, receipt){
                console.log("create vote successful!")
            }).on('error', function(error, receipt) {
                console.log("error in creating vote!")
            });
}