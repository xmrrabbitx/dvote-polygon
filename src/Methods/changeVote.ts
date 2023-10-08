

export function changeVoteCall(web3:any, contract:any, abi: any, contractAddress:string, voteName:string, candidate:string, fromAddress:string){

    return new Promise((resolve, reject) => {
            
            contract.methods.changeVote(voteName, candidate, fromAddress).send({
                    from: fromAddress,
                    gas: 3000000,
                   }).on('error', function(error:any, receipt:any) {
            
                    reject("Error: " + error.reason)
                     
                }).on('confirmation', function(confirmationNumber, receipt){
                   
                    resolve("Vote changing casted: " + JSON.stringify(receipt)) 
                    
                }).on('receipt', function(receipt:any){
        
                    resolve("Vote changing casted: " + JSON.stringify(receipt)) 
                    
                })
    })
}