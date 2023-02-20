import nc from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import isReplAuthed from "server/lib/auth/isReplAuthed";
import calculateQuota from "server/lib/calculateQuota";

const app = nc();

app.use(isReplAuthed);
app.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const data = await calculateQuota(req);
  res.json(data);
});

export default app;
