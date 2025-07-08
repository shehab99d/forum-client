import React, { useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import {
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile
}
    from "firebase/auth";
// import app from '../firebase/firebase.config'; // path ঠিকমতো adjust করো
import { auth } from '../../Hooks/firebase.init';

// const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Google Sign In
    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    };

    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    };
    const updateUserProfile = profileInfo => {
        return updateProfile(auth.currentUser, profileInfo)
    }

    // Logout
    const logout = () => {
        setLoading(true);
        return signOut(auth);
    };

    // Observe Auth State
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            console.log(currentUser);

            setLoading(false);
        });

        return () => unsubscribe(); // cleanup
    }, []);

    const authInfo = {
        user,
        loading,
        logout,
        createUser,
        signInUser,
        googleSignIn,
        updateUserProfile,
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
