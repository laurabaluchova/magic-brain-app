import ImageLinkForm from "./ImageLinkForm";
import { useState, useContext } from "react";
import ColorSwatch from "./ColorSwatch";
import { AuthContext } from "../AuthProvider";
import { onSubmit } from "../helpers/onSubmitHelper";

const ColorRecognition = () => { 
  const { user, loading : authLoading } = useContext(AuthContext);

  const [input, setInput] = useState("");
  const [mainColor, setMainColor] = useState("");
  const [loading, setLoading] = useState({isLoading: false, cursor: "cursor-default"});
  const [error, setError] = useState("");

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

  // const validateUrl = (url) => {
  //   const regex = new RegExp("(https?://.*.(?:png|jpg|jpeg))");
  //   return regex.test(url);
  // };

  // async function onSubmit() {  
  //   if (input !== "") {
  //     setLoading({ isLoading: true, cursor: "cursor-wait" });
  
  //     try {       
  //       let response = await fetch(import.meta.env.VITE_AWS_FETCH_URL, {
  //         method: "post",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({
  //           input: input,
  //           module: {
  //             id: "color-recognition",              
  //           },
  //         }),
  //       });  
        
  //       if (!response.ok) {
  //         throw new Error(`Error: ${response.status} ${response.statusText}`);
  //       }
  
  //       let fetchedData = await response.json();        
        
  //       if (fetchedData) {
  //         displayColorSwatch(prepareColorsArray(fetchedData));
  //       }
  //     } catch (error) {        
  //       console.error("An error occurred:", error);
  //     } finally {

  //       setLoading({ isLoading: false, cursor: "cursor-default" });
  //     }
  //   }
    
  // }

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
          // validateUrl={validateUrl}
          loading={loading.isLoading}
        />
        {error && <p className="text-customBlue font-bold text-xl">{error}</p>}
        <div className="relative">
          {/* {validateUrl(input) && <ColorSwatch imageColors={imageColors} />} */}
          <ColorSwatch mainColor ={mainColor} />

          {/* {validateUrl(input) && ( */}
            <img
              id="inputimage"
              alt=""
              src={input}
              width="500px"
              height="auto"
            ></img>
          {/* )} */}
        </div>
      </div>
    </div>
  );
};

export default ColorRecognition;
