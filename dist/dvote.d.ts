export interface CompiledContract {
    abi: () => Array<JSON>;
    bytecode: () => string;
}
export declare class Dvote {
    private provider;
    private accounts;
    web3: any;
    private ether;
    private contractAddress;
    private abi;
    private contract;
    private contractEther;
    private signer;
    development: boolean;
    constructor(mnemonic: any, endpointUrl: any);
    compile(): CompiledContract;
    deploy(fromAccount: string, abi: any, bytecode: string): Promise<unknown>;
    createVote(voteName: string, candidate: string[], fromAccount: string): Promise<unknown>;
    addVote(voteName: string, candidate: string, fromAddress: string): Promise<unknown>;
    voteResult(voteName: string, fromAccount: string): any;
}
//# sourceMappingURL=dvote.d.ts.map