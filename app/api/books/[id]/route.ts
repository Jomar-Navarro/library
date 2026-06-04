import { NextRequest, NextResponse } from "next/server";

export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> },
) {
	const { id } = await params;
	const response = await fetch(`https://gutendex.com/books/${id}`, {
		next: { revalidate: 300 },
	});

	if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

	const data = await response.json();
	return NextResponse.json(data);
}
