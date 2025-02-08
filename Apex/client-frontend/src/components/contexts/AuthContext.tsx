import { createContext, useContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
	GoogleAuthProvider,
	signInWithPopup,
    User,
} from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyDq0SEYFyLZ4XKtjfvsRb2lhMl5ursY2Ec",
	authDomain: "nirman-tech-51f68.firebaseapp.com",
	projectId: "nirman-tech-51f68",
	storageBucket: "nirman-tech-51f68.firebasestorage.app",
	messagingSenderId: "936034563723",
	appId: "1:936034563723:web:bfd5cabfb030554da1068e",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
	return useContext(AuthContext);
}

import { ReactNode } from "react";

interface AuthProviderProps {
	children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {

	const [currentUser, setCurrentUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	function signup(email: string, password: string) {
        return createUserWithEmailAndPassword(auth, email, password);
    }

	function login(email: string, password: string) {
		return signInWithEmailAndPassword(auth, email, password);
	}

	function logout() {
		return signOut(auth);
	}

	function signInWithGoogle() {
		const provider = new GoogleAuthProvider();
		return signInWithPopup(auth, provider);
	}

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setCurrentUser(user);
			setLoading(false);
		});

		return unsubscribe;
	}, []);

	const value = {
		currentUser,
		signup,
		login,
		logout,
		signInWithGoogle,
	};

	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	);
}
