import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	const query = request.nextUrl.searchParams.get("query") ?? "";
	const page = request.nextUrl.searchParams.get("page") ?? "1";
	const response = await fetch(
		`https://gutendex.com/books?search=${encodeURIComponent(query)}&page=${page}`,
		{ next: { revalidate: 300 } },
	);

	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}
	const data = await response.json();
	return NextResponse.json(data);
}
