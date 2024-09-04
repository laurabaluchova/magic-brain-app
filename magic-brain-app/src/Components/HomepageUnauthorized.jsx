import { TypeAnimation } from 'react-type-animation';
import { useNavigate } from 'react-router-dom';

const HomePageUnauthorized = () => {
const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-80 p-2">
            {/* Fixed height container for the animated text */}
            <div className="h-24 md:h-28 lg:h-32 flex items-center">
                <TypeAnimation
                    sequence={[
                        'Use the power of AI to\nrecognize faces',
                        2500, // Wait 2 seconds before switching
                        'Use the power of AI to\ndetect main color',
                        2500 // Wait 2 seconds before switching back
                    ]}
                    wrapper="span"
                    speed={7}
                    deletionSpeed={7}
                    className="text-3xl md:text-4xl lg:text-5xl font-bold text-center"
                    style={{ whiteSpace: "pre-line", display: 'inline-block' }}
                    repeat={Infinity}
                    preRenderFirstString="true"
                />
            </div>
            {/* Button container remains consistent */}
            <div className="flex flex-wrap justify-center gap-4 mt-10 w-full max-w-md">
                <button className="bg-black text-white px-8 py-4 text-lg md:text-xl rounded hover:bg-customOrange w-full sm:w-auto"
                onClick={() => navigate('/register')}>
                    Create Account
                </button>
                <button className="bg-black text-white px-8 py-4 text-lg md:text-xl rounded hover:bg-customOrange w-full sm:w-auto"
                onClick={() => navigate('/login')}>
                    Log In
                </button>
            </div>
        </div>
    );
};

export default HomePageUnauthorized;
