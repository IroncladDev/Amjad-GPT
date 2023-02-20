import { Quota } from "server/mongo";
import Gql from "./gql";
import hasRole from "./auth/hasRole";
import { NextApiRequest } from "next";

const gql = new Gql("");

export default async function calculateQuota(req: NextApiRequest) {
  const username = String(req.headers["x-replit-user-name"]);

  let usage = 0;
  let total = Number(process.env.DEFAULT_QUOTA_LIMIT);

  const quota = await Quota.findOne({
    username,
  });
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
        .map((x) => x.totalCyclesTipped)
        .reduce((a, b) => a + b) / 4
    );
  }

  if (hasRole(req, "admin")) {
    return {
      usage: 0,
      total: 10000,
      isAdmin: true,
    };
  }

  return {
    total,
    usage,
    isAdmin: false,
  };
}