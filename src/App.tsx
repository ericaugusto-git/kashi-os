/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, MutableRefObject, SetStateAction, createContext, useRef } from 'react';
import Background from "./Background";
import Desktop from "./Desktop/Desktop";
import StartMenu from "./StartMenu/StartMenu";
import Taskbar from "./Taskbar/Taskbar";
import Window from "./Window/Window";
import WindowContextProvider from "./contexts/WindowContext";
import useComponentVisible from "./hooks/useComponentVisible";

type ContextType = [boolean, Dispatch<SetStateAction<boolean>>, MutableRefObject<HTMLButtonElement | null>];
export const StartSetterContext = createContext<ContextType>([false, () => {}, { current: null }]);

function App() {
  const startButtonRef = useRef<HTMLButtonElement | null>(null);
  const  [ startMenuRef, isStartMenuOpen, setisStartMenuOpen ] = useComponentVisible(false, startButtonRef);

    return (
      <>
          {/* <div>
      <p style={{ fontFamily: 'Happy Monkey', marginBottom: '20px' }}>Happy Monkey: Eric Augusto Batista Carvalho</p>
      <p style={{ fontFamily: 'Julius Sans One', marginBottom: '20px' }}>Julius Sans One: Eric Augusto Batista Carvalho</p>
      <p style={{ fontFamily: 'Major Mono Display', marginBottom: '20px' }}>Major Mono Display: Eric Augusto Batista Carvalho</p>
      <p style={{ fontFamily: 'Megrim', marginBottom: '20px' }}>Megrim: Eric Augusto Batista Carvalho</p>
      <p style={{ fontFamily: 'Oxanium', marginBottom: '20px' }}>Oxanium: Eric Augusto Batista Carvalho</p>
    </div> */}
      <Background/>
      <WindowContextProvider>
        <Desktop/>
        <Window/>
        <StartSetterContext.Provider value={[isStartMenuOpen,setisStartMenuOpen, startButtonRef]}>
          <div ref={startMenuRef}>
          {isStartMenuOpen && <StartMenu/>}
          </div>
          <Taskbar/>
        </StartSetterContext.Provider>
      </WindowContextProvider>
      </>
    )
}

export default App;
