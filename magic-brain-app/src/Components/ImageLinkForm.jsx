const ImageLinkForm = ({ onInputChange, onSubmit, input, validateUrl} ) => {
  
  return (
    <div className="mb-6">   
     
       
     <label htmlFor="name" className="block text-black text-sm font-medium mb-2">Insert image URL</label>
          <input
            
            type="text"
            placeholder="Insert image URL here"
            value={input}
            onChange={onInputChange}
            className="text-black text-lg font-medium mb-2 border p-2"
          />
          <button
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-600"
            onClick={onSubmit}
          >
            {/* {ctx.isLoading ? "Loading..." : "Detect"} */}
            Detect
          </button>
        
        
      {!validateUrl(input) && (
          <p>Enter valid URL with ending jpg, jpeg or png</p>
         )}
    
    </div>
  );
};

export default ImageLinkForm;
