/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  createContext
} from "react";
import { pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import '../i18n.js';
import Desktop from "./Desktop/Desktop";
import { DesktopPositionContextProvider } from "./contexts/DesktopPositonContext.js";
import { PcStatusContextProvider } from "./contexts/PcStatusContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { WallpaperProvider } from "./contexts/WallpaperContext.js";
import { WeatherProvider } from "./contexts/WheaterContext";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;



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
      <WallpaperProvider>
        <PcStatusContextProvider>
          <WeatherProvider>
            <DesktopPositionContextProvider>
              <Desktop/>
            </DesktopPositionContextProvider>
          </WeatherProvider>
        </PcStatusContextProvider>
      </WallpaperProvider>
    </ThemeProvider>
  );
}

export default App;
