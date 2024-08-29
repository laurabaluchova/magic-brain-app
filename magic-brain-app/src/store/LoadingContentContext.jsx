import {createContext} from "react";

const LoadingContext = createContext({
  isLoading: false,
  setIsLoading: () => {},
  cursor: "default",
  setCursor: () => {},
});

export default LoadingContext;