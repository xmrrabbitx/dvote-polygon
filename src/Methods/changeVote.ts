
import {checkTrxError} from "./error/checkTrxError"

export function changeVoteCall(web3:any, contract:any, abi: any, contractAddress:string, voteName:string, candidate:string, fromAddress:string, gasFee:number, gasPrice:string){

    return new Promise((resolve, reject) => {
            
            contract.methods.changeVote(voteName, candidate, fromAddress).send({
                    from: fromAddress,
                    gas: gasFee, gasPrice:gasPrice
                   }).on('error', function(error:any, receipt:any) {
            
                    reject("Error: " + error.reason)
                     
                }).on('confirmation', function(confirmationNumber, receipt){
                    if(receipt.status === false){
                      
                      checkTrxError(web3, receipt.transactionHash, receipt.blockNumber)
                   
                    }else{
                        resolve("change vote successful casted: " + JSON.stringify(receipt))
                    }
                }).catch(error=>{

                    resolve("Error: " + error.reason)
                })
    })
}