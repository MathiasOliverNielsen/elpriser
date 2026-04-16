import { useState, useEffect } from "react";

// Types
type Elpris = {
  DKK_per_kWh: number;
  EUR_per_kWh: number;
  EXR: number;
  time_start: string;
  time_end: string;
};

// hook parameters
type UseElpriserParams = {
  year: string;
  month: string;
  day: string;
  area: string;
};

export function useElpriser({ year, month, day, area }: UseElpriserParams) {
  // fetched data
  const [data, setData] = useState<Elpris[] | null>(null);
  // loading
  const [loading, setLoading] = useState<boolean>(true);
  // error handling
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      // API URL
      const url = `/api/elpriser?year=${year}&month=${month}&day=${day}&area=${area}`;

      // Feetch data from Route
      try {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const json = await res.json();
        setData(json);
      } catch (err) {
        setError("Failed to fetch data");
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData(); // <-- Call the async function
  }, [year, month, day, area]);

  return { data, loading, error };
}
