import { NextApiRequest, NextApiResponse } from "next";

export default function isReplAuthed(
  req: NextApiRequest,
  res: NextApiResponse,
  next: () => void
) {
  if (!!req.headers["x-replit-user-id"]) next();
  else {
    res.setHeader("Set-Cookie", "REPL_AUTH=;");
    res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }
}
