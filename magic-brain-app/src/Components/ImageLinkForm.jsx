const ImageLinkForm = ({ onInputChange, onSubmit, input, validateUrl} ) => {
  
  return (
    <div>   
     
        <div >
          <input
            
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
        
      {!validateUrl(input) && (
          <p className="gold">Enter valid URL with ending jpg, jpeg or png</p>
         )}
    
    </div>
  );
};

export default ImageLinkForm;
