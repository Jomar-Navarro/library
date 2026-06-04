import SearchResults from "@/components/SearchResults";

export default function Home() {
	return (
		<main className="container mx-auto px-4 py-12 text-center min-h-[calc(100vh-114px)]">
			<p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
				Catalogo · Project Library App
			</p>
			<h1 className="text-5xl font-bold text-gray-900 leading-tight mb-4">
				Find your next favorite book
				<br />
				to read.
			</h1>
			<p className="text-gray-500 mb-8 max-w-xl text-ceter mx-auto">
				Over 70'000 public domain works. Search by title, author, genre and add
				them to your collection.
			</p>
			<SearchResults />
		</main>
	);
}
