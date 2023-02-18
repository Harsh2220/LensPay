import { NextApiRequest, NextApiResponse } from "next";
import * as PushAPI from "@pushprotocol/restapi";
import * as ethers from "ethers";
const PK = "7c2d4d5a2acb052b3547280c19b18081b0edc37a4aaccb602cd6e0706f79ba6b";
const Pkey = `0x${PK}`;
const signer = new ethers.Wallet(Pkey);

/**
 * @params toAddress : user wallet address to whom send notificatioon
 * @params title : title of notification
 * @params body : body of notification
 */

type SendNotificationPayload = {
  title: string;
  body: string;
  toAddress: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const sendNoti = async () => {
    try {
      const { title, body, toAddress }: SendNotificationPayload = req.body;

      const apiResponse = await PushAPI.payloads.sendNotification({
        signer,
        type: 3,
        identityType: 2,
        notification: {
          title: `test notii from lenspay`,
          body: `sent from frontend`,
        },
        payload: {
          title: `localhost:3000/ kam ho raha hia`,
          body: `send done now fetch`,
          cta: "",
          img: "",
        },
        recipients: `eip155:5:${toAddress}`,
        channel: "eip155:5:0xf70fE25B6ee21dA1D56c9277c181696e1854dE10",
        env: "staging",
      });
      // apiResponse?.status === 204, if sent successfully!
      console.log("API repsonse: ", apiResponse);
      if (apiResponse?.status === 204) {
        res.status(200).json("sent");
      }
    } catch (err) {
      res.status(500).json("error");

      console.error("Error: ", err);
    }
  };
  sendNoti();
}
