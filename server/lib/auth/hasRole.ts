import { NextApiRequest } from "next";

export default function hasRole(req: NextApiRequest, role: string) {
  const roles = req.headers["x-replit-user-roles"];
  return roles.includes(role);
}
