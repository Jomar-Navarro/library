"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const PUBLIC_PATHS = ["/login"];

export default function AuthGuard({ children }: { children: React.ReactNode }) {
	const { user, loading } = useAuth();
	const router = useRouter();
	const pathname = usePathname();

	useEffect(() => {
		if (!loading && !user && !PUBLIC_PATHS.includes(pathname)) {
			router.push("/login");
		}
	}, [user, loading, pathname, router]);

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="w-6 h-6 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
			</div>
		);
	}

	if (!user && !PUBLIC_PATHS.includes(pathname)) return null;

	return <>{children}</>;
}
