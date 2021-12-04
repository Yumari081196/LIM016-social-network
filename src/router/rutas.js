import { componentes } from '../lib/index.js';
import { formRegistro, registroCorreo } from '../componentes/registro.js';
import { formInicioSesion, inicioSesion } from '../componentes/inicioSesion.js';
import { divMuro } from '../componentes/muro.js';

export const vistasPantalla = () => {
  const main = document.getElementById('main');
  main.innerHTML = '';
  switch (window.location.hash.toLowerCase()) {
    case '': case '#/': case '#/inicio':
      main.appendChild(componentes.fondoHome(formInicioSesion()));
      inicioSesion('formIngreso', 'ubicacionModal');
      document.getElementById('ubicacionModal').style.transition='1s';
      break;
    case '#/registro':
      main.appendChild(componentes.fondoHome(formRegistro()));
      registroCorreo('usuarioRegistro', 'formRegistro', 'ubicacionModal');
      break;
    case '#/artmuro':
      main.innerHTML = divMuro;
      break;
    default:
      break;
  }
};
