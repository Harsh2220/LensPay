import { ABI, CONTRACT_ADDRESS } from "@/data";
import { Contract, ethers } from "ethers";

declare var window: any;

/**
 * @param toAddress Address on which Amoint to send
 * @param toLensHandle recivers lens handle
 * @param message  message `optional`
 * @param ammount  ammount you want to send
 */

type SendCryptoProps = {
  toAddress: string;
  toLensHandle: string;
  message?: string;
  ammount: string;
};

const sendCrypto = async (toAddress,toLensHandle,message,ammount) => {
  try {
    const { ethereum } = window;
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const contract = new Contract(CONTRACT_ADDRESS, ABI, signer);
    console.log(typeof(ammount));
    const txn = await contract.sendToHandle(toAddress, message, toLensHandle, {
      value: ethers.utils.parseEther(ammount),
    });
    await txn.wait();
    return txn;
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong", error);
    
  }
};

export default sendCrypto;
