import { createContext, useState } from "react";

export const lrContext = createContext();

export const LrContextProvider = ({ children }) => {
  const [logState, setLogState] = useState(false);
  const [regState, setRegState] = useState(false);
  const [regSucc, setRegSucc] = useState(false);
  const handleToggleLog = () => {
    setLogState((prevState) => !prevState);
  };
  const handleToggleReg = () => {
    setRegState((prevState) => !prevState);
  };
  return (
    <lrContext.Provider value={{ logState, handleToggleLog,regState,handleToggleReg,regSucc, setRegSucc }}>
      {children}
    </lrContext.Provider>
  );
};
