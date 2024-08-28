import { useState } from "react";
// import "./FaceRecognition.css";
import ImageLinkForm from "./ImageLinkForm";
import { auth } from "../App";

const FaceRecognition = () => {
    const [box, setBox] = useState([]);
    const [input, setInput] = useState("");
    const userName = auth.currentUser.displayName;

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
        setBox([])
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
              module: {
                id: "face-detection",
                name: "faces",
              },
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
        <div className="flex flex-col items-center h-screen ">
            <p className="text-lg">
        {`${userName}, recognize faces in the picture with this Magic Brain App`}
      </p>      
       <div className="flex flex-col items-center space-y-12">
        <ImageLinkForm onInputChange={onInputChange} onSubmit={onSubmit} input={input} validateUrl={validateUrl}/>

        
        
        <div className="absolute">
        {/* <div className="mx-auto m-10"> */}
        
        {validateUrl(input) && (
            <img
              id="inputimage"
              alt=""
              src={input}
              width="500px"
              height="auto"                         
            ></img>
          )}
          {box.map((item) => (
            <div
              key={`box${item.topRow}${item.rightCol}`}
              className="absolute flex flex-wrap justify-center"
              style={{
                top: item.topRow,
                right: item.rightCol,
                bottom: item.bottomRow,
                left: item.leftCol,
                boxShadow: 'inset 0 0 0 3px #E36628',
              }}
            ></div>
          ))}     
          {/* </div>    */}
          </div>
          </div>
      

        </div>
      )
    

};

export default FaceRecognition;