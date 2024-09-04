import{ useState, useEffect } from 'react';
import { auth } from './App';
import Register from './Components/Register';
import CrossRoad from './Components/CrossRoad';
import HomePageUnauthorized from './Components/HomepageUnauthorized';


function Homepage() {
  const [currentUser, setCurrentUser] = useState(null);

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
      {currentUser ? <CrossRoad /> : <HomePageUnauthorized />}
    </div>
  );
}

export default Homepage;
