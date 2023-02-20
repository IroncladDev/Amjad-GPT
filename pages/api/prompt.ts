import nc from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import isReplAuthed from "../../server/lib/auth/isReplAuthed";
import createRateLimiter from "../../server/lib/auth/rateLimiter";

const app = nc();

app.use(isReplAuthed);
app.use(
  createRateLimiter({
    maxRequests: 15,
    windowMs: 1000 * 60,
  })
);
app.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const { prompt, history, username, bio, roles } = req.body;
  if (
    typeof prompt === "string" &&
    Array.isArray(history) &&
    history.every((e) => typeof e === "string")
  ) {
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
          username,
          history,
          roles,
        }),
      }
    ).then((r) => r.json());

    res.json(resp);
  } else {
    res.status(400).json({
      success: false,
      answer: null,
      message: "Invalid request body",
    });
  }
});

export default app;
