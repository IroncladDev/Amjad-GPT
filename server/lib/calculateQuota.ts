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
    const gqlReq = await gql.raw({
      query: `query repl($id: String!) {
        repl(id: $id) {
          ...on Repl {
            topTippers {
              user {
                username
              }
              totalCyclesTipped
            }
          }
        }
      }`,
      variables: {
        id: process.env.REPL_ID,
      },
    });
    if (quota) {
      usage = quota.responseCount;
    }
    if (gqlReq?.data?.repl?.topTippers?.length) {
      total += Math.floor(
        gqlReq.data.repl.topTippers
          .filter((x) => x.username === username)
          .map((x) => x.totalCyclesTipped)
          .reduce((a, b) => a + b) / 5
      );
    }

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
