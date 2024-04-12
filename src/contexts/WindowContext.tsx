import React, { createContext, useContext, useState } from "react";
import { WindowType } from "../constants/window";


type WindowContextType = [WindowType[], React.Dispatch<React.SetStateAction<WindowType[]>>]

export const WindowContext = createContext<WindowContextType>([[], () => {}]);

type WindowContextProviderProps = {
    children: React.ReactNode;
}

export default function WindowContextProvider({children}: WindowContextProviderProps){

    const [windows, setWindows] = useState<WindowType[]>([]);
    return <WindowContext.Provider value={[windows, setWindows ]}>
        {children}
    </WindowContext.Provider>
}

export function useWindowContext(){
    const context = useContext(WindowContext);
    return context;
}