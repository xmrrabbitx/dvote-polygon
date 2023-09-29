export interface CompiledContract {
    abi: () => Array<JSON>;
    bytecode: () => string;
}
export declare class Dvote {
    private provider;
    accounts: any;
    adminAccount: string;
    web3: any;
    private ether;
    private contractAddress;
    private abi;
    private contract;
    private contractEther;
    private signer;
    development: boolean;
    constructor(account: string, endpointUrl: string);
    compile(): CompiledContract;
    deploy(abi: any, bytecode: string): Promise<unknown>;
    createVote(voteName: string, candidate: string[]): Promise<unknown>;
    addVote(voteName: string, candidate: string, fromAddress: string): Promise<unknown>;
    changeVote(voteName: string, candidate: string, fromAddress: string): Promise<unknown>;
    voteResult(voteName: string): any;
}
//# sourceMappingURL=dvote.d.ts.map