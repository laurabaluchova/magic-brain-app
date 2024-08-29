const ImageLinkForm = ({ onInputChange, onSubmit, input, validateUrl, loading }) => {
  return (
    <div className="flex flex-col w-5/6 mb- mt-6">
    <label className="block text-black text-xl mb-2 mr-auto">
      Insert image URL
    </label>
    <div className="flex items-center w-full space-x-4">
      <input
        type="text"       
        value={input}
        onChange={onInputChange}
        className="text-black text-xl border p-4 flex-grow rounded-lg"
      />
      <button
        className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-600 flex-shrink-0 text-xl"
        onClick={onSubmit}
      >
        {loading ? "Loading..." : "Detect"}
      </button>
    </div>
  </div>
  
  );
};

export default ImageLinkForm;
