"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Result } from "@/models/Books";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";

export interface CollectionItem {
	book: Result;
	rating?: number;
	comment?: string;
	addedAt: string;
}

interface CollectionContextType {
	collection: CollectionItem[];
	addBook: (book: Result, rating?: number, comment?: string) => Promise<void>;
	removeBook: (id: number) => Promise<void>;
	isInCollection: (id: number) => boolean;
}

const CollectionContext = createContext<CollectionContextType | null>(null);

export function CollectionProvider({ children }: { children: React.ReactNode }) {
	const { user } = useAuth();
	const [collection, setCollection] = useState<CollectionItem[]>([]);

	// Ogni volta che cambia l'utente (login/logout) ricarica la collezione
	useEffect(() => {
		if (!user) {
			setCollection([]);
			return;
		}

		supabase
			.from("collection")
			.select("*")
			.order("added_at", { ascending: false })
			.then(({ data }) => {
				if (data) {
					setCollection(
						data.map((row) => ({
							book: row.book_data as Result,
							rating: row.rating ?? undefined,
							comment: row.comment ?? undefined,
							addedAt: row.added_at,
						}))
					);
				}
			});
	}, [user]);

	const addBook = async (book: Result, rating?: number, comment?: string) => {
		if (!user) return;

		const { data, error } = await supabase
			.from("collection")
			.upsert(
				{
					user_id: user.id,
					book_id: book.id,
					book_data: book,
					rating: rating ?? null,
					comment: comment ?? null,
				},
				{ onConflict: "user_id,book_id" }
			)
			.select()
			.single();

		if (!error && data) {
			const item: CollectionItem = {
				book,
				rating,
				comment,
				addedAt: data.added_at,
			};
			setCollection((prev) => {
				const exists = prev.some((i) => i.book.id === book.id);
				return exists
					? prev.map((i) => (i.book.id === book.id ? item : i))
					: [item, ...prev];
			});
		}
	};

	const removeBook = async (id: number) => {
		if (!user) return;

		await supabase
			.from("collection")
			.delete()
			.eq("user_id", user.id)
			.eq("book_id", id);

		setCollection((prev) => prev.filter((i) => i.book.id !== id));
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
