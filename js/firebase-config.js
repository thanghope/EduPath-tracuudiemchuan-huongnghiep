// Firebase configuration for EduPath
// Import Firebase modules (loaded via CDN in HTML)

const firebaseConfig = {
    apiKey: "AizaSyB-PO1q-ySiI5-TttJ3cmOc4rPhnjPtsM4",
    authDomain: "edupath-327c3.firebaseapp.com",
    projectId: "edupath-327c3",
    storageBucket: "edupath-327c3.firebasestorage.app",
    messagingSenderId: "824523263230",
    appId: "1:824523263230:web:c4d7bc4f11e6a24e21e9af",
    measurementId: "G-DEL1MF35ES"
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
