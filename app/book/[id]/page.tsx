export default function BookPage({ params }: { params: { id: string } }) {
	return <div>Book ID: {params.id}</div>;
}
