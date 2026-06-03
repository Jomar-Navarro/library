export interface CollectionItem {
	id: string;
	book_id: number;
	title: string;
	author: string;
	cover_url?: string;
	comment?: string;
	rating?: number;
}
