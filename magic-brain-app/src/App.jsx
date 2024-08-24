import './App.css'
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: "AIzaSyAqPN_gP_4Mnj4Cm3mkqmQU-ObiHd9fQrY",

  authDomain: "magic-brain-app.firebaseapp.com",

  projectId: "magic-brain-app",

  storageBucket: "magic-brain-app.appspot.com",

  messagingSenderId: "1059447635938",

  appId: "1:1059447635938:web:67cbe5c862a557d747c3bb"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function getUsers(db) {
const usersCollection = collection(db, 'users');
const userSnapshot = await getDocs(usersCollection);
const userList = userSnapshot.docs.map(doc => doc.data());
return userList;
}

const demo_users = await getUsers(db);

console.log(demo_users
, "demo")

function App() { 
  
  return (
    <div>
     <h1>{demo_users[0].name}</h1>
     <h2>{demo_users[0].inputs_count}</h2>
    </div>
  )
}

export default App
