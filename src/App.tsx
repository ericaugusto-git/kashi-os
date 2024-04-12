/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  createContext
} from "react";
import Desktop from "./Desktop/Desktop";
import PcStatusContextProvider from "./contexts/PcStatusContext";

type ContextType = [
  boolean,
  Dispatch<SetStateAction<boolean>>,
  MutableRefObject<HTMLButtonElement | null>
];
export const StartSetterContext = createContext<ContextType>([
  false,
  () => {},
  { current: null },
]);

function App() {


  return (
    <PcStatusContextProvider>
        <Desktop/>
    </PcStatusContextProvider>
  );
}

export default App;
