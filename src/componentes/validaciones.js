import { estadoAuthUsuario } from '../firebase/funcionesAuth.js';

// Funcion que permite al usuario ingresar solo si esta logueado
export const userState = () => {
  estadoAuthUsuario((user) => {
    if (user === null || user === undefined) {
      window.location.hash = '#/inicio';
    }
  });
};

// Funcion para llamar al sessionStorage
export const validateSessionStorage = () => {
  let userData;
  const data = sessionStorage.getItem('userSession');
  // console.log(userData);
  if (!data) {
    userData = {
      username: '',
      name: '',
      corre: '',
      descripcion: '',
      ubicacion: '',
    };
  } else {
    userData = JSON.parse(sessionStorage.userSession);
  }
  return userData;
};

// Funcionalidad de menu puntos verticales
export const menuPuntosVerticales = () => {
  const puntosVerticales = document.querySelectorAll('.puntosVerticales');
  puntosVerticales.forEach((pV) => {
    pV.addEventListener('click', () => {
      const middle = pV.getElementsByClassName('middle');
      const equis = pV.getElementsByClassName('equis');
      const desplegable = pV.getElementsByClassName('desplegable');
      console.log(pV);
      console.log(middle);
      console.log('HOLA');
      middle[0].classList.toggle('active');
      equis[0].classList.toggle('active');
      desplegable[0].classList.toggle('active');
    });
  });
};

/* export const borrarCache = (section) => {
  section.in
} */
