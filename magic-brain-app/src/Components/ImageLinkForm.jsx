// import LoadingContext from "../../store/loading-context";
import { useState } from "react";

const ImageLinkForm = () => {
  const [input, setInput] = useState("");
  const [box, setBox] = useState([]);

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

  const serverUrl = "https://ai-brain-server.onrender.com";

    const onInputChange = (event) => {
    setInput(event.target.value);
  };

  const validateUrl = (URL) => {
    const regex = new RegExp("(https?://.*.(?:png|jpg|jpeg))");
    return regex.test(URL);
  };

  async function onSubmit() {
    console.log('click')
    if (input !== "" && validateUrl(input)) {
      //   setIsLoading(true);
      //   setCursor("wait");

      let response = await fetch(`/api/imageurl`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          input: input,
          module: "face-detection",
        }),
      });

      let fetchedData = await response.json();
      console.log(fetchedData)
      if (fetchedData) {
        displayFaceBox(
          calculateFaceLocation(prepareLocationsArray(fetchedData))
        );
      }
    } else {
      console.log("incorrect image url");
    }
  }

  return (
    <div>
      <p className="f4">
        {`Detect faces in your pictures with this Magic Brain App`}
      </p>
      <div className="center ">
        <div className="form center pa4 br3 shadow-5">
          <input
            className="f4 pa2 w-70 center"
            type="text"
            placeholder="Insert image URL here"
            value={input}
            onChange={onInputChange}
          />
          <button
            className="button w-30 grow f4 link ph3 pv2 dib white bg-purple pointer"
            onClick={onSubmit}
          >
            {/* {ctx.isLoading ? "Loading..." : "Detect"} */}
            Detect
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;
