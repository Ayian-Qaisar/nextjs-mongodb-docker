import clientPromise from "@/src/lib/mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const client = await clientPromise;
      const db = client.db("test-db");
      const { name, age } = req.body;

      const result = await db.collection("users").insertOne({ name, age });

      res.status(200).json({ message: "Data added successfully", result });
    } catch (error: unknown) {
      console.error("❌ Failed to add data", error);
      res
        .status(500)
        .json({
          message: "Failed to add data",
          error: (error as Error).message,
        });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
