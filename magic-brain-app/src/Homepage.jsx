import { auth } from "./App";

function Homepage() {
    const userName = auth.currentUser.displayName

    return (
        <h1>Welcome {userName}</h1>
    )
};

export default Homepage;