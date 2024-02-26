import { db } from "../firebase/config";

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signOut } from 'firebase/auth';

import { useState, useEffect } from 'react';

export const useAuthentication = () => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)

    // cleanup
    // deal with memory leak
    const [canceled, setCanceled] = useState(false)

    const auth = getAuth();

    function checkIfIsCanceled() {
        if (canceled) {
            return;
        }
    }

    // Register
    const createUser = async (data) => {
        checkIfIsCanceled();
        setError(null)
        setLoading(true);

        try {
            const { user } = await createUserWithEmailAndPassword(auth, data.email, data.password);
            await updateProfile(user, { displayName: data.displayName });
            setLoading(false);
            return user;
        } catch (error) {
            console.log(error.message)
            console.log(typeof error.message)

            let systemErrorMessage;

            if (error.message.includes("Password")) {
                systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres."
            } else if (error.message.includes("email-already")) {
                systemErrorMessage = "E-mail já cadastrado."
            } else {
                systemErrorMessage = "Ocorreu um erro, por favor tente novamente mais tarde."
            }
            setLoading(false);
            setError(systemErrorMessage);
        }
    }

    // Logout
    const logout = () => {
        checkIfIsCanceled();
        signOut(auth)
    };

    // Login
    const login = async (data) => {
        checkIfIsCanceled();
        setLoading(true);
        setError(false);

        try {
            await signInWithEmailAndPassword(auth, data.email, data.password)
            setLoading(false)
        } catch (error) {
            let systemErrorMessage;

            if (error.message.includes("INVALID_LOGIN_CREDENTIALS")) {
                systemErrorMessage = "Usuário não encontrado.";
            } else if (error.message.includes("wrong-password")) {
                systemErrorMessage = "Senha incorreta.";
            } else {
                systemErrorMessage = "Ocorreu um erro, por favor tente novamente mais tarde.";
            }
            setLoading(false);
            setError(systemErrorMessage);
        }
    }

    useEffect(() => {
        return () => setCanceled(true)
    }, [])

    return { auth, createUser, error, loading, logout, login };
}