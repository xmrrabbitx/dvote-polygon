
export function createVoteCall(web3:any, contract:any, abi:any, contractAddress:string, voteName:string, candidate:string[], adminAccount:string, gasFee:number, gasPrice:string){

    return new Promise((resolve, reject) => {

        contract.methods.createVote(voteName, candidate).send(
            {from:adminAccount,
             gas: gasFee ,gasPrice:gasPrice})
                
        .on('error', function(error:any, receipt:any) {

            reject("Error: " + error.reason)

        }).on('confirmation', function(confirmationNumber, receipt){

            resolve("create vote successful: " + JSON.stringify(receipt))

        }).on('receipt', function(receipt:any){

            resolve("create vote successful: " + JSON.stringify(receipt)) 

        }).catch(error=>{

            resolve("Error: " + error.reason)
        })
        
    })
}