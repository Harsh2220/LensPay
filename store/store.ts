import create from "zustand";
import { devtools, persist } from "zustand/middleware";

export type NetworkType = "SOL" | "FIL" | "ETH" | "ALGO" | undefined

interface TransactionState {
    networkMetadata: {
        bgColor: string,
        icon: string,
        regex: string,
        senderAddress: string,
        sampleAddress: string,
    }
    networkType: NetworkType;
    currentScreen: number;
    userAddress: string;
    amount: number;
    balance: number;
    transaction: number[];
    isLoading: boolean;
    setIsLoading: () => void;
    handleNetworkType: (network: NetworkType) => void;
    handleScreen: (screenNumber: number) => void;
    handleUserAddress: (walletAddress: string) => void;
    handleAmount: (amount: number) => void;
    handleBalance: (sentAmount: number, balance: number) => void;
    resetTransaction: () => void;
    handleTransaction: (transactionAmount: number, transaction: number[]) => void;
}

export const useTransactionStore = create<TransactionState>()(
    devtools(
        persist(
            (set, get) => ({
                networkMetadata: {
                    bgColor: "",
                    icon: "",
                    regex: "",
                    senderAddress: "",
                    sampleAddress: "",
                },
                networkType: undefined,
                currentScreen: 0,
                userAddress: "",
                amount: 0,
                balance: 20,
                transaction: [],
                isLoading: false,
                setIsLoading: () => {
                    set({ isLoading: !get().isLoading });
                },
                handleNetworkType: (network: NetworkType) => {
                    set({ networkType: network })
                    if (network === 'SOL') {
                        set({
                            networkMetadata: {
                                bgColor: "linear-gradient(229.14deg, #94F533 -2.89%, #2AD0CA 84.74%)",
                                icon: "https://upload.wikimedia.org/wikipedia/en/b/b9/Solana_logo.png",
                                regex: "[a-zA-Z0-9]{44}",
                                senderAddress: "EGTQ9gRpciXDmnCM4twkMkdhwon9Bq12ka1eTHNVykAf",
                                sampleAddress: "XDmnCM4twTHNVykAfkMkdhwon9BEGTQ9gRpciq12ka1e"
                            }
                        })
                    }
                    if (network === 'ALGO') {
                        set({
                            networkMetadata: {
                                bgColor: "linear-gradient(229.14deg, #d55a30 -2.89%, #a20f7a 84.74%)",
                                icon: "https://s2.coinmarketcap.com/static/img/coins/200x200/4030.png",
                                regex: "[a-zA-Z0-9]{58}",
                                senderAddress: "QKQNOVNJKZVLHXTXBE5LQLMVIWDDAFFL4EXMTBUVJ5ATJKK7CIPPCCFU44",
                                sampleAddress: "HXTXBE5LQLMVIWDAJ5PCCFU44TJKK7CIPQKQNOVNJJ5PCCFU44KZVLBBUV"
                            }
                        })
                    }
                    if (network === 'ETH') {
                        set({
                            networkMetadata: {
                                bgColor: "linear-gradient(229.14deg, #81a6f7 -2.89%, #a6fbf5 84.74%)",
                                icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Ethereum_logo_2014.svg/1257px-Ethereum_logo_2014.svg.png",
                                regex: "^(0x)[a-zA-Z0-9]{40}",
                                senderAddress: "0x6a2253b59b314b593551aACc36c857D292A6bADd",
                                sampleAddress: "0xb314b59355D292A6bADd1aACc6a2253b5936c857"
                            }
                        })
                    }
                    if (network === 'FIL') {
                        set({
                            networkMetadata: {
                                bgColor: "#0090ff",
                                icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Filecoin.svg/1200px-Filecoin.svg.png",
                                regex: "^(f4)[a-zA-Z0-9]{42}",
                                senderAddress: "f410f5iiatzw337wssidtx6nknpg3bf5pnwt47byin3y",
                                sampleAddress: "f4337wsswt47byin3yidtx6nknpg10f5iiatzw3bf5pn",
                            }
                        })
                    }
                },
                handleScreen: (screenNumber: number) =>
                    set({ currentScreen: screenNumber }),
                handleUserAddress: (walletAddress: string) =>
                    set({ userAddress: walletAddress }),
                handleAmount: (amount: number) => set({ amount: amount }),
                handleBalance: (sentAmount: number, balance: number) =>
                    set({ balance: balance - sentAmount }),
                handleTransaction: (
                    transactionAmount: number,
                    transaction: number[]
                ) => {
                    transaction.push(transactionAmount);
                },
                resetTransaction: () => {
                    set({
                        currentScreen: 0,
                        userAddress: "",
                        amount: 0,
                        balance: 20,
                        transaction: [],
                    });
                },
            }),
            {
                name: "sol-transaction-storage",
            }
        )
    )
);
