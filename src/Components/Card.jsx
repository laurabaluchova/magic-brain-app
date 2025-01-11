
import { useNavigate } from "react-router-dom";

const Card = ({ title, buttonText, imageSource, imageAlt, url, hoverColor }) => {
     const navigate = useNavigate();

    return (
        <div
        className="max-w-sm mx-auto bg-white shadow-md rounded-lg overflow-hidden flex flex-col h-full cursor-pointer"
        onClick={() => {            
          navigate(url);
        }}
      >
        <div className="bg-black text-white text-center py-4 px-6 dark:bg-gray-100 dark:text-black">          
          <h2 className="text-xl font-semibold">{title}</h2>
        </div>
        <div className="p-6 flex-grow">          
          <img src={imageSource} width="auto" height="600px" alt={imageAlt} className="hover:opacity-80" />
        </div>
        <div className="bg-gray-100 p-4 text-center">          
          <button className={`bg-black text-white px-4 py-2 rounded ${hoverColor}`} >
            {buttonText}
          </button>
        </div>
      </div>
    );
  };
  
  export default Card;