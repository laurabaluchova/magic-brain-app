import{ useState, useEffect, useContext } from 'react';
import { auth } from './App';
import HomePageUnauthorized from './Components/HomepageUnauthorized';
import { AuthContext } from './AuthProvider';
import ColorRecognition from './Components/ColorRecognition';

function Homepage() {
  const [currentUser, setCurrentUser] = useState(null);
  const { loading : authLoading } = useContext(AuthContext);

  useEffect(() => {    
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user); 
    });

    return () => unsubscribe();
  }, []);
  
  return (
    <div>
      {authLoading ? "loading..." : (currentUser ? <ColorRecognition /> : <HomePageUnauthorized />)}      
    </div>
  );
}

export default Homepage;
