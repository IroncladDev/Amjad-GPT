import fetch from "node-fetch";

export default class Gql {
  sid: string;

  constructor(sid: string) {
    this.sid = sid;
  }

  async raw(body: {
    query: string;
    variables?: {
      [key: string]: any;
    };
  }) {
    const res = await fetch("https://replit.com/graphql", {
      method: "POST",
      // @ts-ignore
      headers: {
        "x-requested-with": "replit",
        origin: "https://replit.com",
        accept: "*/*",
        "content-type": "application/json",
        connection: "keep-alive",
        host: "replit.com",
        "user-agent": "Mozilla/5.0",
        cookie: "connect.sid=" + this.sid,
      },
      body: JSON.stringify(body),
    });
    let response = await res.text();
    try {
      const rs = JSON.parse(response);
      return rs;
    } catch (e) {
      console.log(e);
      if (e.message.includes("Unexpected token P")) {
        throw new Error("Invalid body " + JSON.stringify(body) + " provided");
      } else {
        throw new Error("Ratelimited");
      }
    }
  }
}
