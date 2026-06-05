import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AuthGuard from "@/components/AuthGuard";
import { CollectionProvider } from "@/context/CollectionContext";

export default function MainLayout({ children }: { children: React.ReactNode }) {
	return (
		<AuthGuard>
			<CollectionProvider>
				<Header />
				<main className="flex-1">{children}</main>
				<Footer />
			</CollectionProvider>
		</AuthGuard>
	);
}
