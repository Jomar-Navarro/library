"use client";
import { Search as SearchIcon } from "lucide-react";

interface Props {
	query: string;
	onChange: (value: string) => void;
}

export default function SearchBar({ query, onChange }: Props) {
	return (
		<div className="relative max-w-2xl mx-auto">
			<SearchIcon
				size={18}
				className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
			/>
			<input
				value={query}
				placeholder='Search "Frankenstein", "Austen", "adventure"...'
				type="text"
				className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-full text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 bg-white"
				onChange={(e) => onChange(e.target.value)}
			/>
		</div>
	);
}
