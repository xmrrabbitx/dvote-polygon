
export function checkTrxError(web3:any, trx:any, blockNumber:number){

    return new Promise((resolve, reject) => {

        web3.eth.getTransaction(trx, blockNumber).then(error=>{

            reject(error.reason)

        })
        
    })
}