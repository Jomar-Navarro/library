"use client";

import { LibraryBig, Search, LogOut, User } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useCollection } from "@/context/CollectionContext";

export default function NavLinks() {
	const pathname = usePathname();
	const router = useRouter();
	const { user, signOut } = useAuth();
	const { collection } = useCollection();

	const active = "flex items-center gap-1 px-2 py-1 rounded bg-[#eef1f8] font-semibold";
	const inactive = "flex items-center gap-1 px-2 py-1 rounded hover:bg-[#eef1f8] transition-colors";

	const handleSignOut = async () => {
		await signOut();
		router.push("/");
	};

	return (
		<div className="ml-auto flex items-center space-x-2">
			<Link href="/" className={pathname === "/" ? active : inactive}>
				<Search size={18} /> Catalogue
			</Link>
			<Link href="/collection" className={pathname === "/collection" ? active : inactive}>
				<LibraryBig size={18} />
				Collection
				{collection.length > 0 && (
					<span className="ml-0.5 text-xs bg-gray-900 text-white rounded-full w-4 h-4 flex items-center justify-center">
						{collection.length}
					</span>
				)}
			</Link>

			{user ? (
				<div className="flex items-center gap-2 pl-2 border-l border-gray-200">
					<div className="w-7 h-7 rounded-full bg-gray-900 flex items-center justify-center">
						<span className="text-white text-xs font-semibold">
							{user.email?.[0]?.toUpperCase() ?? "G"}
						</span>
					</div>
					<button
						onClick={handleSignOut}
						className="flex items-center gap-1 px-2 py-1 rounded hover:bg-[#eef1f8] transition-colors text-gray-500"
					>
						<LogOut size={16} />
					</button>
				</div>
			) : (
				<Link href="/login" className={pathname === "/login" ? active : inactive}>
					<User size={18} /> Accedi
				</Link>
			)}
		</div>
	);
}
