/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  createContext
} from "react";
import Desktop from "./Desktop/Desktop";
import PcStatusContextProvider from "./contexts/PcStatusContext";
import { ThemeProvider } from "./contexts/ThemeContext";

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
    <ThemeProvider>
      <PcStatusContextProvider>
          <Desktop/>
      </PcStatusContextProvider>
    </ThemeProvider>
  );
}

export default App;
