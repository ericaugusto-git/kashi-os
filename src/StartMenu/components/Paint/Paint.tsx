import { useEffect, useRef, useState } from "react";
import ReactPainter from "react-painter";
import { LineCapType, LineJoinType } from "react-painter/dist/ReactPainter";
import styles from "./Paint.module.scss";
import { SketchPicker } from 'react-color';
import {  Slider } from "@mui/material";
import eraser from '../../../assets/paint/eraser.svg'
import dashed from '../../../assets/paint/dashed.svg'
import round from '../../../assets/paint/round.svg'
import download from '../../../assets/paint/download.svg'
import square from '../../../assets/paint/square.svg'
import ButtonGroup from "../../../Taskbar/components/ButtonGroup/ButtonGroup";
import Button from "../../../Taskbar/components/Button/Button";

export default function Paint() {
  const [pickerColor, setpickerColor] = useState('#000000');
  const painterRef = useRef<ReactPainter>(null)
  const MAX = 150;
  const MIN = 1;
  const marks = [
    {
      value: MIN,
      label: '',
    },
    {
      value: MAX,
      label: '',
    },
  ];
  const [lineWidth, setLineWidth] = useState<number>(MIN);
  const [eraserActive, setEraserActive] = useState(false);
  const [lineCap, setlineCap] = useState("round");
  // const canvasRef = useRef<HTMLDivElement>(null);
  // const [windowWidth, setWindowWidth] = useState<number | undefined>(100);
  // const [windowHeight, setWindowHeight] = useState<number | undefined>(200);
  // useEffect(() => {
  //   // Function to update window width and height
  //   const handleResize = () => {
  //     console.log("canvas")
  //     setWindowWidth(canvasRef.current?.clientWidth);
  //     setWindowHeight(canvasRef.current?.clientHeight);
  //     console.log(canvasRef.current?.clientWidth)
  //   };
  //   const resizeObserver = new ResizeObserver(() => {

  //     console.log("resize");
  //     handleResize();
  //     // Do what you want to do when the size of the element changes
  //   });
  //   resizeObserver.observe(canvasRef.current!);
  //   // Add event listener for window resize
  //  handleResize()
  //   // Cleanup function to remove event listener
  //   return () => {
  //     resizeObserver.disconnect();
  //   };
  // }, []); // Empty dependency array ensures that effect runs only once
  // console.log("re render")
const handleLineWidthChange = (event: React.ChangeEvent<HTMLInputElement>, setter: (width: number) => void) => {
  console.log(event);
  const width = Number(event.target.value);
  setter(width);
  setLineWidth(width);
};
const themeButtons = [
  { action: 'round', icon: round},
  {action: 'butt', icon: dashed},
  {action: 'square', icon: square},
  {action: 'eraser', icon: eraser}
];
const handleEraserToggle = () => {
  setEraserActive(previous => !previous);

}

 const handleLineChange = (action: string) => {
  //  setpickerColor(action == "eraser" ?  "#FFFFFF" : pickerColor)
  //      setlineCap(action);
  console.log(pickerColor)
   painterRef.current?.handleSetColor(action == "eraser" ?  "#FFFFFF" : pickerColor)
   painterRef.current?.handleSetLineCap(action as LineCapType);
  }
  function downloadBlob(blob: Blob, name = 'your_beautiful_art.png') {
    // For other browsers:
    // Create a link pointing to the ObjectURL containing the blob.
    const data = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = data;
    link.download = name;

    // this is necessary as link.click() does not work on the latest firefox
    link.dispatchEvent(
      new MouseEvent('click', { 
        bubbles: true, 
        cancelable: true, 
        view: window 
      })
    );

    setTimeout(() => {
      // For Firefox it is necessary to delay revoking the ObjectURL
      window.URL.revokeObjectURL(data);
      link.remove();
    }, 100);
}

  return (
    <ReactPainter
      ref={painterRef}
      width={window.innerWidth - 320}
      height={window.innerHeight - 150}
      initialLineWidth={lineWidth}
      color={pickerColor}
      lineCap={lineCap}
      onSave={(blob) => downloadBlob(blob)}
      render={({ canvas, triggerSave, setLineCap, setColor, setLineWidth, setLineJoin }) => (
        <div className={styles.paint_container}>
          <div className={styles.actions}>
            <div style={{width: "100%", display: "flex", gap: "10px", flexDirection: "column"}}>
            <div className={styles.buttonGroup}>
            <ButtonGroup useMaskImage={true} handleClick={handleLineChange} selectedValue="round" buttons={themeButtons} stylesProp={{width: "26px", height: "30px"}}></ButtonGroup>
            </div>
            <div className={styles.slider}>
                <label>{(eraserActive ? 'Ereaser' : 'Line') +  ' width'}</label>
                <div className={styles.slider_container}>
                <Slider
                marks={marks}
                step={1}
                value={lineWidth}
                valueLabelDisplay="auto"
                min={MIN}
                max={MAX}
                onChange={e => handleLineWidthChange(e as unknown as React.ChangeEvent<HTMLInputElement>, setLineWidth)}
              />
                </div>
            </div>
            </div>
            <SketchPicker className={styles.colorPicker} color={pickerColor} onChangeComplete={e => setColor(eraserActive ? "#FFFFFF" :  e.hex)} onChange={e => setpickerColor(e.hex)}/>
            <div >
            <Button  children={<span  className={styles.saveButton}>save your art <img src={download}></img> </span>} handleClick={triggerSave} />
            </div>
          </div>
          <div className={styles.canvas} style={{ backgroundColor: "white" }}>
            {canvas}
          </div>
        </div>
      )}
    />
  );
}
