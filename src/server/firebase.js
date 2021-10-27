import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/storage';


const firebaseConfig = {
    apiKey: "AIzaSyDaTkne1q-XgE6SOAnHFXB_CUCZ9s5Sb6A",
    authDomain: "project-i-c2b8f.firebaseapp.com",
    projectId: "project-i-c2b8f",
    storageBucket: "project-i-c2b8f.appspot.com",
    messagingSenderId: "11730745799",
    appId: "1:11730745799:web:23005892599619fbae81e2",
    measurementId: "G-MH2KKLJYL0"
  };

  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  const storageImage= firebase.storage();
  export const guardarDocumento= (nombreDocumento,documento) => storageImage.ref().child(nombreDocumento).put(documento);
  export const devolverDocumento=(documentoUrl) => storageImage.ref().child(documentoUrl).getDownloadURL();
  
  export {
      db,
      firebase,
      storageImage
  }