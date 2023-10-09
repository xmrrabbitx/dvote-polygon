

export function addVoteCall(web3:any, contract:any, abi: any, contractAddress:string, voteName:string, candidate:string, fromAddress:string, adminAccount:string, gasFee:number, gasPrice:string){

        return new Promise((resolve, reject) => {
                
                contract.methods.addVote(voteName, candidate, fromAddress).send({
                        from: adminAccount,
                        gas: gasFee, gasPrice:gasPrice
                       }).on('error', function(error:any, receipt:any) {
                
                        reject("Error: " + error.reason)
                         
                    }).on('confirmation', function(confirmationNumber, receipt){
                        
                        resolve("Vote successful casted: " + JSON.stringify(receipt)) 
                        
                    }).on('receipt', function(receipt:any){
            
                        resolve("Vote successful casted: " + JSON.stringify(receipt)) 
                        
                    }).catch(error=>{

                        resolve("Error: " + error.reason)
                    })
        })
}