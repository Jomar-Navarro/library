import { Result } from "@/models/Books";

const COVER_COLORS = ["#2f3a4f", "#3a4a4a", "#45445e", "#586374", "#262a33"];

function getCoverColor(id: number) {
	return COVER_COLORS[id % COVER_COLORS.length];
}

export default function BookCard({
	book,
	hideMeta,
}: {
	book: Result;
	hideMeta?: boolean;
}) {
	const genre =
		book.bookshelves?.[0]?.replace("Category: ", "") ||
		book.subjects?.[0]?.split("--")[0].trim() ||
		null;
	const author = book.authors?.[0]?.name || null;

	return (
		<div className="flex flex-col gap-3 cursor-pointer">
			<div className="flex aspect-2/3 drop-shadow-[4px_4px_10px_rgba(0,0,0,0.35)]">
				<div
					className="w-3 shrink-0 rounded-l-sm border-r border-white/20 border-dashed"
					style={{
						backgroundColor: getCoverColor(book.id),
					}}
				/>
				<div
					className="relative flex-1 rounded-r-xl overflow-hidden"
					style={{ backgroundColor: getCoverColor(book.id) }}
				>
					<div className="absolute inset-0 p-4 flex flex-col">
						<div>
							<p className="text-white/40 text-[9px] uppercase tracking-widest font-medium">
								Project Library App
							</p>
							<div className="border-b border-white/20 mt-2 mb-3" />
							<h3 className="text-white/90 text-sm font-medium leading-snug line-clamp-4">
								{book.title}
							</h3>
						</div>

						<div className="mt-auto flex items-end justify-between gap-2">
							{author && (
								<p className="text-white/40 text-sm leading-tight truncate">
									{author}
								</p>
							)}
						</div>
					</div>
				</div>
			</div>

			{!hideMeta && (
				<div>
					<h3 className="text-sm font-semibold text-gray-900 leading-snug line-clamp-2">
						{book.title}
					</h3>
					{author && (
						<p className="text-xs text-gray-500 mt-0.5 truncate">{author}</p>
					)}
					{genre && (
						<p className="text-xs text-gray-400 mt-1 truncate">{genre}</p>
					)}
				</div>
			)}
		</div>
	);
}
