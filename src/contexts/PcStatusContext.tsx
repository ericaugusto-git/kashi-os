import React, { createContext, useState } from "react";

type PcStatusContextType = [string, React.Dispatch<React.SetStateAction<string>>]

export const PcStatusContext = createContext<PcStatusContextType>(["on", () => false]);

type PcStatusContextProviderProps = {
    children: React.ReactNode;
}

export default function PcStatusContextProvider({children}: PcStatusContextProviderProps){

    const [pcStatus, setPcStatus] = useState<string>("on");
    return <PcStatusContext.Provider value={[pcStatus, setPcStatus ]}>
        {children}
    </PcStatusContext.Provider>
}

