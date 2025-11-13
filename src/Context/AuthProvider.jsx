import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { app } from '../Firebase/firebase.init';
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);

    const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const LogIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const LogOut = () => {
    return signOut(auth);
  };

   const loginWithGoogle = () => {
        return signInWithPopup(auth, googleProvider);
    };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  const authData = {
    user,
    setUser,
    createUser,
    LogIn,
    LogOut,
    loginWithGoogle,
  };
    return (
    <AuthContext.Provider value={authData}>
      {children}
    </AuthContext.Provider>
    );
};

export default AuthProvider;