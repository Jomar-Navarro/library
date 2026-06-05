import { getBook } from "@/service/booksService";
import BookDetail from "@/components/BookDetails";

export default async function BookPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const book = await getBook(id);

	if (!book) return <div className="p-12 text-center">Libro non trovato.</div>;

	return <BookDetail book={book} />;
}
