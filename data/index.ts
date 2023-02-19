export const CONTRACT_ADDRESS = "0x8bd4316A1688f8164b15e7E9e99ea6BDfDf130d2";





export const ABI = [
  {
    inputs: [
      {
        internalType: "address payable",
        name: "receiver",
        type: "address",
      },
      {
        internalType: "string",
        name: "message",
        type: "string",
      },
      {
        internalType: "string",
        name: "handle",
        type: "string",
      },
    ],
    name: "sendToHandle",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "getUserTransactions",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "from",
            type: "address",
          },
          {
            internalType: "address",
            name: "toAddress",
            type: "address",
          },
          {
            internalType: "string",
            name: "toHandle",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "ammount",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "message",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "timestamp",
            type: "uint256",
          },
        ],
        internalType: "struct LensPay.Transaction[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
