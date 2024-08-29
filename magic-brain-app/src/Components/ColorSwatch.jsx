const ColorSwatch = ({ imageColors }) => {
    return (
      <div className="mt-2">
        <input        
          type="color"
          name="color2"
          value={imageColors}
          className="w-64"
        />
        <h1 className="f5">Dominant color: {imageColors === "" ? "Click Detect to find out main color" : imageColors}</h1>
      </div>
    );
  };
  
  export default ColorSwatch;