import { Quota } from "server/mongo";
import Gql from "./gql";
import { NextApiRequest } from "next";

const gql = new Gql("");

export default async function calculateQuota(req: NextApiRequest) {
  const username = String(req.headers["x-replit-user-name"]);

  let usage = 0;
  let total = Number(process.env.DEFAULT_QUOTA_LIMIT);

  const quota = await Quota.findOne({
    username,
  });
  if (quota) {
    usage = quota.responseCount;

    if (quota.apiKey) {
      return {
        usage: 0,
        total: 1,
        apiKey: quota.apiKey,
      };
    }

    return {
      total,
      usage,
      apiKey: null,
    };
  } else {
    const q = new Quota({
      username,
      responseCount: 0,
    });
    q.save();
    return {
      total,
      usage: 0,
      apiKey: null,
    };
  }
}
