"use client";

import { useState } from "react";
import { X, Star } from "lucide-react";
import { Result } from "@/models/Books";

interface Props {
	book: Result;
	onClose: () => void;
	onAdd: (rating?: number, comment?: string) => void;
}

export default function AddToCollectionModal({ book, onClose, onAdd }: Props) {
	const [rating, setRating] = useState(0);
	const [hovered, setHovered] = useState(0);
	const [comment, setComment] = useState("");

	const author = book.authors?.[0]?.name || null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center">
			<div className="absolute inset-0 bg-black/30" onClick={onClose} />
			<div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 p-6">
				{/* Close */}
				<button
					onClick={onClose}
					className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors"
				>
					<X size={20} />
				</button>

				{/* Header */}
				<div className="flex items-center gap-4 mb-6">
					<div
						className="w-14 h-14 rounded-lg flex items-center justify-center shrink-0"
						style={{ backgroundColor: "#45445e" }}
					>
						<span className="text-white/70 text-[8px] uppercase tracking-widest text-center px-1 leading-tight">
							{book.title.slice(0, 10)}
						</span>
					</div>
					<div>
						<p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-0.5">
							Add to your collection
						</p>
						<h2 className="font-semibold text-gray-900 leading-tight">
							{book.title}
						</h2>
						{author && <p className="text-sm text-gray-500">{author}</p>}
					</div>
				</div>

				{/* Stars */}
				<div className="mb-5">
					<div className="flex items-center justify-between mb-2">
						<p className="text-sm font-medium text-gray-700">Your rating</p>
						<span className="text-xs text-gray-400">optional</span>
					</div>
					<div className="flex items-center gap-1">
						{[1, 2, 3, 4, 5].map((star) => (
							<button
								key={star}
								onClick={() => setRating(star === rating ? 0 : star)}
								onMouseEnter={() => setHovered(star)}
								onMouseLeave={() => setHovered(0)}
							>
								<Star
									size={24}
									className={
										star <= (hovered || rating)
											? "fill-gray-900 text-gray-900"
											: "text-gray-300"
									}
								/>
							</button>
						))}
						{rating === 0 && (
							<span className="text-sm text-gray-400 ml-2">Tap to vote</span>
						)}
					</div>
				</div>

				{/* Comment */}
				<div className="mb-6">
					<div className="flex items-center justify-between mb-2">
						<p className="text-sm font-medium text-gray-700">Comment</p>
						<span className="text-xs text-gray-400">optional</span>
					</div>
					<textarea
						value={comment}
						onChange={(e) => setComment(e.target.value)}
						placeholder="Cosa ne pensi? Un appunto, una citazione, perché lo aggiungi..."
						className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
						rows={3}
					/>
				</div>

				{/* Actions */}
				<div className="flex gap-3 justify-end">
					<button
						onClick={onClose}
						className="px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
					>
						Annulla
					</button>
					<button
						onClick={() => onAdd(rating || undefined, comment || undefined)}
						className="px-5 py-2.5 rounded-xl bg-gray-900 text-white text-sm font-medium hover:bg-gray-700 transition-colors"
					>
						Aggiungi
					</button>
				</div>
			</div>
		</div>
	);
}
