import { NextApiRequest, NextApiResponse } from "next";
import * as PushAPI from "@pushprotocol/restapi";

/**
 * @params userAddress : user wallet address of whom to fetch all notifications
 */

type GetNotificationPayload = {
  userAddress: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const getNoti = async () => {
    try {
      const { userAddress }: GetNotificationPayload = req.body;
      const allNoti = await PushAPI.user.getFeeds({
        user: `eip155:5:${userAddress}`,
        env: "staging",
        spam: true,
      });
      console.log(allNoti);
      res.status(200).json(allNoti);
    } catch (err) {
      res.status(500).json("error");
      console.error("Error: ", err);
    }
  };
  getNoti();
}
