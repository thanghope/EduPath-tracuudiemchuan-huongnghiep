// Firebase configuration for EduPath
// Import Firebase modules (loaded via CDN in HTML)

const firebaseConfig = {
    apiKey: "AIzaSyDNl53Vet3RQMZVJPOLSWMlD0eXp9Aj2qU",
    authDomain: "edupath-2f44b.firebaseapp.com",
    projectId: "edupath-2f44b",
    storageBucket: "edupath-2f44b.firebasestorage.app",
    messagingSenderId: "237358592223",
    appId: "1:237358592223:web:3e151189854de96fdf796a",
    measurementId: "G-DKFSBPK0TR"
};

// Initialize Firebase
let app, db;

function initFirebase() {
    if (typeof firebase !== 'undefined') {
        app = firebase.initializeApp(firebaseConfig);
        db = firebase.firestore();
        console.log('Firebase initialized successfully');
        return true;
    }
    console.error('Firebase SDK not loaded');
    return false;
}

// Export for use in other files
window.firebaseConfig = firebaseConfig;
window.initFirebase = initFirebase;
window.getFirestore = () => db;
