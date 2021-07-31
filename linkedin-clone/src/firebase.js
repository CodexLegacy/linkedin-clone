import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyDU-VFce5rkUqZpO4YHnCJo_VVBdq_CzuI',
  authDomain: 'linkedin-clone-45435.firebaseapp.com',
  projectId: 'linkedin-clone-45435',
  storageBucket: 'linkedin-clone-45435.appspot.com',
  messagingSenderId: '440031377780',
  appId: '1:440031377780:web:bfab0dc490b8529c3b5421',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };

export default db;
