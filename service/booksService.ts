import { Books, Result } from "@/models/Books";

export async function searchBooks(
	query: string,
	page: number = 1,
	perPage: number = 20,
): Promise<Books | null> {
	try {
		const response = await fetch(
			`/api/books?query=${encodeURIComponent(query)}&page=${page}`,
		);

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		return await response.json();
	} catch (error) {
		console.error("Error fetching books:", error);
		return null;
	}
}

export async function fetchBookbyId(id: number): Promise<Result | null> {
	try {
		const response = await fetch(`/api/books/${id}`);

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		return await response.json();
	} catch (error) {
		console.error("Error fetching book:", error);
		return null;
	}
}

export async function getBook(id: string): Promise<Result | null> {
	const response = await fetch(`https://gutendex.com/books/${id}`, {
		next: { revalidate: 300 },
	});
	if (!response.ok) return null;
	return response.json();
}
