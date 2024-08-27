import { auth } from "./App";
import FaceRecignition from "./Components/FaceRecognition";
import ColorRecognition from "./Components/ColorRecognition";

function Homepage() {
    const userName = auth.currentUser.displayName

    return (
        < > 
        <h1>Welcome {userName}</h1>
        <ColorRecognition />
        </>
    )
};

export default Homepage;