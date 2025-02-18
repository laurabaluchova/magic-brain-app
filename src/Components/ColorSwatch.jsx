const ColorSwatch = ({ mainColor }) => {
    return (
      <div className="mt-2">
        <input        
          type="color"
          name="color2"
          value={mainColor}
          className="w-64"
        />
        <h1 className="f5">Main color: {mainColor === "" ? "Click Detect to find out main color" : mainColor}</h1>
      </div>
    );
  };
  
  export default ColorSwatch;