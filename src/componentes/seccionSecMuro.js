import {
  subirEstadoDeUser, obtenerPosts, obtenerUsuario, obtenerPostsbyId, obtenerUsuarioById,
} from '../firebase/funcionesFirestore.js';

const subirContainer = (creadorPost, apodoUser, postTxt, srcImagenPost) => {
  const divTablero = document.createElement('div');
  divTablero.classList.add('tableroPost');

  divTablero.innerHTML = `
    <div class="usuarioPost">
        <div class="imgUsuarioPost"><img class="imgPost"src="imagenes/ImgUsuario3.png"></div>
        <div class="infoUsuarioPost">
            <div class="nombreUsuarioPost"><p>${creadorPost}</p><img src="imagenes/bxs-user-plus 2.png"></div>
            <div class="descripcionUsuarioPost"><p>${apodoUser}</p></div>
        </div>
        <div class="puntosHorizontales">
            <figure class="puntos"></figure>
            <figure class="puntos middle2"></figure>
            <p class="equis2">x</p>
            <figure class="puntos"></figure>
            <ul class="desplegable2">
                <li><a id="editar"><img src="imagenes/edit.png"><span>Editar</span></a></li>
                <li><a id="eliminar"><img src="imagenes/delete.png"><span>Eliminar</span></a></li>
            </ul>
        </div>
    </div>
    <div class="estadoCompartido">
        <div class="contenidoCompartido">
            <p>${postTxt}</p>
            <img src="${srcImagenPost}">
        </div>
    </div>
    <div class="botonesReaccion">
        <img src="imagenes/heartIcono.png">
        <img src="imagenes/comentIcono.png">
        <img src="imagenes/compartirIcono.png">
    </div>
    `;
  return divTablero;
};

const rellenarHome = async (conteinerPost) => {
  const datosPost = await obtenerPosts();
  const datosUsuario = await obtenerUsuario();
  datosPost.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    // console.log(`${doc.id}=>${doc.data()}`);
    conteinerPost.prepend(subirContainer('usuarioPrueba', 'prueba', doc.data().publicacion, ''));
  });
  console.log(datosUsuario);
};

export const seccionMuro2 = () => {
  const segundaSeccion = document.createElement('section');
  segundaSeccion.classList.add('item3');

  const navInferior = document.createElement('nav');
  navInferior.classList.add('barraNavegacionInferior');
  navInferior.innerHTML = `
    <ul>
    <li class="list">
        <a>
            <span class="icon">
                <img src="imagenes/users-three.png">
            </span>
        </a>
    </li>
    <li class="list">
        <a>
            <span class="icon">
                <img src="imagenes/house-fill.png">
            </span>
        </a>
    </li>
    <li class="list">
        <a>
            <span class="icon">
                <img src="imagenes/imgUsuario.png">
            </span>
        </a>
    </li>
    </ul>
    `;
  const tableroCompartir = document.createElement('form');
  tableroCompartir.setAttribute('id', 'formCompartir');
  tableroCompartir.classList.add('tableroCompartir');
  tableroCompartir.innerHTML = `
    <input type="text" placeholder="¿Qué quieres reportar?" id="inputCompartir">
    <div class="botones">
        <button class="botonCompartirImagen"><img src="imagenes/botonCompartirImagen.png"></button>
        <select name="Grupo" id="Grupo" class="Grupo">
            <option value="value1">Refugios</option>
            <option value="value2" selected>Reportar perdidos</option>
            <option value="value3">Adoptar</option>
            <option value="value4">Lugares</option>
            <option value="value5">Donaciones</option>
            <option value="value6"></option>
        </select>
        <button class="botonCompartir">Compartir</button>
    </div>
    `;
  const contenedorPublicaciones = document.createElement('div');
  contenedorPublicaciones.classList.add('container-post');
  contenedorPublicaciones.setAttribute('id', 'container-post');
  contenedorPublicaciones.prepend(subirContainer('Maria Casas', 'catLover', 'Adoptar una mascota es cambiar dos vidas: la de la mascota que al fin olvidará sus duros días sin familia y la de quien se convertirá en su dueño y tendrá días cargados de amor. Si te interesa acoger a un nuevo miembro en tu hogar, estas son algunas de las muchas opciones que encuentras para adoptar animales en Lima.', ''));
  rellenarHome(contenedorPublicaciones);

  segundaSeccion.appendChild(navInferior);
  segundaSeccion.appendChild(tableroCompartir);
  segundaSeccion.appendChild(contenedorPublicaciones);
  return segundaSeccion;
};

export const publicarHome = (formCompartir, containerPost) => {
  const divCompartir = document.getElementById(formCompartir);
  const containerPosts = document.getElementById(containerPost);
  divCompartir.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputCompartir = document.getElementById('inputCompartir').value;
    const user = sessionStorage.getItem('usuarioId');
    subirEstadoDeUser(user, inputCompartir).then(async (doc) => {
      const userById = await obtenerUsuarioById(user);
      const post = await obtenerPostsbyId(doc.id);
      containerPosts.prepend(subirContainer(userById.username, 'prueba', post.publicacion, ''));
    });
    divCompartir.reset();
  });
};

export const menuPuntosHorizontales = () => {
  const puntosHorizontales = document.querySelector('.puntosHorizontales');
  const middle2 = document.querySelector('.middle2');
  const equis2 = document.querySelector('.equis2');
  const desplegable2 = document.querySelector('.desplegable2');

  puntosHorizontales.addEventListener('click', () => {
    middle2.classList.toggle('active');
    equis2.classList.toggle('active');
    desplegable2.classList.toggle('active');
  });
};
