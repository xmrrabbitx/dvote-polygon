
export function createVoteCall(web3:any, contract:any, abi:any, contractAddress:any, voteName:string, candidate:any, fromAccount:any){
       
    return new Promise((resolve, reject) => {
        
        contract.methods.createVote(voteName, candidate).send({from:fromAccount,gas: 3000000})
        
        
            .on('confirmation', function(confirmationNumber, receipt){
               
                resolve("successful transaction: " + JSON.stringify(receipt)) 
                
            }).on('error', function(error, receipt) {
               
               
                reject("Error: " + error.reason)
                
                
            })
    })
}