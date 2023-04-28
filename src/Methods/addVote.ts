

export function addVote(web3:any, contract:any, abi: any,contractAddress:any,voteName:string, candidate:any, fromAccount:any){
  
        return new Promise((resolve, reject) => {
                
                contract.methods.addVote(voteName, candidate, fromAccount).send({
                        from: fromAccount,
                        gas: 3000000,
                       }).on("confirmation",function(confirmBlock,receipt){
                                
                                resolve("successful transaction: " +  JSON.stringify(receipt))

                       })
                       .on('error', function(error){ 
                                
                                reject("Error: " + error.reason)
                                
                        });
                       
                        
                        
                
                
        })
}