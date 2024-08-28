import { auth } from "./App";
import FaceRecognition from "./Components/FaceRecognition";
import ColorRecognition from "./Components/ColorRecognition";
import Register from "./Components/Register";
import CrossRoad from "./Components/CrossRoad";

function Homepage() {     

    return (
        <div > 
            <div>
      {
        auth.currentUser ? (
          <>            
            <CrossRoad />
          </>
        ) : (
          <Register />
        )
      }
    </div>
        </div>
          
    )
};

export default Homepage;