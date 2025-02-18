export async function onSubmit({setError, input, setLoading, moduleId, processDataHandler}) {
    setError("");

    if (input !== "") {
        setLoading({ isLoading: true, cursor: "cursor-wait" }); 
        
        try {       
            let response = await fetch(import.meta.env.VITE_AWS_FETCH_URL, {
              method: "post",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                input: input,
                module: {
                  id: moduleId,              
                },
              }),
            });  
            
            if (!response.ok) {
              throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
      
            let fetchedData = await response.json();        
            
            if (fetchedData) {
              processDataHandler(fetchedData);
            }
            else {
                setError("incorrect image url, try e.g. https://images.pexels.com/photos/818261/pexels-photo-818261.jpeg");
              }
          } catch (error) {        
            console.error("An error occurred:", error);
          } finally {
    
            setLoading({ isLoading: false, cursor: "cursor-default" });
          };
    }
};