/* eslint-disable import/no-unresolved */
// Configuracion de Firebase

import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js';

import {
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  signInWithPopup,
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js';

import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  doc,
  setDoc,
  addDoc,
  updateDoc,
  query,
  orderBy,
  where,
  serverTimestamp,
  deleteDoc,
  onSnapshot,
} from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-firestore.js';

import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  // eslint-disable-next-line import/no-unresolved
} from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-storage.js';

// La configuración de Firebase de nuestra aplicación web
const firebaseConfig = {
  apiKey: 'AIzaSyC7izILxBAofkAgRFOXdbdsLCe7r9WWd1c',
  authDomain: 'care-pets.firebaseapp.com',
  projectId: 'care-pets',
  storageBucket: 'care-pets.appspot.com',
  messagingSenderId: '199291870338',
  appId: '1:199291870338:web:51b3e7c0b6fdc6d26ca89b',
};

// Inicializar Firebase
export const app = initializeApp(firebaseConfig);
// Inicializar authentication
export const auth = getAuth(app);
// inicializa el firestore
export const db = getFirestore(app);
// inicializa el storage
export const storage = getStorage(app);
//
const proveedor = new GoogleAuthProvider();
const proveedorFB = new FacebookAuthProvider();

export {
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  signInWithPopup,
  proveedor,
  proveedorFB,
  GoogleAuthProvider,
  getFirestore,
  collection,
  getDocs,
  getDoc,
  doc,
  setDoc,
  addDoc,
  updateDoc,
  query,
  orderBy,
  where,
  serverTimestamp,
  deleteDoc,
  onSnapshot,
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
};
