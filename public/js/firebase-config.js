// Firebase Configuration
// This file is safe to commit - these are public web app credentials

const firebaseConfig = {
  apiKey: "AIzaSyBr8P2j_2sAI74vJq_S5ZtIIWg5pgW_O5A",
  authDomain: "cossa-marketing.firebaseapp.com",
  projectId: "cossa-marketing",
  storageBucket: "cossa-marketing.firebasestorage.app",
  messagingSenderId: "366791484994",
  appId: "1:366791484994:web:0def05f2c57ca29f6bafdb",
  measurementId: "G-EWW4BPZN6R"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
