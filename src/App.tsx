/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  createContext
} from "react";
import '../i18n.js';
import Desktop from "./Desktop/Desktop";
import PcStatusContextProvider from "./contexts/PcStatusContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { WeatherProvider } from "./contexts/WheaterContext";



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
        <WeatherProvider>
          <Desktop/>
        </WeatherProvider>
      </PcStatusContextProvider>
    </ThemeProvider>
  );
}

export default App;
