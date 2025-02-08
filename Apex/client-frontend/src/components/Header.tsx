import type React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useAuth } from "./contexts/AuthContext";

const Header: React.FC = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const { currentUser, logout } = useAuth();
	const navigate = useNavigate();

	const handleLogout = async () => {
		try {
			await logout();
			navigate("/");
		} catch (error) {
			console.error("Failed to log out", error);
		}
	};

	const handleProtectedRoute = (path: string) => {
		if (currentUser) {
			navigate(path);
		} else {
			navigate("/login");
		}
	};

	return (
		<header className="bg-green-600 text-white shadow-lg">
			<div className="container mx-auto px-4 py-4">
				<div className="flex items-center justify-between">
					<div className="flex items-center space-x-2">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-8 w-8"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
							/>
						</svg>
						<h1 className="text-2xl font-bold">Bhumi</h1>
					</div>
					<div className="hidden md:flex items-center space-x-4">
						<NavLinks handleProtectedRoute={handleProtectedRoute} />
						<AuthButtons
							currentUser={currentUser}
							handleLogout={handleLogout}
						/>
					</div>
					<div className="md:hidden">
						<Button
							variant="ghost"
							size="icon"
							onClick={() => setIsMenuOpen(!isMenuOpen)}
						>
							<Menu className="h-6 w-6" />
						</Button>
					</div>
				</div>
				{isMenuOpen && (
					<div className="mt-4 md:hidden">
						<nav className="flex flex-col space-y-2">
							<NavLinks
								handleProtectedRoute={handleProtectedRoute}
							/>
							<AuthButtons
								currentUser={currentUser}
								handleLogout={handleLogout}
							/>
						</nav>
					</div>
				)}
			</div>
		</header>
	);
};

interface NavLinksProps {
	handleProtectedRoute: (path: string) => void;
}

const NavLinks: React.FC<NavLinksProps> = ({ handleProtectedRoute }) => (
	<>
		<Link to="/" className="hover:text-green-200 transition duration-300">
			Our Mission
		</Link>
		<button
			onClick={() => handleProtectedRoute("/disease")}
			className="hover:text-green-200 transition duration-300"
		>
			Crop Disease
		</button>
		<button
			onClick={() => handleProtectedRoute("/best-crop")}
			className="hover:text-green-200 transition duration-300"
		>
			Best Crop
		</button>
		<button
			onClick={() => handleProtectedRoute("/fertiliser-recommender")}
			className="hover:text-green-200 transition duration-300"
		>
			Fertiliser
		</button>
	</>
);

interface AuthButtonsProps {
	currentUser: any;
	handleLogout: () => void;
}

const AuthButtons: React.FC<AuthButtonsProps> = ({
	currentUser,
	handleLogout,
}) => (
	<div className="flex items-center space-x-4">
		{currentUser ? (
			<>
				<span className="text-sm">{currentUser.email}</span>
				<Button onClick={handleLogout} variant="secondary" size="sm">
					Logout
				</Button>
			</>
		) : (
			<>
				<Link to="/login">
					<Button variant="secondary" size="sm">
						Login
					</Button>
				</Link>
				<Link to="/signup">
					<Button variant="secondary" size="sm">
						Sign Up
					</Button>
				</Link>
			</>
		)}
	</div>
);

export default Header;
