import { Books } from "@/models/Books";

export async function searchBooks(query: string): Promise<Books | null> {
	try {
		const response = await fetch(
			`https://gutendex.com/books?search=${encodeURIComponent(query)}`,
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
