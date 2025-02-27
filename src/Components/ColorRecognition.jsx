import ImageLinkForm from "./ImageLinkForm";
import { useState, useContext, useEffect } from "react";
import ColorSwatch from "./ColorSwatch";
import { AuthContext } from "../AuthProvider";
import { onSubmit } from "../helpers/onSubmitHelper";

const ColorRecognition = () => { 
  const { user, loading : authLoading } = useContext(AuthContext);

  const [input, setInput] = useState("https://images.pexels.com/photos/1084554/pexels-photo-1084554.jpeg");
  const [mainColor, setMainColor] = useState("");
  const [loading, setLoading] = useState({isLoading: false, cursor: "cursor-default"});
  const [error, setError] = useState("");
  const [btnActive, setBtnActive] = useState(false);
  
    let isValid = function(urlTocheck=""){
      return new Promise((resolve) => {
        const img = new Image();
        img.src = urlTocheck;
    
        img.onload = () => resolve(true); 
        img.onerror = () => resolve(false); 
      });
   };
  
   useEffect(() => {
    console.log(input)
    const checkValidity = async () => {
      const valid = await isValid(input);
      setBtnActive(valid);
    }
    checkValidity();  
   }, [input]);

  const userName = user ? user.displayName : "Guest";  

  const prepareColorsArray = (data) => {
    let colorsArray = [];
    let cleaned_data = data.outputs[0].data;
    cleaned_data.colors.forEach((item) => {
      colorsArray.push(item);
    });
    let sortedColorsArray = colorsArray.sort((a, b) => b.value - a.value);
    return sortedColorsArray;
  };

  const displayColorSwatch = (colorSwatch) => {
    setMainColor(colorSwatch[0].raw_hex);
  };

  const onInputChange = (event) => {
    setInput(event.target.value);
    setMainColor("");
  };

 const moduleId = "color-recognition";

  const processDataHandler = (fetchedData) => {
    displayColorSwatch(prepareColorsArray(fetchedData));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();    

    try {
      await onSubmit({ 
        setError, 
        input, 
        setLoading, 
        moduleId, 
        processDataHandler 
      });
    } catch (error) {
      console.error('Submission failed:', error);
    }    
  }; 
  

  if (authLoading) {
    return <div>Loading...</div>; 
  }

  return (
    <div className={`h-screen ${loading.cursor}`}>
      <h1 className="text-h1 m-4">
        {`${userName}, `}
        <span className="font-bold text-customBlue">let AI detect main color</span>
        {" in the picture"}
      </h1>

      <div className="flex flex-col items-center gap-2">
        <ImageLinkForm
          onInputChange={onInputChange}
          onSubmit={handleSubmit}
          input={input}          
          loading={loading.isLoading}
          btnActive={btnActive}
        />
        {error && <p className="text-customBlue font-bold text-xl">{error}</p>}
        <div className="relative">          
          <ColorSwatch mainColor ={mainColor} />         
            <img
              id="inputimage"
              alt=""
              src={input}
              width="500px"
              height="auto"
              className="mb-10" 
            ></img>          
        </div>
      </div>
    </div>
  );
};

export default ColorRecognition;
