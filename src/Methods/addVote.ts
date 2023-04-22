

export function addVote(web3:any, contract:any, abi: any,contractAddress:any,voteName:string, candidate:any, fromAccount:any){
  
        return new Promise((resolve, reject) => {
                
                contract.methods.addVote(voteName, candidate).send({from:fromAccount,gas:3000000}).on('receipt', function(confirmationNumber, receipt){
                
                        resolve("casting vote was successful!")

                }).on('error', function(error, receipt) {
                        
                        reject("error in casting vote!")

                })
        })
        
}