import React, { createContext, useContext, useState } from "react";

type PcStatusContextType = [string, React.Dispatch<React.SetStateAction<string>>]

export const PcStatusContext = createContext<PcStatusContextType>(["on", () => false]);

type PcStatusContextProviderProps = {
    children: React.ReactNode;
}

  function PcStatusContextProvider({children}: PcStatusContextProviderProps){

    const [pcStatus, setPcStatus] = useState<string>("on");
    return <PcStatusContext.Provider value={[pcStatus, setPcStatus ]}>
        {children}
    </PcStatusContext.Provider>
}

 function usePcStatus() {
    const context = useContext(PcStatusContext)
    
    if (context === undefined) {
      throw new Error('useTheme must be used within a ThemeProvider')
    }
    return context
  }

  export {PcStatusContextProvider, usePcStatus}
