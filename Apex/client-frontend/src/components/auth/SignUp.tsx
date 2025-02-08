import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useAuth } from "../contexts/AuthContext";

const SignUp = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const { signup, signInWithGoogle } = useAuth();
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			return setError("Passwords do not match");
		}

		try {
			setError("");
			setIsLoading(true);
			await signup(email, password);
			navigate("/");
		} catch (error) {
			setError("Failed to create an account");
		} finally {
			setIsLoading(false);
		}
	};

	const handleGoogleSignIn = async () => {
		try {
			setError("");
			setIsLoading(true);
			await signInWithGoogle();
			navigate("/");
		} catch (error) {
			setError("Failed to sign in with Google");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="flex min-h-[80vh] items-center justify-center px-4">
			<Card className="w-full max-w-md">
				<CardHeader className="space-y-1">
					<CardTitle className="text-2xl font-bold tracking-tight">
						Create an account
					</CardTitle>
					<CardDescription>
						Enter your details to get started
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					{error && (
						<div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
							{error}
						</div>
					)}
					<form onSubmit={handleSubmit} className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								type="email"
								placeholder="name@example.com"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
								className="w-full"
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="password">Password</Label>
							<Input
								id="password"
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
								className="w-full"
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="confirm-password">
								Confirm Password
							</Label>
							<Input
								id="confirm-password"
								type="password"
								value={confirmPassword}
								onChange={(e) =>
									setConfirmPassword(e.target.value)
								}
								required
								className="w-full"
							/>
						</div>
						<Button
							type="submit"
							className="w-full bg-green-600 hover:bg-green-700"
							disabled={isLoading}
						>
							{isLoading
								? "Creating account..."
								: "Create account"}
						</Button>
					</form>
					<div className="relative">
						<div className="absolute inset-0 flex items-center">
							<span className="w-full border-t" />
						</div>
						<div className="relative flex justify-center text-xs uppercase">
							<span className="bg-white px-2 text-muted-foreground">
								Or continue with
							</span>
						</div>
					</div>
					<Button
						type="button"
						variant="outline"
						className="w-full"
						onClick={handleGoogleSignIn}
						disabled={isLoading}
					>
						<FcGoogle className="mr-2 h-5 w-5" />
						Sign up with Google
					</Button>
				</CardContent>
				<CardFooter>
					<p className="text-sm text-muted-foreground text-center w-full">
						Already have an account?{" "}
						<Link
							to="/login"
							className="text-green-600 hover:text-green-700 font-medium"
						>
							Sign in
						</Link>
					</p>
				</CardFooter>
			</Card>
		</div>
	);
};

export default SignUp;
