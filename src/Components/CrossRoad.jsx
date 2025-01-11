import Card from "./Card";

const CrossRoad = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
      <Card title="Face Recognition Mode" buttonText="Recognize Faces" 
      imageSource="/face.webp" imageAlt="Face Recognition" url="/faces" hoverColor="hover:bg-customOrange"/>
      <Card title="Color Detection Mode" buttonText="Detect Main Color" 
      imageSource="/color.webp" imageAlt="Color Detection" url="/colors" hoverColor="hover:bg-customBlue"/>     
    </div>
  );
};

export default CrossRoad;
