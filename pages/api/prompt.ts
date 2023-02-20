import nc from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import isReplAuthed from "../../server/lib/auth/isReplAuthed";
import createRateLimiter from "../../server/lib/auth/rateLimiter";
import { Quota } from "server/mongo";
import calculateQuota from "server/lib/calculateQuota";

const app = nc();

app.use(isReplAuthed);
app.use(
  createRateLimiter({
    maxRequests: 20,
    windowMs: 1000 * 60,
  })
);
app.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const { prompt, history, bio, roles } = req.body;
  if (
    typeof prompt === "string" &&
    Array.isArray(history) &&
    history.every((e) => typeof e === "string")
  ) {
    const { total, usage } = await calculateQuota(req);
    if (usage >= total) {
      res.status(429).json({
        success: true,
        answer: `You've used up your quota of ${total} responses.  If you would like to increase your quota, you can [tip this Repl](https://ai.repl.page/__repl) some [Cycles](https://replit.com/cycles).
        
Alternatively, you can try out [Ghostwriter Chat](https://replit.com/site/ghostwriter).`,
      });
      return;
    }

    const resp = await fetch(
      "https://amjad-gpt-api.replitironclad.repl.co/ask",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({
          question: prompt,
          secret: process.env.API_SECRET,
          bio,
          username: req.headers["x-replit-user-name"],
          history,
          roles: roles.split(",").join(", "),
        }),
      }
    );

    if (resp.status === 200) {
      const userQuota = await Quota.findOne({
        username: req.headers["x-replit-user-name"],
      });

      if (userQuota) {
        userQuota.responseCount++;
        await userQuota.save();
      } else {
        const newUserQuota = new Quota({
          username: req.headers["x-replit-user-name"],
          responseCount: 1,
        });
        await newUserQuota.save();
      }

      const jsonRes = await resp.json();
      res.json(jsonRes);
    } else {
      res.status(500).json({
        success: false,
        answer: null,
        message: "Internal Server Error, Please try again",
      });
    }
  } else {
    res.status(400).json({
      success: false,
      answer: null,
      message: "Invalid request body",
    });
  }
});

export default app;
