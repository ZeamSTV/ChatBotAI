// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

export const getFirebaseApp = () => {
    const firebaseConfig = {
        apiKey: "AIzaSyDfSv4FJnspPaeKr9dX4YGHX_D-phVP9Rs",
        authDomain: "mychatboy-d5486.firebaseapp.com",
        projectId: "mychatboy-d5486",
        storageBucket: "mychatboy-d5486.appspot.com",
        messagingSenderId: "1057366628020",
        appId: "1:1057366628020:web:b17e2bb3ad64e91c5de9e1",
        measurementId: "G-424DKK7V3B"
    }

    // Initialize Firebase
    return initializeApp(firebaseConfig)
}
