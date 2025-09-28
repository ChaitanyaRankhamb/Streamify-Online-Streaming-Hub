import { authHandler } from "../../../../auth";

export const GET = (req: Request) => authHandler(req);
export const POST = (req: Request) => authHandler(req);
