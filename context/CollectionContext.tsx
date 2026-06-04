"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Result } from "@/models/Books";

export interface CollectionItem {
	book: Result;
	rating?: number;
	comment?: string;
	addedAt: string;
}

interface CollectionContextType {
	collection: CollectionItem[];
	addBook: (book: Result, rating?: number, comment?: string) => void;
	removeBook: (id: number) => void;
	isInCollection: (id: number) => boolean;
}

const CollectionContext = createContext<CollectionContextType | null>(null);

export function CollectionProvider({ children }: { children: React.ReactNode }) {
	const [collection, setCollection] = useState<CollectionItem[]>([]);

	useEffect(() => {
		const saved = localStorage.getItem("collection");
		if (!saved) return;
		try {
			const parsed = JSON.parse(saved);
			// Se il primo elemento non ha .book è il vecchio formato — lo resettiamo
			if (parsed.length > 0 && !parsed[0].book) {
				localStorage.removeItem("collection");
			} else {
				setCollection(parsed);
			}
		} catch {
			localStorage.removeItem("collection");
		}
	}, []);

	const addBook = (book: Result, rating?: number, comment?: string) => {
		const item: CollectionItem = { book, rating, comment, addedAt: new Date().toISOString() };
		const exists = collection.some((i) => i.book.id === book.id);
		const updated = exists
			? collection.map((i) => (i.book.id === book.id ? item : i))
			: [...collection, item];
		setCollection(updated);
		localStorage.setItem("collection", JSON.stringify(updated));
	};

	const removeBook = (id: number) => {
		const updated = collection.filter((i) => i.book.id !== id);
		setCollection(updated);
		localStorage.setItem("collection", JSON.stringify(updated));
	};

	const isInCollection = (id: number) => collection.some((i) => i.book.id === id);

	return (
		<CollectionContext.Provider value={{ collection, addBook, removeBook, isInCollection }}>
			{children}
		</CollectionContext.Provider>
	);
}

export function useCollection() {
	const ctx = useContext(CollectionContext);
	if (!ctx) throw new Error("useCollection must be used inside CollectionProvider");
	return ctx;
}
