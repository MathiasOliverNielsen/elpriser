"use client";
import { useElpriser } from "../../hooks/useElpriser";

export default function CurrentPage() {
  // Get today's date
  const today = new Date();
  const year = today.getFullYear().toString();
  const month = (today.getMonth() + 1).toString().padStart(2, "0");
  const day = today.getDate().toString().padStart(2, "0");
  const area = "DK1";

  const { data, loading, error } = useElpriser({ year, month, day, area });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>No data available</div>;

  const priceArray = data;
  if (!Array.isArray(priceArray) || priceArray.length === 0) {
    return <div>No price data available</div>;
  }

  // Find the price for the current hour
  const now = new Date();
  const currentPrice = priceArray.find((item) => {
    const start = new Date(item.time_start);
    const end = new Date(item.time_end);
    return now >= start && now < end;
  });

  if (!currentPrice) {
    return <div>No price available for the current hour</div>;
  }

  return (
    <div>
      <h1>ELPRISEN LIGE NU</h1>
      <div>
        <strong>{currentPrice.DKK_per_kWh} KR</strong> PR. KWH
      </div>
      <div>
        {new Date(currentPrice.time_start).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} -{" "}
        {new Date(currentPrice.time_end).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
      </div>
    </div>
  );
}
