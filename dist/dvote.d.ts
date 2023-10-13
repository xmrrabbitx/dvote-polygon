export interface CompiledContract {
    abi: () => Array<JSON>;
    bytecode: () => string;
}
export declare class Dvote {
    private provider;
    private privateKey;
    private adminAccount;
    private web3;
    private contractAddress;
    private abi;
    private contract;
    private signer;
    private gasFee;
    private gasPrice;
    renewContract: boolean;
    private bytecode;
    private deployed;
    constructor(endpointUrl: string, renewContract?: boolean);
    compile(): CompiledContract;
    deploy(abi: Array<JSON>, bytecode: string, gasFeeOptional?: number, gasPriceOptional?: string): any;
    createVote(voteName: string, candidate: string[], gasFeeOptional?: number, gasPriceOptional?: string): any;
    addVote(voteName: string, candidate: string, fromAddress: string, gasFeeOptional?: number, gasPriceOptional?: string): any;
    changeVote(voteName: string, candidate: string, fromAddress: string, gasFeeOptional?: number, gasPriceOptional?: string): any;
    voteResult(voteName: string): any;
}
//# sourceMappingURL=dvote.d.ts.map