"use client";

import { LibraryBig, Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLinks() {
	const pathname = usePathname();
	const active = "flex items-center gap-1 px-2 py-1 rounded bg-[#eef1f8] font-semibold";
	const inactive = "flex items-center gap-1 px-2 py-1 rounded hover:bg-[#eef1f8] transition-colors";

	return (
		<div className="ml-auto flex items-center space-x-4">
			<Link href="/" className={pathname === "/" ? active : inactive}>
				<Search size={20} /> Catalogue
			</Link>
			<Link href="/Collection" className={pathname === "/Collection" ? active : inactive}>
				<LibraryBig size={20} /> Collection
			</Link>
			<div>User</div>
		</div>
	);
}
