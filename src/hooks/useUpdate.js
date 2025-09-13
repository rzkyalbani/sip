import { useState } from "react";

export function useUpdate(url) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function updateData(body) {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("Gagal update data");

      return await res.json();
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return { updateData, loading, error };
}
