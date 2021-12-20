import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  // eslint-disable-next-line import/no-unresolved
} from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-storage.js';
import { app } from './config.js';
//
const storage = getStorage(app);

export const subirFileStorage = async (file) => {
  const archivoRef = ref(storage, `imgUsuarios/${file.name}`);
  await uploadBytes(archivoRef, file);
  const traerFile = getDownloadURL(archivoRef);
  console.log(traerFile);
  return traerFile;
};
export {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
};
