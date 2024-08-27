const ColorSwatch = ({ imageColors }) => {
    return (
      <div >
        <input        
          type="color"
          name="color2"
          value={imageColors}
        />
        <h1 className="f5">Dominant color: {imageColors === "" ? "Click Detect to find out main color" : imageColors}</h1>
      </div>
    );
  };
  
  export default ColorSwatch;