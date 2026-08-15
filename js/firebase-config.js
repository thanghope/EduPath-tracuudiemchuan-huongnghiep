// Cấu hình Firebase của bạn
const firebaseConfig = {
    apiKey: "AizaSyB-PO1q-ySiI5-TttJ3cmOc4rPhnjPtsM4",
    authDomain: "edupath-327c3.firebaseapp.com",
    projectId: "edupath-327c3",
    storageBucket: "edupath-327c3.firebasestorage.app",
    messagingSenderId: "824523263230",
    appId: "1:824523263230:web:c4d7bc4f11e6a24e21e9af",
    measurementId: "G-DEL1MF35ES"
};

// Khởi tạo Firebase trực tiếp
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();