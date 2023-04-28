
export  function createVote(web3:any, contract:any, abi:any, contractAddress:any, voteName:string, candidate:any, fromAccount:any){
       
    return new Promise((resolve, reject) => {
        contract.handleRevert = true
        contract.methods.createVote(voteName, candidate).send({from:fromAccount,gas: 3000000, handleRevert:true}).on('confirmation', function(confirmationNumber, receipt){
               
            if(receipt.status){
                resolve(receipt)
            }else{
                
              // reject(receipt)
                
            }

            }).on('error', function(error, receipt) {
               
               
             reject(error)
                
                
            })
    })
}

function handleRevert(err: any, web3: any) {
    throw new Error("Function not implemented.")
}
