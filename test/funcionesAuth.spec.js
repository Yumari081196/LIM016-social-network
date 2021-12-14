// importamos la funcion que vamos a testear
/* import { myFunction } from '../src/lib/index';

describe('myFunction', () => {
  it('debería ser una función', () => {
    expect(typeof myFunction).toBe('function');
  });
}); */
import { inicioSesionUsuario } from '../src/firebase/funcionesAuth';

jest.mock('../src/firebase/funcionesAuth');

describe('Métodos de Firebase.auth()', () => {
  it('Inicia sesion con correo y contraseña', () => inicioSesionUsuario('fazahuanchef@gmail.com', 'holaFio123')
    .then((user) => {
      expect(user.email).toBe('fazahuanchef@gmail.com');
    }));
});
