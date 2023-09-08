

export function addVoteCall(web3:any, contract:any, abi: any, contractAddress:string, voteName:string, candidate:string, fromAddress:string){

        return new Promise((resolve, reject) => {
                
                contract.methods.addVote(voteName, candidate, fromAddress).send({
                        from: fromAddress,
                        gas: 3000000,
                       }).on('error', function(error:any, receipt:any) {
                
                        reject("Error: " + error.reason)
                         
                    }).on('receipt', function(receipt:any){
            
                        resolve("successful transaction: " + JSON.stringify(receipt)) 
                        
                    })
        })
}