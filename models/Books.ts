export interface Books {
	count: number;
	next: string | null;
	previous: string | null;
	results: Result[];
}

export interface Result {
	id: number;
	title: string;
	alternative_title: null | string;
	authors: Author[];
	subjects: string[];
	bookshelves: string[];
	formats: Formats;
	download_count: number;
	issued: Date;
	summary: null | string;
	reading_ease_score: null | string;
	cover_image: string;
	removed_from_catalog: null;
}

export interface Author {
	id: number;
	name: string;
}

export interface Formats {
	"text/plain": string;
	"text/html; charset=utf-8": string;
	"text/html": string;
	"application/epub+zip": string;
	"application/x-mobipocket-ebook": string;
	"text/plain; charset=utf-8": string;
	"text/plain; charset=us-ascii": string;
	"application/rdf+xml": string;
	"image/jpeg": string;
	"application/octet-stream"?: string;
	"application/zip"?: string;
	"audio/ogg"?: string;
	"audio/mp4"?: string;
	"audio/mpeg"?: string;
}
