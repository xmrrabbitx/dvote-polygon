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
    deploy(abi: Array<JSON>, bytecode: string, gasFeeOptional?: number, gasPriceOptional?: string): Promise<unknown>;
    createVote(voteName: string, candidate: string[], gasFeeOptional?: number, gasPriceOptional?: string): Promise<unknown>;
    addVote(voteName: string, candidate: string, fromAddress: string, gasFeeOptional?: number, gasPriceOptional?: string): Promise<unknown>;
    changeVote(voteName: string, candidate: string, fromAddress: string, gasFeeOptional?: number, gasPriceOptional?: string): Promise<unknown>;
    voteResult(voteName: string): Promise<unknown>;
}
//# sourceMappingURL=dvote.d.ts.map