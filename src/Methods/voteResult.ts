

export function voteResultCall(web3:any, contract:any, abi: any,contractAddress:string,voteName:string, adminAccount:string){
        
        return new Promise((resolve, reject) => {
         contract.methods.voteResult(voteName).call({from:adminAccount}).then(function(result:any){
               
                const outputFilter = result.map(([name, votes, rest]:[string,string,[key:string]]) => ({ name, votes, ...rest }));
        
                        resolve(outputFilter);

                }).catch(function(error:any, receipt:any){
                
                        reject("Error: " + error.reason);
                        
                });
        });
}

