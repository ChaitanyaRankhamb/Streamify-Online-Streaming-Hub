"use server";
import { getServerSession } from "next-auth";
import authOptions from "../app/api/auth/[...nextauth]/option";

export default async function GetServerSession() {
  return await getServerSession(authOptions);
}