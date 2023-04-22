

export  function createVote(web3:any, contract:any, abi:any, contractAddress:any, voteName:string, candidate:any, fromAccount:any){
       
    return new Promise((resolve, reject) => {

        contract.methods.createVote(voteName, candidate).send({from:fromAccount,gas: 3000000}).on('confirmation', function(confirmationNumber, receipt){
               
                resolve("create vote successful!")

            }).on('error', function(error, receipt) {
               
                reject("error in creating vote!")
                
            })
    })
}