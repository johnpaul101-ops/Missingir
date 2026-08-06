import { useState } from "react";
import { createContext } from "react";

const UIContext = createContext();

export const UIContextProvider = ({ children }) => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [hasActiveConvo, setHasActiveConvo] = useState(false);
  return (
    <UIContext.Provider
      value={{ openSidebar, setOpenSidebar, hasActiveConvo, setHasActiveConvo }}
    >
      {children}
    </UIContext.Provider>
  );
};

export default UIContext;
