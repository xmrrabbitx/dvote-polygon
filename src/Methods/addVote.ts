

export function addVote(web3:any, contract:any, abi: any,contractAddress:any,voteName:string, candidate:any, fromAccount:any){
  
        contract.methods.addVote(voteName, candidate).send({from:fromAccount,gas:3000000}).on('receipt', function(confirmationNumber, receipt){
                console.log("okk")
                return "add vote successful!"
            }).on('error', function(error, receipt) {
                console.log("not ok")
                return "error in casting vote!"
            });
        
            
}