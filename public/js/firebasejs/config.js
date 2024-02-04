import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getStorage, ref, uploadBytes } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-storage.js';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDaaU_spqn2myGLuTN6yH_bl0lndCj-jjg",
  authDomain: "zorrorojos.firebaseapp.com",
  projectId: "zorrorojos",
  storageBucket: "zorrorojos.appspot.com",
  messagingSenderId: "566643381330",
  appId: "1:566643381330:web:3330b8fb779da19eb43b8b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Upload funtion
export const storage = getStorage(app);

export const uploadFile = (file) => {
    const storageRef = ref(storage, 'some-file');
    uploadBytes(storageRef, file)
    .then(response => {
        console.log(response)
    });
}

