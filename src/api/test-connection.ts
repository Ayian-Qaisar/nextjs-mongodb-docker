import clientPromise from "@/src/lib/mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const client = await clientPromise;
    const db = client.db("test-db");
    const result = await db.collection("ping").insertOne({
      connected: true,
      at: new Date(),
    });

    console.log("✅ MongoDB Connected");
    res.status(200).json({ message: "Connected to MongoDB", result });
  } catch (error: unknown) {
    // Replace `any` with `unknown` or a specific error type
    console.error("❌ MongoDB Connection Failed", error);
    res
      .status(500)
      .json({ message: "Connection failed", error: (error as Error).message });
  }
}
