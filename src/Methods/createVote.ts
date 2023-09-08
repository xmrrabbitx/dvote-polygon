
export function createVoteCall(web3:any, contract:any, abi:any, contractAddress:string, voteName:string, candidate:string[], fromAccount:string){

    return new Promise((resolve, reject) => {

        contract.methods.createVote(voteName, candidate).send({from:fromAccount,gas: 3000000})
                
        .on('error', function(error:any, receipt:any) {
                
            reject("Error: " + error.reason)
             
        }).on('receipt', function(receipt:any){

            resolve("successful transaction: " + JSON.stringify(receipt)) 
            
        })
    })
}