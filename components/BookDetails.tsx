"use client";

import { useState } from "react";
import { Result } from "@/models/Books";
import Link from "next/link";
import BookCard from "@/components/BookCard";
import { Plus, Check, Pencil, Star, ArrowLeftIcon } from "lucide-react";
import { useCollection } from "@/context/CollectionContext";
import AddToCollection from "@/components/AddToCollection";

export default function BookDetail({ book }: { book: Result }) {
	const { addBook, collection } = useCollection();
	const collectionItem = collection.find((i) => i.book.id === book.id);
	const inCollection = !!collectionItem;
	const [showModal, setShowModal] = useState(false);

	const author = book.authors?.[0]?.name || "Autore sconosciuto";
	const summary = book.summaries?.[0] || null;
	const genres =
		book.subjects
			?.slice(0, 4)
			.map((s) => s.split("--")[0].trim())
			.filter((g, i, arr) => arr.indexOf(g) === i) || [];
	const primaryGenre = genres[0] || null;
	const year = book.issued ? new Date(book.issued).getFullYear() : null;

	return (
		<div className="mx-auto px-8 py-10 max-w-6xl min-h-[calc(100vh-64px)]">
			{/* Back */}
			<Link
				href="/"
				className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-gray-900 mb-12 transition-colors"
			>
				<div className="flex items-center">
					<ArrowLeftIcon size={14} />
					<span className="ms-1">Back to the catalog</span>
				</div>
			</Link>

			<div className="book-detail-layout">
				{/* ── LEFT COLUMN ── */}
				<div className="flex flex-col gap-4">
					<BookCard book={book} hideMeta />

					{/* CTA */}
					{inCollection ? (
						<button
							onClick={() => setShowModal(true)}
							className="flex items-center justify-center gap-2 bg-[#eef1f8] text-gray-700 px-6 py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors w-full"
						>
							<Check size={16} />
							<span>In your collection</span>
						</button>
					) : (
						<button
							onClick={() => setShowModal(true)}
							className="flex items-center justify-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-700 transition-colors w-full"
						>
							<Plus size={16} />
							<span>Add to your collection</span>
						</button>
					)}

					{/* Metadata */}
					<div className="border border-gray-200 rounded-xl overflow-hidden text-sm bg-white shadow-sm">
						<div className="flex justify-between items-center px-4 py-2.5 border-b border-gray-200">
							<span className="text-gray-400">Lingua</span>
							<span className="font-medium text-gray-900 uppercase">
								{book.languages?.[0]}
							</span>
						</div>
						<div className="flex justify-between items-center px-4 py-2.5 border-b border-gray-200">
							<span className="text-gray-400">Download</span>
							<span className="font-medium text-gray-900">
								{book.download_count?.toLocaleString("it-IT")}
							</span>
						</div>
						<div className="flex justify-between items-center px-4 py-2.5">
							<span className="text-gray-400">ID</span>
							<span className="font-medium text-gray-900">Nº {book.id}</span>
						</div>
					</div>
				</div>

				{/* ── RIGHT COLUMN ── */}
				<div className="flex flex-col">
					{primaryGenre && (
						<p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-5">
							{primaryGenre}
						</p>
					)}

					<h1 className="text-5xl font-bold text-gray-900 leading-tight mb-4">
						{book.title}
					</h1>

					<p className="text-lg text-gray-500 mb-8">
						by <span className="font-semibold text-gray-700">{author}</span>
					</p>

					{summary && (
						<p className="text-gray-600 leading-relaxed text-[15px] mb-8 max-w-prose">
							{summary}
						</p>
					)}

					{/* Recensione */}
					{inCollection && (
						<div className="border border-gray-200 bg-white rounded-2xl p-5 mb-8 shadow-sm">
							<div className="flex items-center justify-between mb-3">
								<p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
									Your review
								</p>
								<button
									onClick={() => setShowModal(true)}
									className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-700 transition-colors"
								>
									<Pencil size={12} />
									Edit
								</button>
							</div>
							{collectionItem.rating ? (
								<div className="flex gap-1 mb-3">
									{[1, 2, 3, 4, 5].map((s) => (
										<Star
											key={s}
											size={16}
											className={
												s <= collectionItem.rating!
													? "fill-yellow-400 text-yellow-400"
													: "text-gray-200"
											}
										/>
									))}
								</div>
							) : null}
							{collectionItem.comment && (
								<p className="text-sm text-gray-600 italic">
									"{collectionItem.comment}"
								</p>
							)}
							{!collectionItem.rating && !collectionItem.comment && (
								<p className="text-sm text-gray-400">No reviews yet.</p>
							)}
						</div>
					)}

					{/* Genre pills */}
					{genres.length > 0 && (
						<div>
							<p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
								Theme and Genre
							</p>
							<div className="flex flex-wrap gap-2">
								{genres.map((g) => (
									<span
										key={g}
										className="px-4 py-1.5 rounded-full border border-gray-200 text-sm text-gray-600 hover:border-gray-400 transition-colors cursor-pointer bg-white shadow-sm"
									>
										{g}
									</span>
								))}
							</div>
						</div>
					)}
				</div>
			</div>

			{showModal && (
				<AddToCollection
					book={book}
					onClose={() => setShowModal(false)}
					onAdd={(rating, comment) => {
						addBook(book, rating, comment);
						setShowModal(false);
					}}
				/>
			)}
		</div>
	);
}
