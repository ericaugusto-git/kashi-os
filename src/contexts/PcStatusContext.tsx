import React, { createContext, useContext, useState } from "react";

type PcStatus = "shutdown" | "on" | "sleeping" | "lofi" | "game_over";
type PcStatusContextType = [string, React.Dispatch<React.SetStateAction<PcStatus>>]

export const PcStatusContext = createContext<PcStatusContextType>(["on", () => false]);

type PcStatusContextProviderProps = {
    children: React.ReactNode;
}

  function PcStatusContextProvider({children}: PcStatusContextProviderProps){

    const [pcStatus, setPcStatus] = useState<PcStatus>("on");
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
