import { useNavigate } from "react-router-dom";

const CrossRoad = () => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-2 mt-8">
      <div className="max-w-sm mx-auto bg-white shadow-md rounded-lg overflow-hidden flex flex-col h-full cursor-pointer" onClick={() => {
              navigate("/faces");
            }}>
        <div className="bg-black text-white text-center py-4 px-6">
          {/* <!-- Card Header --> */}
          <h2 className="text-xl font-semibold">Face Recognition Mode</h2>
        </div>
        <div className="p-6 flex-grow">
          {/* <!-- Card Body --> */}
          <img src="/face.png" width="auto" height="600px"></img>
        </div>
        <div className="bg-gray-100 p-4 text-center">
          {/* <!-- Card Footer --> */}
          <button
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-600" 
          >
            Recognize Faces
          </button>
        </div>
      </div>

      <div className="max-w-sm mx-auto bg-white shadow-md rounded-lg overflow-hidden flex flex-col h-full cursor-pointer" onClick={() => {
              navigate("/colors");
            }}>
        <div className="bg-black text-white text-center py-4 px-6">
          {/* <!-- Card Header --> */}
          <h2 className="text-xl font-semibold">Color Detection Mode</h2>
        </div>
        <div className="p-6 flex-grow">
          {/* <!-- Card Body --> */}
          <img src="/color.png" width="auto" height="600px"></img>
        </div>
        <div className="bg-gray-100 p-4 text-center">
          {/* <!-- Card Footer --> */}
          <button
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-600"
            onClick={() => {
              navigate("/colors");
            }}
          >
            Detect Main Color
          </button>
        </div>
      </div>
    </div>
  );
};

export default CrossRoad;
