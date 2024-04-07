import React, { createContext, useContext, useState } from "react";
import { WindowType } from "../constants/window";

export const WindowContext = createContext<[WindowType[], React.Dispatch<React.SetStateAction<WindowType[]>>]>([[], () => {}]);

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