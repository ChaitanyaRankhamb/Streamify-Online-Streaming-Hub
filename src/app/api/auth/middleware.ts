import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "../../../lib/jwt";

const SECRET_KEY = process.env.JWT_SECRET || "secret123";

export function withAuth(handler: Function) {
  return async (req: NextRequest) => {
    try {
      // Read token from Authorization header OR cookie
      const authHeader = req.headers.get("Authorization");
      const cookieToken = req.cookies.get("token")?.value;
      const token = authHeader?.split(" ")[1] || cookieToken;

      if (!token) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      const user = verifyToken(token, SECRET_KEY);
      if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      // Attach user info to request
      (req as any).user = user;

      return handler(req);

    } catch (err) {
      console.error("withAuth error:", err);
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  };
}
