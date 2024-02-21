import {initializeApp} from 'firebase/app';
import { getAuth, GoogleAuthProvider} from 'firebase/auth';
import { getFirestore} from 'firebase/firestore';
import { getStorage} from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAsjNZKlZs8WRi7UJNzot2ZnMnQeYdJbG4',
  authDomain: 'social-sphere-7a9f4.firebaseapp.com',
  projectId: 'social-sphere-7a9f4',
  storageBucket: 'social-sphere-7a9f4.appspot.com',
  messagingSenderId: '925260312321',
  appId: '1:925260312321:web:eb9c10486d7cc271573500',
};

const app = initializeApp (firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider(); 
export const db = getFirestore(app);
export const storage = getStorage(app);
