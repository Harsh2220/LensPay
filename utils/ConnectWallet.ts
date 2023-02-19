import { ethers } from "ethers";
import { any } from "prop-types";
import React, { SetStateAction } from "react";
declare var window: any;
type IConnectWallet = {
  walletConnected: boolean;
  setWalletConnected: React.Dispatch<SetStateAction<boolean>>;
  setCurrentAccount: React.Dispatch<SetStateAction<string>>;
};

const ConnectWallet = async ({
  walletConnected,
  setWalletConnected,
  setCurrentAccount,
}: IConnectWallet) => {
  try {
    const { ethereum } = window;
    if (!ethereum) {
      alert("Please Install Metamask");
    } else {
      const getAccount = await ethereum.request({
        method: "eth_requestAccounts",
      });
      let provider = new ethers.providers.Web3Provider(ethereum, "any");
      let signer = provider.getSigner();
      let balance = await signer.getBalance();
      
      let chaindId = await signer.getChainId();
      console.log(chaindId);
      if (chaindId !== 80001) {
        setWalletConnected(false);

        signer.getChainId().then(async (res) => {
          if (res !== 80001) {
            const polygon = await ethereum.request({
              method: "wallet_switchEthereumChain",
              params: [{ chainId: "0x80001" }],
            });
            const accounts = await ethereum.request({
              method: "eth_requestAccounts",
            });
            console.log(accounts);
            signer = provider.getSigner();
            setCurrentAccount(accounts[0]);
            setWalletConnected(true);
            return {connected: true, wallet: accounts[0], balance: balance};
            // state.setCurrentAccount(accounts[0])
          }
        });
      }
      if (chaindId == 80001) {
        setWalletConnected(true);
        setCurrentAccount(getAccount[0]);
        return {connected: true, wallet: getAccount[0], balance: balance};
        // state.setCurrentAccount(getAccount[0]);
      }

    }
  } catch (err) {
    console.log(err);
  }
};

export default ConnectWallet;
