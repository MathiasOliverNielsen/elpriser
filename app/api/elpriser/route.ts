import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const searchParams = new URL(request.url);
  const year = searchParams.searchParams.get("year") || "2026";
  const month = searchParams.searchParams.get("month") || "04";
  const day = searchParams.searchParams.get("day") || "16";
  const area = searchParams.searchParams.get("area") || "DK2";

  const url = `https://api.energidataservice.dk/dataset/Elspotprices?filter=%7B%22PriceArea%22%3A%20%22${area}
  %22%2C%20%22HourUTC%22%3A%20%7B%22gte%22%3A%20%22${year}-${month}-${day}
  T00%3A00%3A00Z%22%2C%20%22lt%22%3A%20%22${year}-${month}-${day}T23%3A59%3A59Z%22%7D%7D&sort=HourUTC+asc&timezone=dk`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "something went wrong" }, { status: 500 });
  }
}
