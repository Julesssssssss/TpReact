import { createContext, useContext } from "react";
const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  const apiKey = "b06c1a74967f4aea1fb53a2f36d7c700";

  return (
    <ApiContext.Provider value={{ apiKey }}>{children}</ApiContext.Provider>
  );
};

export const useApi = () => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error("useApi must be used within a CartProvider");
  }
  return context;
};
