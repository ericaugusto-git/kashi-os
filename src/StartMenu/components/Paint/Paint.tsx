import { Slider } from "@mui/material";
import { useRef, useState } from "react";
import { SketchPicker } from 'react-color';
import { useTranslation } from "react-i18next";
import ReactPainter from "react-painter";
import { LineCapType } from "react-painter/dist/ReactPainter";
import Button from "../../../Taskbar/components/Button/Button";
import ButtonGroup from "../../../Taskbar/components/ButtonGroup/ButtonGroup";
import dashed from '../../../assets/paint/dashed.svg';
import download from '../../../assets/paint/download.svg';
import eraser from '../../../assets/paint/eraser.svg';
import round from '../../../assets/paint/round.svg';
import square from '../../../assets/paint/square.svg';
import styles from "./Paint.module.scss";

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
  const [lineCap] = useState("round");
  // const canvasRef = useRef<HTMLDivElement>(null);
  // const [windowWidth, setWindowWidth] = useState<number | undefined>(100);
  // const [windowHeight, setWindowHeight] = useState<number | undefined>(200);
  // useEffect(() => {
  //   // Function to update window width and height
  //   const handleResize = () => {
  //     setWindowWidth(canvasRef.current?.clientWidth);
  //     setWindowHeight(canvasRef.current?.clientHeight);
  //   };
  //   const resizeObserver = new ResizeObserver(() => {

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
const handleLineWidthChange = (event: React.ChangeEvent<HTMLInputElement>, setter: (width: number) => void) => {
  
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


const {t} = useTranslation();

window.addEventListener("resize", () => {
  
  painterRef.current?.render();
})

 const handleLineChange = (action: string) => {
  //  setpickerColor(action == "eraser" ?  "#FFFFFF" : pickerColor)
  //      setlineCap(action);
  setEraserActive(action == "eraser")
   painterRef.current?.handleSetColor(action == "eraser" ?  "#FFFFFF" : pickerColor)
   painterRef.current?.handleSetLineCap(action == "eraser" ? 'round' : action as LineCapType);
   
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
      render={({ canvas, triggerSave, setColor, setLineWidth }) => (
        <div className={styles.paint_container}>
          <div className={styles.actions}>
            <div style={{width: "100%", display: "flex", gap: "10px", flexDirection: "column"}}>
            <div className={styles.buttonGroup}>
            <ButtonGroup useMaskImage={true} handleClick={handleLineChange} selectedValue="round" buttons={themeButtons} stylesProp={{width: "26px", height: "30px"}}></ButtonGroup>
            </div>
            <div className={styles.slider}>
                {eraserActive ? <label>{t('eraser_width')}</label> : <label>{t('line_width')}</label>}
                {/* <label>{t((eraserActive ? 'ereaser_' : 'line_') +  'width')}</label> */}
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
            <SketchPicker className={styles.colorPicker} color={pickerColor} onChangeComplete={e => setColor(eraserActive ? "#FFFFFF" :  e.hex)} onChange={e => setpickerColor(e.hex)}/>
            </div>
            <div >
            <Button styles={{background: '#313d3d'}} children={<span  className={styles.saveButton}>save your art <img src={download}></img> </span>} handleClick={triggerSave} />
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
