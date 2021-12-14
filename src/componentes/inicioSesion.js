// eslint-disable-next-line import/no-unresolved
import { GoogleAuthProvider, FacebookAuthProvider } from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js';
import {
  inicioSesionUsuario,
  googleInicioSesion,
  facebookInicioSesion,
  cierreActividadUsuario,
} from '../firebase/funcionesAuth.js';
import { modalInicioSesion } from './errores.js';
import { mostrarYocultarClave } from './home.js';

// Creacion de formulario de inicio de Sesión de forma dinámica
export const formInicioSesion = () => {
  const formIngreso = `
        <div id="inicio" class="cajaInterna2">
            <form id="formIngreso">
                <div class="seccionIngreso">
                    <input type="text" id="correoIngreso" class="datosIngreso" placeholder="Correo electrónico" required>
                    <i class="ph-envelope"></i>
                </div>

                <div class="seccionIngreso">
                    <input type="password" id="claveIngreso" class="datosIngreso" placeholder="Contraseña" required>
                    <i id="botonContraseña" class="ph-eye-closed"></i>
                </div>

                <button type="submit" id="botonIngresar" class="iniciarSesion">Ingresar</button>

                <p class="texto">O bien ingresa con</p>

                <div class="logosInicio">
                    <img id="imgFacebook" src="imagenes/FacebookOriginal.png">
                    <img id="imgGoogle" src="imagenes/GoogleOriginal.png">
                </div>

                <p class="texto">¿No tienes una cuenta? <a id="registrate" href="#/registro"> Regístrate</a></p> 
            </form>
        </div>`;
  return formIngreso;
};

// Función que se encarga del inicio de Sesión por correo
export const inicioSesion = (selectorForm, containerError) => {
  mostrarYocultarClave('botonContraseña', 'claveIngreso');
  cierreActividadUsuario();
  const iniciarCon = document.getElementById(selectorForm);
  iniciarCon.addEventListener('submit', (e) => {
    e.preventDefault();
    const correoIngreso = document.getElementById('correoIngreso').value;
    const claveIngreso = document.getElementById('claveIngreso').value;
    const ubicacionModal = document.getElementById(containerError);

    inicioSesionUsuario(correoIngreso, claveIngreso)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user.emailVerified === true) {
          sessionStorage.setItem('usuarioId', user.uid);
          window.location.hash = '#/artmuro';
        } else {
          ubicacionModal.innerHTML = modalInicioSesion.confirmar();
          setTimeout(() => {
            const modalConfirmar = document.getElementById('modalConfirmar');
            modalConfirmar.style.display = 'none';
          }, 5000);
        }
      })
      .catch((error) => {
        if (error.message === 'Firebase: Error (auth/invalid-email).' || error.message === 'Firebase: Error (auth/wrong-password).') {
          ubicacionModal.innerHTML = modalInicioSesion.datosInvalidos();
          setTimeout(() => {
            const modalDatosInvalidos = document.getElementById('modalDatosInvalidos');
            modalDatosInvalidos.style.display = 'none';
          }, 5000);
        } else if (error.message === 'Firebase: Error (auth/user-not-found).') {
          ubicacionModal.innerHTML = modalInicioSesion.usuarioInvalido();
          setTimeout(() => {
            const modalUsuarioInvalido = document.getElementById('modalUsuarioInvalido');
            modalUsuarioInvalido.style.display = 'none';
          }, 5000);
        } else {
          ubicacionModal.textContent = 'Ocurrió un error';
        }
      });
  });

  const botongoogle = document.getElementById('imgGoogle');
  botongoogle.addEventListener('click', () => {
    const proveedor = new GoogleAuthProvider();
    googleInicioSesion(proveedor)
      // eslint-disable-next-line no-unused-vars
      .then((result) => {
        // console.log(result);
        window.location.hash = '#/artmuro';
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        const user = result.user;
        // eslint-disable-next-line no-console
        console.log(user);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        // eslint-disable-next-line no-console
        console.log(errorCode);
        const errorMessage = error.message;
        // eslint-disable-next-line no-console
        console.log((errorMessage));
        // The email of the user's account used.
        const email = error.email;
        // eslint-disable-next-line no-console
        console.log(email);
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // eslint-disable-next-line no-console
        console.log(credential);
      });
  });

  const botonFacebook = document.getElementById('imgFacebook');
  botonFacebook.addEventListener('click', () => {
    const proveedor = new FacebookAuthProvider();
    facebookInicioSesion(proveedor)
      // eslint-disable-next-line no-unused-vars
      .then((result) => {
        // eslint-disable-next-line no-console
        console.log(result);
        window.location.hash = '#/artmuro';
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        // const credential = FacebookAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        const user = result.user;
        // eslint-disable-next-line no-console
        console.log(user);
      });
  });
};
