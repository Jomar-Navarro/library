"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

const COVER_COLORS = ["#2f3a4f", "#3a4a4a", "#45445e"];
const PREVIEW_BOOKS = ["Frankenstein", "Pride and\nPrejudice", "Dracula"];

export default function LoginPage() {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [mode, setMode] = useState<"login" | "signup">("login");
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError(null);
		setLoading(true);

		const { error } =
			mode === "login"
				? await supabase.auth.signInWithPassword({ email, password })
				: await supabase.auth.signUp({ email, password });

		setLoading(false);
		if (error) setError(error.message);
		else router.push("/");
	};

	const handleGuest = async () => {
		setLoading(true);
		await supabase.auth.signInAnonymously();
		setLoading(false);
		router.push("/");
	};

	return (
		<div className="min-h-screen flex">
			{/* ── LEFT PANEL ── */}
			<div className="hidden lg:flex lg:w-1/2 bg-[#1a1f2e] flex-col p-10 relative overflow-hidden">
				{/* Logo */}
				<div className="flex items-center gap-3">
					<div className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center">
						<span className="text-white font-bold text-sm">L</span>
					</div>
					<span className="text-white font-semibold">Libreria</span>
				</div>

				{/* Quote */}
				<div className="flex-1 flex flex-col justify-center max-w-sm">
					<span className="text-white/30 text-4xl mb-4">"</span>
					<p className="text-white text-2xl font-serif leading-relaxed">
						Una stanza senza libri è come un corpo senz&apos;anima.
					</p>
					<p className="text-white/40 text-sm mt-6">— Marco Tullio Cicerone</p>
				</div>

				{/* Preview books */}
				<div className="flex gap-3">
					{PREVIEW_BOOKS.map((title, i) => (
						<div
							key={i}
							className="w-20 h-28 rounded-lg flex items-end p-2"
							style={{ backgroundColor: COVER_COLORS[i] }}
						>
							<p className="text-white/70 text-[9px] leading-tight">{title}</p>
						</div>
					))}
				</div>
			</div>

			{/* ── RIGHT PANEL ── */}
			<div className="w-full lg:w-1/2 flex items-center justify-center px-8 py-12">
				<div className="w-full max-w-sm">
					{/* Tabs */}
					<div className="flex rounded-xl border border-gray-200 p-1 mb-8">
						<button
							onClick={() => {
								setMode("login");
								setError(null);
							}}
							className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${mode === "login" ? "bg-gray-900 text-white" : "text-gray-500 hover:text-gray-900"}`}
						>
							Accedi
						</button>
						<button
							onClick={() => {
								setMode("signup");
								setError(null);
							}}
							className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${mode === "signup" ? "bg-gray-900 text-white" : "text-gray-500 hover:text-gray-900"}`}
						>
							Registrati
						</button>
					</div>

					<h1 className="text-2xl font-semibold text-gray-900 mb-1">
						{mode === "login" ? "Bentornato." : "Crea account."}
					</h1>
					<p className="text-sm text-gray-400 mb-8">
						{mode === "login"
							? "Accedi per ritrovare la tua collezione."
							: "Inizia a costruire la tua libreria personale."}
					</p>

					<form onSubmit={handleSubmit} className="flex flex-col gap-4">
						<div>
							<label className="text-sm font-medium text-gray-700 block mb-1.5">
								Email
							</label>
							<input
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
								placeholder="tu@email.com"
								className="w-full border text-black border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
							/>
						</div>
						<div>
							<label className="text-sm font-medium text-gray-700 block mb-1.5">
								Password
							</label>
							<input
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
								placeholder="••••••••"
								className="w-full border text-black border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
							/>
						</div>

						{error && <p className="text-sm text-red-500">{error}</p>}

						<button
							type="submit"
							disabled={loading}
							className="bg-gray-900 text-white py-3 rounded-xl font-medium hover:bg-gray-700 transition-colors disabled:opacity-50"
						>
							{loading ? "..." : mode === "login" ? "Accedi" : "Registrati"}
						</button>
					</form>

					<div className="flex items-center gap-3 my-5">
						<div className="flex-1 h-px bg-gray-100" />
						<span className="text-xs text-gray-400">oppure</span>
						<div className="flex-1 h-px bg-gray-100" />
					</div>

					<button
						onClick={handleGuest}
						disabled={loading}
						className="w-full border border-gray-200 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
					>
						Continua come ospite
					</button>

					{mode === "login" && (
						<p className="text-sm text-gray-400 text-center mt-6">
							Non hai un account?{" "}
							<button
								onClick={() => setMode("signup")}
								className="text-gray-900 font-semibold hover:underline"
							>
								Registrati
							</button>
						</p>
					)}
				</div>
			</div>
		</div>
	);
}
