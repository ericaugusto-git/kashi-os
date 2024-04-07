import { useEffect, useRef, useState } from "react";
import ReactPainter from "react-painter";
import { LineCapType, LineJoinType } from "react-painter/dist/ReactPainter";
import styles from "./Paint.module.scss";
import { SketchPicker } from 'react-color';

export default function Paint() {
  const [pickerColor, setpickerColor] = useState('#00000');
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
  return (
    <ReactPainter
      width={window.innerWidth - 550}
      height={window.innerHeight - 200}
      onSave={(blob) => console.log(blob)}
      render={({ canvas, triggerSave, setLineCap, setColor, setLineWidth, setLineJoin }) => (
        <div className={styles.paint_container}>
          <div className={styles.actions}>
          <input type="number" onChange={e => setLineWidth(+e.target.value)} />
          <SketchPicker color={pickerColor} onChangeComplete={e => setColor(e.hex)} onChange={e => setpickerColor(e.hex)}/>
            <select onChange={(e) => setLineCap(e.target.value as LineCapType)}>
              <option value="round">round</option>
              <option value="butt">butt</option>
              <option value="square">square</option>
            </select>
            <select onChange={e => setLineJoin(e.target.value as LineJoinType)}>
                <option value="round">round</option>
                <option value="bevel">bevel</option>
                <option value="miter">miter</option>
            </select>
            <button onClick={triggerSave}>Save</button>
          </div>
          <div className={styles.canvas} style={{ backgroundColor: "white" }}>
            {canvas}
          </div>
        </div>
      )}
    />
  );
}
