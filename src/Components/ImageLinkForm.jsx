const ImageLinkForm = ({ onInputChange, onSubmit, input, loading }) => {
  return (
    <div className="flex flex-col w-11/12 sm:w-5/6 lg:w-2/3 mx-auto mt-6 mb-4">
      <label className="block text-black text-lg sm:text-xl mb-2 mr-auto dark:text-gray-400">
        Insert image URL
      </label>
      <div className="flex flex-col sm:flex-row items-center w-full space-y-4 sm:space-y-0 sm:space-x-4">
        <input
          type="text"
          value={input}
          onChange={onInputChange}
          className="text-black text-base sm:text-lg lg:text-xl border p-2 sm:p-4 flex-grow rounded-lg w-full sm:w-auto dark:text-gray-400"
          placeholder="Insert image URL here"
        />
        <button
          className="bg-black text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg 
          hover:bg-gray-600 flex-shrink-0 w-full sm:w-auto text-base sm:text-xl dark:bg-gray-500"
          onClick={onSubmit}
        >
          {loading ? "Loading..." : "Detect"}
        </button>
      </div>
    </div>
  );
};

export default ImageLinkForm;
