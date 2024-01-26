import { createContext, useContext } from "react";

const userContext = createContext();
const useUserContext = () => useContext(userContext);

export {userContext, useUserContext};