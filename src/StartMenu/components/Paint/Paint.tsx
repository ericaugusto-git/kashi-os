import { FILE_EXPLORER, FileProps } from "@/constants/apps";
import useOpenWindow from "@/hooks/useOpenWindow";
import { fileCount } from "@/utils/utils";
import { useRef, useState } from "react";
import { ChromePicker, CirclePicker } from 'react-color';
import { useTranslation } from "react-i18next";
import ReactPainter from "react-painter";
import { LineCapType } from "react-painter/dist/ReactPainter";
import ButtonGroup from "../../../Taskbar/components/ButtonGroup/ButtonGroup";
import dashed from '../../../assets/paint/dashed.svg';
import download from '../../../assets/paint/download.svg';
import eraser from '../../../assets/paint/eraser.svg';
import round from '../../../assets/paint/round.svg';
import square from '../../../assets/paint/square.svg';
import styles from "./Paint.module.scss";

export default function Paint({listFiles, createFile}: FileProps) {
  const [pickerColor, setpickerColor] = useState('#000000');
  const painterRef = useRef<ReactPainter>(null)
  const [lineWidth, setLineWidth] = useState<number>(15);
  const [eraserActive, setEraserActive] = useState(false);
  const [lineCap, setLineCap] = useState("round");
  const openWindow = useOpenWindow();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

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
  setEraserActive(action == "eraser");
  setLineCap(action);
   painterRef.current?.handleSetColor(action == "eraser" ?  "white" : pickerColor)
   painterRef.current?.handleSetLineCap(action == "eraser" ? 'round' : action as LineCapType);
   
  }
  async function downloadBlob(blob: Blob, name = 'your_beautiful_art.png') {
    // Create canvas and context
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Create an image from the blob
    const img = new Image();
    img.src = URL.createObjectURL(blob);
    
    // Wait for image to load
    await new Promise(resolve => img.onload = resolve);
    
    // Set canvas size to match image
    canvas.width = img.width;
    canvas.height = img.height;
    
    // Fill white background
    if (ctx) {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw original image on top
        ctx.drawImage(img, 0, 0);
    }
    // Convert to new blob with white background
    const newBlob = await new Promise<Blob>(resolve => {
        canvas.toBlob(blob => {
            if (blob) resolve(blob);
        }, 'image/png');
    });

    const list = await listFiles!('/home/pictures');
    if(list && createFile){
      const count = fileCount(list, name);
      const extension = '.png';
      const fileName = `${name.replace(extension, '')} ${count == 0 ? '' : `(${count})`}`.trim() + extension;
      const file = new File([newBlob], fileName, { type: "image/png" });
      const folderPath = '/home/pictures';
      await createFile(folderPath, file);
      openWindow({...FILE_EXPLORER,  props: {filePath: folderPath}});
    }
}

const cursorStyle = {
  position: 'fixed',
  pointerEvents: 'none',
  width: `${lineWidth}px`,
  height: `${lineWidth}px`,
  border: `1px solid ${eraserActive ? 'black' : pickerColor}`,
  borderRadius: '50%',
  transform: 'translate(-50%, -50%)',
  left: mousePosition.x,
  top: mousePosition.y,
  display: isHovering ? 'block' : 'none',
  backgroundColor: eraserActive ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.1)',
  zIndex: 9999
} as const;

const handleMouseMove = (e: React.MouseEvent) => {
  setMousePosition({ x: e.clientX, y: e.clientY });
};

const handleCanvasHover = (hovering: boolean) => {
  setIsHovering(hovering);
};

  return (
    <ReactPainter
      ref={painterRef}
      width={window.innerWidth <= 768 ? window.innerWidth :  window.innerWidth - 240}
      height={window.innerHeight - (window.innerWidth <= 768 ? 210 : 26)}
      initialLineWidth={lineWidth}
      color={pickerColor}
      lineCap={lineCap}
      onSave={(blob) => downloadBlob(blob)}
      render={({ canvas, triggerSave, setColor, setLineWidth }) => (
        <div className={styles.paint_container}>
          <div className={styles.actions}>
            <div className={styles.line_config}>
            <div>
            <label className={styles.label}>{!eraserActive && t('line_cap')} ({t(lineCap)})</label>
            <ButtonGroup useMaskImage={true} handleClick={handleLineChange} selectedValue="round" buttons={themeButtons}></ButtonGroup>
            </div>
            <div>

              <label className={styles.label}>{t( eraserActive ? 'eraser_width' : 'line_width') } ({lineWidth}%)</label>
              <input className={styles.volume} type="range" min="1" max="150" defaultValue="45" onChange={e => handleLineWidthChange(e as unknown as React.ChangeEvent<HTMLInputElement>, setLineWidth)}            />
            </div>
            <div style={{width: '220px'}}>
              <label className={styles.label}>{t('color') }</label>
              <ChromePicker className={`${styles.colorPicker} ${styles.chromePicker}`} color={pickerColor} onChangeComplete={e => setColor(eraserActive ? "#FFFFFF" :  e.hex)} onChange={e => setpickerColor(e.hex)}/>
            </div>
              <CirclePicker className={styles.colorPicker} color={pickerColor} onChangeComplete={e => setColor(eraserActive ? "#FFFFFF" :  e.hex)} onChange={e => setpickerColor(e.hex)}/>
            </div>
            <div >
            <button className={styles.edit} onClick={triggerSave}>
              {t('save_your_art')}
          <div className={`svgMask`} style={{maskImage: `url("${download}")`}}></div>
        </button>
            {/* <Button styles={{background: '#313d3d'}} children={<span  className={styles.saveButton}>save your art <img src={download}></img> </span>} handleClick={triggerSave} /> */}
            </div>
          </div>
          <div 
            style={cursorStyle}
          />
          <div 
          className={styles.canvas}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => handleCanvasHover(true)}
            onMouseLeave={() => handleCanvasHover(false)}
          >
            {canvas}
          </div>
        </div>
      )}
    />
  );
}
