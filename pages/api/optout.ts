import { NextApiRequest, NextApiResponse } from "next";
import * as PushAPI from "@pushprotocol/restapi";
import * as ethers from "ethers";
const PK = "7c2d4d5a2acb052b3547280c19b18081b0edc37a4aaccb602cd6e0706f79ba6b";
const Pkey = `0x${PK}`;
const signer = new ethers.Wallet(Pkey);

/**
 * @params userAddress : user wallet address of whom to OPT-OUT for notification
 */

type OptOutForNotificationPayload = {
  userAddress: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const getNoti = async () => {
    try {
      const { userAddress }: OptOutForNotificationPayload = req.body;
      await PushAPI.channels.unsubscribe({
        signer,
        channelAddress: "eip155:5:0xf70fE25B6ee21dA1D56c9277c181696e1854dE10",
        userAddress: `eip155:5:${userAddress}`,
        onSuccess: () => {
          res.status(200).json({ message: "unsubscribed succesfully" });
        },
        onError: () => {
          res.status(500).json({ message: "something went wrong" });
        },
        env: "staging",
      });
    } catch (err) {
      res.status(500).json("error");
      console.error("Error: ", err);
    }
  };
  getNoti();
}
