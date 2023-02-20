import rateLimit, { MemoryStore } from "express-rate-limit";
import { NextApiRequest } from "next";

export default function createRateLimiter({
  maxRequests,
  windowMs,
}: {
  maxRequests: number;
  windowMs: number;
}) {
  return rateLimit({
    max: maxRequests,
    windowMs,
    legacyHeaders: false,
    message:
      "Too many requests sent over a short amount of time, please try again later.",
    store: new MemoryStore(),
    keyGenerator: (req: NextApiRequest) =>
      String(req.headers["x-replit-user-id"]),
  });
}
