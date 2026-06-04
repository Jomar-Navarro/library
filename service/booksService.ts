import { Books } from "@/models/Books";

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
