import './App.css'
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import Register from './Register';
import {useState, useEffect} from 'react';
import {AuthProvider} from './AuthContext';


const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,

  authDomain: import.meta.env.VITE_AUTH_DOMAIN,

  projectId: import.meta.env.VITE_PROJECT_ID,

  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,

  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,

  appId: import.meta.env.VITE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const auth = getAuth(app)
export {auth}

async function getUsers(db) {
const usersCollection = collection(db, 'users');
const userSnapshot = await getDocs(usersCollection);
const userList = userSnapshot.docs.map(doc => doc.data());
return userList;
}

const demo_users = await getUsers(db);

function App() { 
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
     })
  }, [])

  return (
    <>
    <AuthProvider value={{currentUser}}></AuthProvider>
    <div>
     <h1>{demo_users[0].name}</h1>
     <h2>{demo_users[0].inputs_count}</h2>
     <Register />
    </div>
    <AuthProvider />
    </>
  )
}

export default App
