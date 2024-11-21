import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBJGxsgRDyLu9L0Ea3-MvkOK_sQ5pv8AVA",
  authDomain: "social-media-app-952de.firebaseapp.com",
  projectId: "social-media-app-952de",
  storageBucket: "social-media-app-952de.firebasestorage.app",
  messagingSenderId: "813268098629",
  appId: "1:813268098629:web:bc6276a53627b3bd724d2c"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);