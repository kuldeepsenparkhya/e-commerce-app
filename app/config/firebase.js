const firebase = require("firebase-admin/app");
const admin = require("firebase-admin");
const auth = require("firebase-admin/auth");

const serviceKey = require("../config/serviceKey.json");
;


const firebaseConfig = {
  apiKey: "AIzaSyDGr0BICmyQC0kin957Lt4zZXdtBHQy6i8",
  authDomain: "collegefaqs-ed824.firebaseapp.com",
  projectId: "collegefaqs-ed824",
  storageBucket: "collegefaqs-ed824.appspot.com",
  messagingSenderId: "298273531248",
  appId: "1:298273531248:web:7b293be48d4ce2ecbb9bb5",
  credential: admin.credential.cert(serviceKey),
};

const app = firebase.initializeApp(firebaseConfig);
const db = auth.getAuth(app);


module.exports = { db };
