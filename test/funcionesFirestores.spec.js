import { subirDataHomeCol } from '../src/firebase/funcionesFirestore';
import {
  addDoc, collection,
} from '../src/firebase/config';

jest.mock('../src/firebase/config');

describe('subirDataHomeCol', () => {
  it('Deberia subir data a coleccion posts', () => subirDataHomeCol('strCreador', 'strPost', 'strCat', '').then(async () => {
    const prueba = await addDoc(collection.mock.results[0].value, addDoc.mock.calls[0][1]);
    const variable = {
      posts: {
        categoria: 'strCat', imgPost: '', likes: [], publicacion: 'strPost', timestamp: undefined, usuarioId: 'strCreador',
      },
    };
    expect(prueba).toEqual(variable);
  }));
});
