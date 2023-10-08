export interface CompiledContract {
    abi: () => Array<JSON>;
    bytecode: () => string;
}
export declare class Dvote {
    private provider;
    private privateKey;
    adminAccount: string;
    web3: any;
    private ether;
    private contractAddress;
    private abi;
    private contract;
    private contractEther;
    private signer;
    development: boolean;
    private gasFee;
    private gasPrice;
    private votePathCheck;
    constructor(endpointUrl: string);
    compile(): CompiledContract;
    deploy(abi: any, bytecode: string, gasFeeOptional?: any, gasPriceOptional?: any): Promise<unknown>;
    createVote(voteName: string, candidate: string[]): Promise<unknown>;
    addVote(voteName: string, candidate: string, fromAddress: string): Promise<unknown>;
    changeVote(voteName: string, candidate: string, fromAddress: string): Promise<unknown>;
    voteResult(voteName: string): any;
}
//# sourceMappingURL=dvote.d.ts.map