"use client";

import Link from "next/link";
import { Search, Star, Trash2 } from "lucide-react";
import { useCollection } from "@/context/CollectionContext";
import BookCard from "@/components/BookCard";

export default function CollectionGrid() {
	const { collection, removeBook } = useCollection();

	if (collection.length === 0) {
		return (
			<div className="min-h-[calc(100vh-114px)] flex flex-col">
				<div className="flex-1 flex flex-col items-center justify-center px-4 text-center">
					<div className="w-20 h-20 rounded-2xl bg-gray-100 flex items-center justify-center mb-6">
						<Search size={32} className="text-gray-400" />
					</div>
					<h2 className="text-2xl font-semibold text-gray-900 mb-3">
						Your collection is empty
					</h2>
					<p className="text-gray-500 max-w-sm mb-8">
						Search the catalog and add the books you want to read or that you
						loved.
					</p>
					<Link
						href="/"
						className="flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors"
					>
						<Search size={16} />
						Explore the catalog
					</Link>
				</div>
			</div>
		);
	}

	return (
		<div className="mx-auto px-8 py-10 max-w-6xl">
			<div className="flex items-baseline justify-between mb-8">
				<h1 className="text-2xl font-semibold text-gray-900">My collection</h1>
				<p className="text-sm text-gray-400">{collection.length} books</p>
			</div>

			<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
				{collection.map(({ book, rating, comment }) => (
					<div key={book.id} className="flex flex-col gap-2">
						<Link href={`/book/${book.id}`}>
							<BookCard book={book} hideMeta />
						</Link>

						<div>
							<p className="text-sm font-semibold text-gray-900 leading-snug line-clamp-1">
								{book.title}
							</p>
							<p className="text-xs text-gray-500 mt-0.5 truncate">
								{book.authors?.[0]?.name}
							</p>
						</div>

						{rating && (
							<div className="flex gap-0.5">
								{[1, 2, 3, 4, 5].map((s) => (
									<Star
										key={s}
										size={12}
										className={
											s <= rating
												? "fill-gray-900 text-gray-900"
												: "text-gray-200"
										}
									/>
								))}
							</div>
						)}

						{comment && (
							<p className="text-xs text-gray-400 italic line-clamp-2">
								"{comment}"
							</p>
						)}

						<button
							onClick={() => removeBook(book.id)}
							className="flex items-center gap-1 text-xs text-gray-400 hover:text-red-400 transition-colors mt-1 w-fit"
						>
							<Trash2 size={12} />
							Remove
						</button>
					</div>
				))}
			</div>
		</div>
	);
}
