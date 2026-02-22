import { useNavigate } from 'react-router-dom';

const HomePageUnauthorized = () => {
const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-80 p-2">            
            <div className="h-24 md:h-28 lg:h-32 flex items-center">
                <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-center">Use the power of AI to detect main color of picture</div>
                                        
                
                

            </div>
            
            <div className="flex flex-wrap justify-center gap-4 mt-10 w-full max-w-md">
                <button className="bg-black text-white px-8 py-4 text-lg md:text-xl rounded hover:bg-customOrange w-full sm:w-auto dark:bg-gray-500"
                onClick={() => navigate('/register')}>
                    Create Account
                </button>
                <button className="bg-black text-white px-8 py-4 text-lg md:text-xl rounded hover:bg-customOrange w-full sm:w-auto dark:bg-gray-500"
                onClick={() => navigate('/login')}>
                    Log In
                </button>
            </div>
        </div>
    );
};

export default HomePageUnauthorized;
