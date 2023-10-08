

export function addVoteCall(web3:any, contract:any, abi: any, contractAddress:string, voteName:string, candidate:string, fromAddress:string, adminAccount:string){

        return new Promise((resolve, reject) => {
                
                contract.methods.addVote(voteName, candidate, fromAddress).send({
                        from: adminAccount,
                        gas: 3000000,
                       }).on('error', function(error:any, receipt:any) {
                
                        reject("Error: " + error.reason)
                         
                    }).on('confirmation', function(confirmationNumber, receipt){
                        
                        resolve("successful transaction: " + JSON.stringify(receipt)) 
                        
                    }).on('receipt', function(receipt:any){
            
                        resolve("successful transaction: " + JSON.stringify(receipt)) 
                        
                    })
        })
}