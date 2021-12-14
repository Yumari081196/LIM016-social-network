import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
  addDoc,
  getDoc,
// eslint-disable-next-line import/no-unresolved
} from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-firestore.js';
import { app } from './config.js';

// inicializa el firestore
const db = getFirestore(app);
// referenciando la coleeción segun su nombre
/* const colRef = collection(db, 'usuarios');
// Obtener datos de la colección como array de objetos
getDocs(colRef)
  .then((snapshot) => {
    const usuarios = [];
    snapshot.docs.forEach((docs) => {
      usuarios.push({ ...docs.data(), id: docs.id });
    });
    // eslint-disable-next-line no-console
    console.log(usuarios);
  }); */

export const obtenerUsuario = async () => {
  const colRef = collection(db, 'usuarios');
  const querySnapshot = await getDocs(colRef);
  return querySnapshot;
};

export const obtenerUsuarioById = async (idUser) => {
  const colRef = doc(db, 'usuarios', idUser);
  const querySnapshot = await getDoc(colRef).then((key) => key.data());
  console.log(querySnapshot);
  return querySnapshot;
};

export const obtenerPosts = async () => {
  const postsHome = collection(db, 'home');
  const querySnapshot = await getDocs(postsHome);
  return querySnapshot;
};

export const obtenerPostsbyId = async (byId) => {
  const postsHome = doc(db, 'home', byId);
  const datos = await getDoc(postsHome).then((key) => key.data());
  console.log(datos);
  return datos;
};

// agregar usuario a Firestore
export const agregarUsuarioConId = async (usuarioRegistro, correoRegistro, id) => {
  const colRefId = doc(db, 'usuarios', id);
  await setDoc(colRefId, {
    username: usuarioRegistro,
    correo: correoRegistro,
  });
};
export const subirEstadoDeUser = async (id, post) => {
  const colRefPost = collection(db, 'home');
  const functionAdd = await addDoc(colRefPost, {
    usuarioId: id,
    publicacion: post,
  });
  return functionAdd;
};
