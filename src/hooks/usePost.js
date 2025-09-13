import { useState } from "react";

export function usePost(url) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function postData(body) {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("Request gagal");

      return await res.json();
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return { postData, loading, error };
}
