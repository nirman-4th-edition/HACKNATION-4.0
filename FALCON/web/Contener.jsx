import React, { useState } from 'react';
import {app} from '../firebase'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import '../style/contener.css'; // Import the CSS file
import {motion} from 'framer-motion'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAuth } from "firebase/auth";
import NavBar from './Navbar';

const Contener = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const auth=getAuth(app);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const login=()=>{ toast("login successful")

        }
        const signup=()=>{ toast("signup successful")

        }

        try {
            if (isLogin) {
                await signInWithEmailAndPassword(auth, email, password);
                console.log("Login successful");
                login();

                <ToastContainer />;
                


                // Redirect or perform any action after successful login
            } else {
                await createUserWithEmailAndPassword(auth, email, password);
                console.log("Signup successful");
                signup();
                <ToastContainer />;
                // Redirect or perform any action after successful signup
            }
        } catch (err) {
            setError(err.message);
        }
    };

     return <>
        <NavBar></NavBar>
        < motion.div className="auth-container" 
         initial={{opacity:0,scale:0}}
         whileInView={{opacity:1,scale:1}}
         transition={{duration:2}}
        >
            <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
            </form>
            {error && <p>{error}</p>}
            <button className="toggle-button" onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
            </button>
        </motion.div>
        
        </>
    
};

export default Contener;