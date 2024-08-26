import { auth } from "./App";
import ImageLinkForm from "./Components/ImageLinkForm";

function Homepage() {
    const userName = auth.currentUser.displayName

    return (
        <>
        <h1>Welcome {userName}</h1>
        <ImageLinkForm />
        </>
    )
};

export default Homepage;