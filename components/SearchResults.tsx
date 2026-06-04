"use client";

import { useState, useEffect } from "react";
import { searchBooks } from "@/service/booksService";
import { Books } from "@/models/Books";
import BookCard from "@/components/BookCard";
import Link from "next/link";
import SearchBar from "@/components/SearchBar";

export default function Search() {
	const [query, setQuery] = useState("");
	const [books, setBooks] = useState<Books | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [nextPage, setNextPage] = useState<string | null>(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [loadingMore, setLoadingMore] = useState(false);

	// Funzione per eseguire la ricerca
	// Resettare lo stato dei risultati, errori e paginazione ad ogni nuova ricerca
	const handleSearch = async (query: string) => {
		setLoading(true);
		setError(null);
		setCurrentPage(1);
		const results = await searchBooks(query);
		if (results) {
			setNextPage(results.next);
			setBooks(results);
		} else {
			setError("Qualcosa è andato storto. Riprova.");
		}
		setLoading(false);
	};

	// Debounce della search input
	// La ricerca viene eseguita solo dopo 500ms dall'ultima digitazione,
	// e solo se la query ha almeno 3 caratteri
	useEffect(() => {
		const debounce = setTimeout(() => {
			if (query.length >= 3) {
				handleSearch(query);
			} else {
				setBooks(null);
			}
		}, 500);
		return () => clearTimeout(debounce);
	}, [query]);

	// Funzione per caricare più risultati
	// Aggiorna lo stato dei libri aggiungendo i nuovi risultati,
	// e gestisce la paginazione
	const loadMore = async () => {
		setLoadingMore(true);
		const nextPageNum = currentPage + 1;
		const more = await searchBooks(query, nextPageNum);
		if (more) {
			setCurrentPage(nextPageNum);
			setNextPage(more.next);
			setBooks((prev) => ({
				...more,
				results: [
					...prev!.results,
					...more.results.filter(
						(book) => !prev!.results.some((b) => b.id === book.id),
					),
				],
			}));
		}
		setLoadingMore(false);
	};

	return (
		<div>
			<SearchBar query={query} onChange={setQuery} />

			{loading && <p className="mt-8 text-gray-400">Loading...</p>}

			{error && <p className="mt-8 text-red-500">{error}</p>}

			{!loading && !books && query.length < 3 && (
				<p className="mt-12 text-gray-400">Search a book to get started.</p>
			)}

			{!loading && books && books.results.length === 0 && (
				<p className="mt-12 text-gray-400">
					No results for &ldquo;{query}&rdquo;.
				</p>
			)}

			{!loading && books && books.results.length > 0 && (
				<>
					<p className="mt-8 mb-4 text-xs font-semibold uppercase tracking-widest text-gray-400">
						{books.count} results
					</p>
					<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
						{books.results.map((book) => (
							<Link key={book.id} href={`/book/${book.id}`}>
								<BookCard book={book} />
							</Link>
						))}
					</div>
				</>
			)}

			{nextPage && (
				<div className="mt-8 flex justify-center">
					<button
						onClick={loadMore}
						className="bg-cyan-950 cursor-pointer p-3 rounded-full"
					>
						{loadingMore ? "Loading..." : "Load more"}
					</button>
				</div>
			)}
		</div>
	);
}
