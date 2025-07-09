import React, { useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import {
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    getIdToken
} from "firebase/auth";
import { auth } from '../../Hooks/firebase.init';

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
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const updateUserProfile = profileInfo => {
        return updateProfile(auth.currentUser, profileInfo);
    };

    // Logout
    const logout = () => {
        setLoading(true);
        localStorage.removeItem('authToken'); // token clear on logout
        return signOut(auth);
    };

    // Observe Auth State
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                // Get JWT token from Firebase currentUser
                const token = await currentUser.getIdToken();
                // Save token in localStorage
                localStorage.setItem('authToken', token);
                console.log('Firebase JWT Token:', token);
            } else {
                localStorage.removeItem('authToken');
                console.log('No user logged in, token removed.');
            }
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
