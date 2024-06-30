import React, { createContext, useContext, useState } from "react";

export type DesktopPosition = 'top' | 'bottom';

type DesktopPositionContextType = [DesktopPosition, React.Dispatch<React.SetStateAction<DesktopPosition>>]

export const DesktopPositionContext = createContext<DesktopPositionContextType>(["top", () => false]);

type DesktopPositionContextProviderProps = {
    children: React.ReactNode;
}

  function DesktopPositionContextProvider({children}: DesktopPositionContextProviderProps){

    const localPosition = localStorage.getItem('position') as DesktopPosition ?? 'top';
    const [position, setPosition] = useState<DesktopPosition>(localPosition);
      return <DesktopPositionContext.Provider value={[position, setPosition]}>
        {children}
    </DesktopPositionContext.Provider>
}

 function useDesktopPosition() {
    const context = useContext(DesktopPositionContext)
    
    if (context === undefined) {
      throw new Error('useDesktopPosition must be used within a ThemeProvider')
    }
    return context
  }

  export {DesktopPositionContextProvider, useDesktopPosition}