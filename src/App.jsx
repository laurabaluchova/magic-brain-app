import './App.css'
import { initializeApp } from 'firebase/app';
import {getAuth } from 'firebase/auth';
import Register from './Components/Register';
import Header from './Components/Header';
import Login from './Components/Login';


const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,

  authDomain: import.meta.env.VITE_AUTH_DOMAIN,

  projectId: import.meta.env.VITE_PROJECT_ID,

  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,

  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,

  appId: import.meta.env.VITE_APP_ID
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
export {auth}

function App() {   
  return (
    <>   
    <div>
    <Header />     
     <Login/>
     <Register />    
    </div>    
    </>
  )
}

export default App
