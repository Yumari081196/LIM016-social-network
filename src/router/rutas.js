import { componentes } from '../lib/index.js';
import { formRegistros, registroCorreo } from '../componentes/registro.js';
import { formInicioSesion, inicioSesion } from '../componentes/inicioSesion.js';
import {
  muro,
  muroPerfil,
  muroEditarPerfil,
  seccionCategorias,
} from '../componentes/muro.js';
import { cerrarSesion, menuPuntosVerticales } from '../componentes/headerMuro.js';
import { userState } from '../componentes/validaciones.js';
import { creacionPost, modalCategorias } from '../componentes/seccionSecMuro.js';
import { btnEditarPerfil } from '../componentes/seccionEditarPerfil.js';

export const vistasPantalla = () => {
  const main = document.getElementById('main');
  main.innerHTML = '';
  switch (window.location.hash.toLowerCase()) {
    case '': case '#/': case '#/inicio':
      main.appendChild(componentes.fondoHome(formInicioSesion()));
      inicioSesion('formIngreso', 'ubicacionModal');
      break;

    case '#/registro':
      main.appendChild(componentes.fondoHome(formRegistros()));
      registroCorreo('formRegistro', 'ubicacionModal');
      break;

    case '#/artmuro':
      userState();
      main.appendChild(muro());
      cerrarSesion();
      menuPuntosVerticales();
      creacionPost('formCompartir', 'container-post');
      modalCategorias();
      break;

    case '#/artrefugio':
      userState();
      main.appendChild(seccionCategorias('imagenes/iconoRefugioMascotas.png', 'Refugios'));
      cerrarSesion();
      menuPuntosVerticales();
      break;

    case '#/artmascotasperdidas':
      userState();
      main.appendChild(seccionCategorias('imagenes/reportarIcono.png', 'Mascotas Perdidas'));
      cerrarSesion();
      menuPuntosVerticales();
      break;

    case '#/artadoptar':
      userState();
      main.appendChild(seccionCategorias('imagenes/adoptarIcono.png', 'Adoptar'));
      cerrarSesion();
      menuPuntosVerticales();
      break;

    case '#/artlugares':
      userState();
      main.appendChild(seccionCategorias('imagenes/localizacionIcono.png', 'Lugares'));
      cerrarSesion();
      menuPuntosVerticales();
      break;

    case '#/artdonaciones':
      userState();
      main.appendChild(seccionCategorias('imagenes/medicinasIcono.png', 'Donaciones'));
      cerrarSesion();
      menuPuntosVerticales();
      break;

    case '#/artperfil':
      userState();
      main.appendChild(muroPerfil());
      cerrarSesion();
      menuPuntosVerticales();
      /* menuPuntosHorizontales(); */
      break;

    case '#/arteditarperfil':
      userState();
      main.appendChild(muroEditarPerfil());
      cerrarSesion();
      menuPuntosVerticales();
      btnEditarPerfil();
      break;

    default:
      main.innerHTML = 'Página No Encontrada';
      break;
  }
};
