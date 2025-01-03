import { AppType } from "@/constants/apps";
import { useFileSystem } from "@/contexts/FileSystemContext";
import DesktopIcon from "@/DesktopIcons/components/DesktopIcon/DesktopIcon";
import useOpenWindow from "@/hooks/useOpenWindow";
import { toValidJsonKey } from "@/utils/utils";
import { useEffect, useRef, useState } from 'react';
import style from "./Grid.module.scss";
import { motion } from "framer-motion";

type IconsCoords = {[key: string]: {x: number, y: number}};

export const Grid = ({apps}: {apps: AppType[] | null}) => {
    const fileName = 'desktop_icons_coords.json';
    const filePath = `/.config/${fileName}`;
    const [coords, setCoords] = useState<IconsCoords>();
    const {readFile, createFile, fileList} = useFileSystem();
    const openWindow = useOpenWindow();
    const gridRef = useRef<HTMLUListElement>(null);
    const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

    useEffect(() => {
        const getCoords = async () => {
            const coordsFile = await readFile(filePath);
            if(coordsFile && coordsFile?.length > 0){
                setCoords(JSON.parse(coordsFile.toString()));
            }
            if(coordsFile === null){
                setCoords({});
            }
        }
        getCoords();
    },[filePath, readFile, fileList])

    const handleDragStart = (e: React.DragEvent<HTMLLIElement>, app: AppType) => {
        e.dataTransfer.setData('text/plain', app.name);
        if (e.dataTransfer) {
            e.dataTransfer.effectAllowed = 'move';
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLUListElement>) => {
        e.preventDefault();
    };

    const handleDrop = async (e: React.DragEvent<HTMLUListElement>) => {
        e.preventDefault();
        if(e.target !== gridRef.current){
            return;
        }
        const draggedItemName = e.dataTransfer.getData('text/plain');
        const draggedIndex = apps?.findIndex(app => app.name === draggedItemName) ?? -1;
        
        // Early return if element is not found
        const currentElement = itemRefs.current[draggedIndex];
        if (!currentElement || !currentElement.style || !gridRef.current) {
            return;
        }

        const droppedLocation = {
            x: e.clientX,
            y: e.clientY
        };

        const totalCols = Math.ceil(gridRef.current.offsetWidth / 110);
        const totalRows = Math.ceil(gridRef.current.offsetHeight / 126);
        const droppedRow = droppedLocation.y >= (gridRef.current.offsetHeight - 126) ? totalRows - 1 : Math.ceil(droppedLocation.y / 126);
        const droppedCol = droppedLocation.x >= (gridRef.current.offsetWidth - 110)  ? totalCols - 1 : Math.ceil(droppedLocation.x / 110);      
        
        currentElement.style.gridRowStart = droppedRow.toString();
        currentElement.style.gridColumnStart = droppedCol.toString();
        
        const newCoords = {...coords, [toValidJsonKey(draggedItemName)]: {x: droppedRow, y: droppedCol}};
        setCoords(() => newCoords);
        await createFile(filePath, JSON.stringify(newCoords), null, true);        
    };

    return (
        <motion.ul initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 0.3}} ref={gridRef} className={style.grid} onDragOver={handleDragOver} onDrop={handleDrop}>
            {apps?.map((app: AppType, index) => (
                <li 
                    draggable={true} 
                    ref={el => itemRefs.current[index] = el}
                    id={app.name}  
                    style={{gridRowStart: coords?.[toValidJsonKey(app.name)]?.x, gridColumnStart: coords?.[toValidJsonKey(app.name)]?.y}}
                    onClick={() => openWindow(app)}
                    key={app.name}
                    onDragStart={(e) => handleDragStart(e, app)}
                >
                    <DesktopIcon 
                        app={app} 
                        folderPath='/home/desktop' 
                        svgStyles={app.desktopStyles?.svg} 
                        svgMask={app.svgMask?.desktop} 
                        buttonStyles={app.desktopStyles?.button} 
                        imgWrapperStyles={app.desktopStyles?.img} 
                    />
                </li>
            ))}
        </motion.ul>
    )
}