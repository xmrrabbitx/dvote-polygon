
export function voteResultCall(web3:any, contract:any, abi: any,contractAddress:string,voteName:string, adminAccount:string){
        
        return contract.methods.voteResult(voteName).call({from:adminAccount}).then(function(result:any){
               
                const outputFilter = result.map(([name, votes, rest]:[string,string,[key:string]]) => ({ name, votes, ...rest }));

                return outputFilter;

        }).catch(function(error:any, receipt:any){
               
                return ("Error: " + error.reason);
                
        });
        
}

