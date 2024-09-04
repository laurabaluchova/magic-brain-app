import ImageLinkForm from "./ImageLinkForm";
import { useState, useEffect } from "react";
import ColorSwatch from "./ColorSwatch";
import { auth } from "../App";

const ColorRecognition = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user); 
    });   
    return () => unsubscribe();
  }, []);
  const [input, setInput] = useState("");
  const [imageColors, setImageColors] = useState("");
  const [loading, setLoading] = useState({isLoading: false, cursor: "cursor-default"})
  const userName = currentUser.displayName;  

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
    setImageColors(colorSwatch[0].raw_hex);
  };

  const onInputChange = (event) => {
    setInput(event.target.value);
    setImageColors("");
  };

  const validateUrl = (URL) => {
    const regex = new RegExp("(https?://.*.(?:png|jpg|jpeg))");
    return regex.test(URL);
  };

  async function onSubmit() {
    console.log("click");
    if (input !== "" ) {
      setLoading({isLoading: true, cursor: "cursor-wait"})

      let response = await fetch(`/api/imageurl`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          input: input,
          module: {
            id: "color-recognition",
            name: "colors",
          },
        }),
      });

      let fetchedData = await response.json();
      console.log(fetchedData);
      if (fetchedData) {
        displayColorSwatch(prepareColorsArray(fetchedData));
      }
    } else {
      console.log("incorrect image url");
    }
    setLoading({isLoading: false, cursor: "cursor-default"})
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
          onSubmit={onSubmit}
          input={input}
          validateUrl={validateUrl}
          loading={loading.isLoading}
        />
        <div className="relative">
          {/* {validateUrl(input) && <ColorSwatch imageColors={imageColors} />} */}
          <ColorSwatch imageColors={imageColors} />

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
