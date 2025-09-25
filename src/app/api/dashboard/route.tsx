import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "../../../lib/jwt";

export default async function DashboardPage() {
  const token = (await cookies()).get("token")?.value;

  if (!token) redirect("/login");

  const user = verifyToken(token, process.env.JWT_SECRET || "secret123");
  if (!user) redirect("/login");

  return (
    <div>
      <h1>Welcome, {user.username}</h1>
      <p>Email: {user.email}</p>
    </div>
  );
}
