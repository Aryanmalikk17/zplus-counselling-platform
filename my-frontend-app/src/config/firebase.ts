import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyCZBtSLiyKbmbkDaADe2eztX__KsnNaaE0",
    authDomain: "zplusecounselling.firebaseapp.com",
    projectId: "zplusecounselling",
    storageBucket: "zplusecounselling.firebasestorage.app",
    messagingSenderId: "1017984101509",
    appId: "1:1017984101509:web:2b05ce04993f4e5c284dec",
    measurementId: "G-V5G4CSLZM6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const analytics = getAnalytics(app);

export default app;
