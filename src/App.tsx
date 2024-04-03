/* eslint-disable @typescript-eslint/no-explicit-any */
import Background from "./Background"
import Desktop from "./Desktop/Desktop";
import StartMenu from "./StartMenu/StartMenu";
import Taskbar from "./Taskbar/Taskbar"
import React, { createContext, useState } from 'react';
import { projects, projectsType } from "./constants/projects";
import Window from "./Window/Window";

export const StartSetterContext = createContext<[boolean, React.Dispatch<React.SetStateAction<boolean>>]>([false, () => {}]);
export const WindowContext = createContext<[projectsType[], React.Dispatch<React.SetStateAction<projectsType[]>>]>([[], () => {}]);

function App() {
    const [startMenuOpen, setStartMenuOpen] = useState(false)
    const [windows, setWindows] = useState<projectsType[]>([]);

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
      <WindowContext.Provider value={[windows, setWindows ]}>
        <Desktop/>
        <Window/>
        <StartSetterContext.Provider value={[startMenuOpen,setStartMenuOpen]}>
          {startMenuOpen && <StartMenu/>}
          <Taskbar/>
        </StartSetterContext.Provider>
      </WindowContext.Provider>
      </>
    )
}

export default App;
