import { ABI, CONTRACT_ADDRESS } from "@/data";
import { Contract, ethers } from "ethers";

declare var window: any;
const getUserTxns = async () => {
  try {
    const { ethereum } = window;
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const contract = new Contract(CONTRACT_ADDRESS, ABI, signer);
    const userHistory = await contract.getUserTransactions();
    return userHistory;
  } catch (error) {
    throw new Error("Something went wrong");
  }
};

export default getUserTxns;
