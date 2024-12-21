import{ useState, useEffect, useContext } from 'react';
import { auth } from './App';
import Register from './Components/Register';
import CrossRoad from './Components/CrossRoad';
import HomePageUnauthorized from './Components/HomepageUnauthorized';
import { AuthContext } from './AuthProvider';



function Homepage() {
  const [currentUser, setCurrentUser] = useState(null);
  const { loading : authLoading } = useContext(AuthContext);

  useEffect(() => {
    // Set up the listener for authentication state changes
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user); // Update the currentUser state
    });

    // Clean up the listener on component unmount
    return () => unsubscribe();
  }, []);

  
  return (
    <div>
      {authLoading ? "loading..." : (currentUser ? <CrossRoad /> : <HomePageUnauthorized />)}
      {/* <p>{authLoading ? "loading" : "not loading"}</p>
      {currentUser ? <CrossRoad /> : <HomePageUnauthorized />} */}
    </div>
  );
}

export default Homepage;
