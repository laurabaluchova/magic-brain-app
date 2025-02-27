import { useState, useContext, useEffect } from "react";
import ImageLinkForm from "./ImageLinkForm";
import { AuthContext } from "../AuthProvider";
import { onSubmit } from "../helpers/onSubmitHelper";

const FaceRecognition = () => {
  const { user, loading : authLoading } = useContext(AuthContext);

  const [box, setBox] = useState([]);
  const [input, setInput] = useState("https://images.pexels.com/photos/1084554/pexels-photo-1084554.jpeg");
  const userName = user ? user.displayName : "Guest";  
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

  const displayFaceBox = (box) => {
    setBox(box);
  };

  const calculateFaceLocation = (locationsArray) => {
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    let box = [];
    locationsArray.forEach((item) => {
      box.push({
        leftCol: item.left_col * width,
        topRow: item.top_row * height,
        rightCol: width - item.right_col * width,
        bottomRow: height - item.bottom_row * height,
      });
    });
    return box;
  };

  const prepareLocationsArray = (data) => {
    let locationsArray = [];
    let cleaned_data = data.outputs[0].data;
    console.log(cleaned_data);
    cleaned_data.regions.forEach((item) => {
      locationsArray.push(item.region_info.bounding_box);
    });
    return locationsArray;
  };

   const onInputChange = (event) => {
    setInput(event.target.value);
    setError("")    
    setBox([]);    
  };

  const moduleId = "face-detection";

  const processDataHandler = (fetchedData) => {
    if (fetchedData && fetchedData.outputs[0].data.regions.length !== 0) {
      displayFaceBox(
        calculateFaceLocation(prepareLocationsArray(fetchedData))
      )
    }
    else if (fetchedData && fetchedData.outputs[0].data.regions.length === 0) {
      setError("There was not recognized any face")
    } 
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
        <span className="font-bold text-customOrange">let AI recognize faces</span>
        {" in the picture"}
      </h1>     

      <div className="flex flex-col items-center gap-2">
        <ImageLinkForm
          onInputChange={onInputChange}
          onSubmit={handleSubmit}
          input={input}
          // validateUrl={validateUrl}
          loading={loading.isLoading}
          btnActive={btnActive}
        />

        {error && <p className="text-customOrange font-bold text-xl">{error}</p>}        
        <div className="relative">          
            <img
              id="inputimage"
              alt=""
              src={input}
              width="500px"
              height="auto"
              className="block mx-auto" 
            />
          
          {box.map((item) => (
            <div
              key={`box${item.topRow}${item.rightCol}`}
              className="absolute flex flex-wrap justify-center"
              style={{
                top: item.topRow,
                right: item.rightCol,
                bottom: item.bottomRow,
                left: item.leftCol,
                boxShadow: "inset 0 0 0 3px #E36628",
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FaceRecognition;
