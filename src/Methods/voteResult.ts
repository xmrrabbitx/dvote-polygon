

export function voteResult(web3:any, contract:any, abi: any,contractAddress:any,voteName:string, fromAccount:any){
        
        return contract.methods.voteResult(voteName).call({from:fromAccount}).then(function(result:any){
               
                const outputFilter = result.map(([name, votes, rest]) => ({ name, votes, ...rest }));

                return outputFilter;

        }).catch(function(error:any){
               
                return ("Error: " + error.reason);
                
        });
        
}