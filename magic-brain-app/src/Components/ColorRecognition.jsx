import ImageLinkForm from "./ImageLinkForm";
import { useState } from "react";
import ColorSwatch from "./ColorSwatch";

const ColorRecognition = () => {
  const [input, setInput] = useState("");
  const [imageColors, setImageColors] = useState("");

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
    if (input !== "" && validateUrl(input)) {
      //   setIsLoading(true);
      //   setCursor("wait");

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
  }

  return (
    <div className="flex flex-col items-center h-screen">
      <p className="text-lg">
        {`Detect main color in your pictures with this Magic Brain App`}
      </p>
      <ImageLinkForm
        onInputChange={onInputChange}
        onSubmit={onSubmit}
        input={input}
        validateUrl={validateUrl}
      />

      {validateUrl(input) && <ColorSwatch imageColors={imageColors} />}

      {validateUrl(input) && (
        <img
          id="inputimage"
          alt=""
          src={input}
          width="500px"
          height="auto"
        ></img>
      )}
    </div>
  );
};

export default ColorRecognition;
