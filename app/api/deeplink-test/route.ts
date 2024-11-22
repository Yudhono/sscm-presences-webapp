// route.ts
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Only allow GET requests
    if (req.method !== "GET") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    // Redirect to custom URL scheme
    const redirectUrl = "myapp://sscm-presences-webapp.vercel.app/";

    // Set redirect headers
    res.setHeader("Location", redirectUrl);
    res.status(302).end();
  } catch (error) {
    console.error("Redirect error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
