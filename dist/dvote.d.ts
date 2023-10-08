export interface CompiledContract {
    abi: () => Array<JSON>;
    bytecode: () => string;
}
export declare class Dvote {
    private provider;
    private privateKey;
    adminAccount: string;
    web3: any;
    private contractAddress;
    private abi;
    private contract;
    private signer;
    private devMode;
    private gasFee;
    private gasPrice;
    constructor(endpointUrl: string, renew?: boolean, devMode?: boolean);
    compile(): CompiledContract;
    deploy(abi: Array<JSON>, bytecode: string, gasFeeOptional?: number, gasPriceOptional?: string): Promise<unknown>;
    createVote(voteName: string, candidate: string[]): Promise<unknown>;
    addVote(voteName: string, candidate: string, fromAddress: string): Promise<unknown>;
    changeVote(voteName: string, candidate: string, fromAddress: string): Promise<unknown>;
    voteResult(voteName: string): any;
}
//# sourceMappingURL=dvote.d.ts.map