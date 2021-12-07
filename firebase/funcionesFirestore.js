import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  doc,
  setDoc
// eslint-disable-next-line import/no-unresolved
} from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-firestore.js';
import { app } from './config.js';

// inicializa el firestore
const db = getFirestore(app);
// referenciando la coleeción segun su nombre
const colRef = collection(db, 'usuarios');
// Obtener datos de la colección como array de objetos
getDocs(colRef)
  .then((snapshot) => {
    const usuarios = [];
    snapshot.docs.forEach((doc) => {
      usuarios.push({ ...doc.data(), id: doc.id });
    });
    console.log(usuarios);
  });
// agregar usuario a Firestore

export const agregarUsuario = async (nuevoUsuario, nuevoCorreo, nuevaContraseña) => {
  const docRef = await addDoc(colRef, {
    username: nuevoUsuario,
    correo: nuevoCorreo,
    clave: nuevaContraseña,
  }).then(() => {
    alert ('agregado exito')
  }).catch((error)=>{
    console.log('ups salio algo mal');
  })
};

export const agregarUsuarioConId = async (nuevoUsuario, nuevoCorreo, nuevaContraseña, id) => {
  const colRefId= doc(db, 'usuarios',id)
  const docRef = await setDoc(colRefId, {
    username: nuevoUsuario,
    correo: nuevoCorreo,
    clave: nuevaContraseña,
  }).then(() => {
    alert ('agregado exito')
  }).catch((error)=>{
    console.log('ups salio algo mal');
  })
};