import Link from "next/link";
import { Columns3, Search } from "lucide-react";

export default function CollectionPage() {
	return (
		<div className="min-h-[calc(100vh-114px)] flex flex-col">
			{/* Empty state */}
			<div className="flex-1 flex flex-col items-center justify-center px-4 text-center">
				<div className="w-20 h-20 rounded-2xl bg-gray-100 flex items-center justify-center mb-6">
					<Columns3 size={32} className="text-gray-400" />
				</div>
				<h2 className="text-2xl font-semibold text-gray-900 mb-3">
					La tua collezione è vuota
				</h2>
				<p className="text-gray-500 max-w-sm mb-8">
					Cerca nel catalogo e aggiungi i libri che vuoi leggere o che hai
					amato. Voti e commenti restano salvati qui.
				</p>
				<Link
					href="/"
					className="flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors"
				>
					<Search size={16} />
					Esplora il catalogo
				</Link>
			</div>
		</div>
	);
}
