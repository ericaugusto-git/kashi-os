import React, { createContext, useContext, useState } from "react";
import { AppType } from "@/constants/apps";


type WindowContextType = [AppType[], React.Dispatch<React.SetStateAction<AppType[]>>]

export const WindowContext = createContext<WindowContextType>([[], () => {}]);

type WindowContextProviderProps = {
    children: React.ReactNode;
}

export default function WindowContextProvider({children}: WindowContextProviderProps){

    const [windows, setWindows] = useState<AppType[]>([]);
    return <WindowContext.Provider value={[windows, setWindows ]}>
        {children}
    </WindowContext.Provider>
}

export function useWindowContext(){
    const context = useContext(WindowContext);
    return context;
}