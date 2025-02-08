import React, { useState } from 'react';
import SignUp from './components/auth/signup';
import SignIn from './components/auth/signin';

const AuthPage = () => {
  const [isSignup, setIsSignup] = useState(true);

  return (
    <div className="h-full w-full">
      {isSignup ? <SignUp/> : <SignIn/>}
      {/* <button onClick={() => setIsSignup(!isSignup)}>
        {isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
      </button> */}
    </div>
  );
};

export default AuthPage;
