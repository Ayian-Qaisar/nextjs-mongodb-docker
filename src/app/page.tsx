"use client";

import { useState } from "react";

export default function Home() {
  const [result, setResult] = useState<string>("");
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [formData, setFormData] = useState<{ name: string; age: string }>({
    name: "",
    age: "",
  });

  const handleClick = async () => {
    const res = await fetch("/api/test-connection");
    const data = await res.json();
    setResult(JSON.stringify(data, null, 2));
    setIsConnected(res.ok);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/add-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    alert(data.message);
    setFormData({ name: "", age: "" });
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-semibold mb-4">MongoDB Test Connection</h1>
      <button
        onClick={handleClick}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Test Connection
      </button>
      {result && (
        <pre className="mt-6 p-4 text-white rounded max-w-md">{result}</pre>
      )}
      {isConnected && (
        <form
          onSubmit={handleFormSubmit}
          className="mt-6 flex flex-col items-center gap-4"
        >
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            className="px-4 py-2 border rounded"
            required
          />
          <input
            type="number"
            placeholder="Age"
            value={formData.age}
            onChange={(e) =>
              setFormData({ ...formData, age: e.target.value })
            }
            className="px-4 py-2 border rounded"
            required
          />
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Add Data
          </button>
        </form>
      )}
    </main>
  );
}