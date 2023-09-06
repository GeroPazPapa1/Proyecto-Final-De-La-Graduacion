import {
    GoogleAuthProvider,
    signInWithPopup,
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { auth } from "./firebase.js";
import axios from "axios";

export default async function handleGoogleSignin() {
    const provider = new GoogleAuthProvider();
    try {
        const credentials = await signInWithPopup(auth, provider);
        const token = credentials._tokenResponse;
        const headers = {
            Authorization: `Bearer ${token}`,
        };
        console.log(credentials);
        console.log("google sign in");
        axios
            .get("http://localhost:3001/user/google", { headers })
            .then((response) => {
                // Manejo de la respuesta del backend
                console.log("Respuesta del backend:", response.data);
            });
        window.location.href = '/home'
        console.log(newUser);
    } catch (error) {
        console.log(error);
    }
};