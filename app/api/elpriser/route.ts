import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const searchParams = new URL(request.url);
  const year = searchParams.searchParams.get("year") || "2026";
  const month = searchParams.searchParams.get("month") || "04";
  const day = searchParams.searchParams.get("day") || "16";
  const area = searchParams.searchParams.get("area") || "DK2";

  const url = `https://www.elprisenligenu.dk/api/v1/prices/${year}/${month}-${day}_${area}.json`;

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
