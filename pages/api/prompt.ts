import nc from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import isReplAuthed from "../../server/lib/auth/isReplAuthed";
import createRateLimiter from "../../server/lib/auth/rateLimiter";
import { Quota, Response } from "server/mongo";
import calculateQuota from "server/lib/calculateQuota";
import generateResponse from "server/lib/generateResponse";

const app = nc();

app.use(isReplAuthed);
app.use(
  createRateLimiter({
    maxRequests: 20,
    windowMs: 1000 * 60,
  })
);
app.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const { prompt, history, apiKey } = req.body;
  const username = req.headers["x-replit-user-name"];
  const bio = req.headers["x-replit-user-bio"];
  const roles = String(req.headers["x-replit-user-roles"]);

  if (
    typeof prompt === "string" &&
    Array.isArray(history) &&
    history.every((e) => typeof e === "string")
  ) {
    const { total, usage } = await calculateQuota(req);
    if (usage >= total) {
      res.status(429).json({
        success: true,
        answer: `You've used up your quota of ${total} responses.  If you would like to increase your quota, you can add your own OpenAI API key in settings, or [tip this Repl](https://ai.repl.page/__repl).
        
Alternatively, you can try out [Ghostwriter Chat](https://replit.com/site/ghostwriter).`,
      });
      return;
    }

    const userContext =
      `The human speaking to you has a username of ${username}. ` +
      (bio ? `The human describes themself with "${bio}". ` : "") +
      (roles
        ? `The human has the following roles on their Replit account: ${roles
            .split(",")
            .join(", ")}`
        : "");

    const resp = await generateResponse({
      history,
      question: prompt,
      apiKey,
      userContext,
    });

    if (typeof resp === "string") {
      const userQuota = await Quota.findOne({
        username,
      });

      const PromptLog = new Response({
        prompt,
        response: resp,
        username,
        apiKey: apiKey || null,
      });

      if (userQuota) {
        if (!userQuota.apiKey) {
          userQuota.responseCount++;
        }
        await userQuota.save();
      } else {
        const newUserQuota = new Quota({
          username,
          responseCount: 1,
        });
        await newUserQuota.save();
      }
      await PromptLog.save();

      res.status(200).json({
        success: true,
        answer: resp,
      });
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
