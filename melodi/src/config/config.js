//congif firebase từ FE
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAN56nLE8k1fkt9q22FM7gzk3ke0ilOol4",
  authDomain: "webmusic-8b74a.firebaseapp.com",
  projectId: "webmusic-8b74a",
  storageBucket: "webmusic-8b74a.firebasestorage.app",
  messagingSenderId: "313459935332",
  appId: "1:313459935332:web:7cdd7943eca35b99967771",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
