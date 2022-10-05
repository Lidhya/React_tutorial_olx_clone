import { initializeApp } from 'firebase/app';
import 'firebase/auth'
import 'firebase/firestore';


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDUlamwDxq5BsSp4hMUpTGLcNCs-A85Dfg",
    authDomain: "fir-f617d.firebaseapp.com",
    projectId: "fir-f617d",
    storageBucket: "fir-f617d.appspot.com",
    messagingSenderId: "241556229915",
    appId: "1:241556229915:web:dcf3614cc7b262a2c60dbe",
    measurementId: "G-P795G0BZ0B"
  };

  export default initializeApp(firebaseConfig)
 