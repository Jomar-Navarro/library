import { Dot, LibraryBig } from "lucide-react";

export default function Header() {
	return (
		<header className="w-full h-16 bg-[#f5f7f8] text-black flex items-center justify-center border-b border-gray-300">
			<div className="container mx-auto px-4">
				<div className="flex items-center">
					<h1 className="text-xl font-bold">Digital</h1>
					<Dot className="text-gray-500 font-bold" size={16} />
					<p className="text-gray-500 font-semibold">Library</p>

					<div className="ml-auto flex items-center space-x-4">
						<div className="flex items-center cursor-pointer">
							<LibraryBig size={20} className="mr-1" />
							<p>Collection</p>
						</div>
						<div>User</div>
					</div>
				</div>
			</div>
		</header>
	);
}
