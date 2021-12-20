import {
  obtenerPosts, obtenerPostById, subirDataHomeCol, subirLikes, obtenerUsuarios,
} from '../firebase/funcionesFirestore.js';
import { subirFileStorage } from '../firebase/funcionesStorage.js';

export const subirContainer = (idPost, dataPost, dataCreador) => {
  const divTablero = document.createElement('div');
  divTablero.classList.add('tableroPost');

  divTablero.innerHTML = `
    <div class="usuarioPost" id= "${idPost}">
        <div class="imgUsuarioPost"><img class="imgPost"src="imagenes/ImgUsuario3.png"></div>
        <div class="infoUsuarioPost">
            <div class="nombreUsuarioPost"><p>${dataCreador.username}</p><img src="imagenes/bxs-user-plus 2.png"></div>
            <div class="descripcionUsuarioPost"><p>${dataCreador.descripcion}</p></div>
        </div>
    </div>
    <div class="estadoCompartido">
        <div class="contenidoCompartido">
            <p>${dataPost.publicacion}</p>
            <img src="${dataPost.imgPost}">
        </div>
    </div>
    <div class="botonesReaccion">

    <img src="imagenes/heartIcono.png" class="like" name= "${idPost}"><p>${dataPost.likes.length}</p>
        <img src="imagenes/comentIcono.png">
        <img src="imagenes/compartirIcono.png">
    </div>
    `;

  return divTablero;
};

export const btnLikes = () => {
  const postsCards = document.getElementsByClassName('botonesReaccion');
  // console.log(postsCards);
  Array.from(postsCards).forEach((postCard) => {
    const btnLike = postCard.querySelector('.like');
    btnLike.addEventListener('click', async () => {
      const hijo = btnLike.getAttribute('name');
      // const hermano = btnLike.nextElementSibling;
      // console.log(hermano);
      const userData = JSON.parse(sessionStorage.userSession);
      const veamos = await obtenerPostById(hijo);
      // console.log(veamos);
      if (veamos.likes.includes(userData.id)) {
        console.log('esta');
        subirLikes(hijo, veamos.likes.filter((item) => item !== userData.id));
        // hermano.textContent = veamos.likes.length;
      } else {
        console.log('no esta');
        subirLikes(hijo, [...veamos.likes, userData.id]);
        // hermano.textContent = veamos.likes.length;
      }
    });
  });
};

const rellenarHome = async (conteinerPost) => {
  const usuarios = await obtenerUsuarios();
  await obtenerPosts((querySnapshot) => {
    querySnapshot.docChanges().forEach((change) => {
      if (change.type === 'added') {
        const creadorPost = usuarios.filter((user) => user.userId === change.doc.data().usuarioId);
        conteinerPost.prepend(subirContainer(change.doc.id, change.doc.data(), creadorPost[0]));
        btnLikes();
      }
      if (change.type === 'modified') {
        const btnLike = document.getElementsByName(change.doc.id);
        const hermano = btnLike[0].nextElementSibling;
        hermano.textContent = change.doc.data().likes.length;
        btnLikes();
      }
      if (change.type === 'removed') {
        /* const postEliminado = document.getElementById(change.doc.id);
        postEliminado.parentElement.remove(); */
        console.log(('se removio algo'));
      }
      console.log(change);
    });
    /* cities.forEach((doc) => {
        conteinerPost.prepend(subirContainer(doc.postId, doc, ''));
      }); */
  });
  /* const datosPost = await obtenerPosts();
  datosPost.forEach((doc) => {
    conteinerPost.prepend(subirContainer(doc.postId, doc, ''));
    const btnLike = document.querySelector('.like');
    const hermano = btnLike.nextElementSibling;
    hermano.textContent = doc.likes.length;
  });
  btnLikes(); */
};

export const seccionMuro2 = () => {
  const segundaSeccion = document.createElement('section');
  segundaSeccion.classList.add('item3');

  const navInferior = document.createElement('nav');
  navInferior.classList.add('barraNavegacionInferior');
  navInferior.innerHTML = `
    <ul>
    <li class="list">
        <a id="abrirModal">
            <span class="icon">
                <img src="imagenes/users-three.png">
            </span>
        </a>
    </li>
    <li class="list">
        <a href="#/artmuro">
            <span class="icon">
                <img src="imagenes/house-fill.png">
            </span>
        </a>
    </li>
    <li class="list">
        <a href="#/artperfil">
            <span class="icon">
                <img src="imagenes/ImgUsuario.png">
            </span>
        </a>
    </li>
    </ul>
    `;
  const seccionModal = document.createElement('div');
  seccionModal.classList.add('modalCategoria');
  seccionModal.setAttribute('id', 'modalCategoria');
  seccionModal.innerHTML = `<section class="seccionModal">
    <div class="tituloModal">
      <h1>Grupos</h1>
      <span class="btnCerrar">&times;</span>
    </div>
    <div class= "contenedorCategorias">
        <a href="#/artrefugio" class="categoriaUnica">
            <img src="imagenes/iconoRefugioMascotas.png" >
            <p>Refugios</p>
        <a>
        <a href="#/artmascotasperdidas" class="categoriaUnica">
            <img src="imagenes/reportarIcono.png" >
            <p>Mascotas Perdidas</p>
        </a>
        <a href="#/artadoptar" class="categoriaUnica">
            <img src="imagenes/adoptarIcono.png" >
            <p>Adoptar</p>
        </a>
        <a href="#/artlugares" class="categoriaUnica">
            <img src="imagenes/localizacionIcono.png" >
            <p>Lugares</p>
        </a>
        <a href="#/artdonaciones" class="categoriaUnica">
            <img src="imagenes/medicinasIcono.png" >
            <p>Donaciones</p>
        </a>
    </div>
    </section>`;
  const tableroCompartir = document.createElement('form');
  tableroCompartir.setAttribute('id', 'formCompartir');
  tableroCompartir.classList.add('tableroCompartir');
  tableroCompartir.innerHTML = `
    <input type="text" placeholder="¿Qué quieres reportar?" id="inputCompartir"><img id="imgPost"></input>
    <div class="botones">
        <input type="file" placeholder="Añadir Imagen" id="compartirImg">
        <!--<button class="botonCompartirImagen" id="compartirImg"><img src="imagenes/botonCompartirImagen.png"></button>-->
        <select name="Grupo" id="Grupo" class="Grupo">
            <option value="" selected disabled>Seleccionar</option>
            <option value="Refugios">Refugios</option>
            <option value="Mascotas Perdidas">Mascotas Perdidas</option>
            <option value="Adoptar">Adoptar</option>
            <option value="Lugares">Lugares</option>
            <option value="Donaciones">Donaciones</option>
        </select>
        <button class="botonCompartir">Compartir</button>
    </div>
    `;
  const contenedorPublicaciones = document.createElement('div');
  contenedorPublicaciones.classList.add('container-post');
  contenedorPublicaciones.setAttribute('id', 'container-post');
  rellenarHome(contenedorPublicaciones);

  segundaSeccion.appendChild(navInferior);
  segundaSeccion.appendChild(tableroCompartir);
  segundaSeccion.appendChild(seccionModal);
  segundaSeccion.appendChild(contenedorPublicaciones);
  return segundaSeccion;
};

export const creacionPost = (formCompartir/* , containerPost */) => {
  const divCompartir = document.getElementById(formCompartir);
  // const containerPosts = document.getElementById(containerPost);

  let urlImg = [];
  const btnImg = document.getElementById('compartirImg');
  btnImg.addEventListener('change', async (e) => {
    urlImg.push(e.target.files[0]);
  });

  let categoriaSelect = [];
  const botonSelector = document.getElementById('Grupo');
  botonSelector.addEventListener('change', (e) => {
    categoriaSelect.push(e.target.value);
  });

  divCompartir.addEventListener('submit', async (e) => {
    e.preventDefault();
    let categoria = categoriaSelect[categoriaSelect.length - 1];
    const postTxt = document.getElementById('inputCompartir').value;
    const userData = JSON.parse(sessionStorage.userSession);
    if (categoria === undefined) categoria = 'inicio';
    if (urlImg.length === 0) {
      await subirDataHomeCol(userData.id, postTxt, categoria, '');
      /* .then((doc) => {
        obtenerPostById(doc.id).then((postsById) => {
          containerPosts.prepend(subirContainer(doc.id, postsById, ''));
        });
      }); */
      categoriaSelect = [];
      divCompartir.reset();
    } else {
      const archivo = await subirFileStorage(urlImg[urlImg.length - 1]);
      await subirDataHomeCol(userData.id, postTxt, categoria, archivo);
      /* .then((doc) => {
        obtenerPostById(doc.id).then((postsById) => {
          containerPosts.prepend(subirContainer(doc.id, postsById, ''));
        });
      }); */
      categoriaSelect = [];
      divCompartir.reset();
      urlImg = [];
    }
    // console.log(archivo);
  });
};

/* export const menuPuntosHorizontales = () => {
  const puntosHorizontales = document.querySelector('.puntosHorizontales');
  const middle2 = document.querySelector('.middle2');
  const desplegable2 = document.querySelector('.desplegable2');
  puntosHorizontales.addEventListener('click', () => {
    middle2.classList.toggle('active');
    desplegable2.classList.toggle('active');
  });
};
 */

export const modalCategorias = () => {
  const modalCategoria = document.getElementById('modalCategoria');
  const abrirModal = document.getElementById('abrirModal');
  const btnCerrar = document.querySelector('.btnCerrar');

  abrirModal.addEventListener('click', () => {
    modalCategoria.style.display = 'block';
  });

  btnCerrar.addEventListener('click', () => {
    modalCategoria.style.display = 'none';
  });

  /* outside click */
  window.addEventListener('click', (e) => {
    // eslint-disable-next-line eqeqeq
    if (e.target == modalCategoria) {
      modalCategoria.style.display = 'none';
    }
  });
};
