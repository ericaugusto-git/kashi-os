import { CSSProperties } from "react"

type BaseProps = {closeBtnRefs?: Array<HTMLButtonElement | null>, closeRefIndex?: number};
// re renders where not working very well with the useFileSystem inside the dynamic component, so i pass the getFileUrl as a prop.
export type FileProps = {
    filePath?: string, 
    getFileUrl?: (filePath: string, mimeType?: string) => Promise<string>, 
    updateFile?: (filePath: string, newContent: string) => Promise<void>,
    listFiles?: (folderPath: string) => Promise<WindowType[] | null>,
    folderPath?: string,
    fileList?: {[folderPath: string]: WindowType[]}
}
type WindowProps = BaseProps & FileProps;
export type WindowConteudo = (props: WindowProps) => JSX.Element;

export type WindowType = {
    x?: number,
    y?: number,
    width?: string,
    height?: string,
    maxWidth?: number,
    maxHeight?: number,
    cantMax?: boolean,
    thumbnail?: string,
    icon?: string,
    metadata?: {
        title?: string,
        artist?: string,
        album?: string,
        duration?: number
    },
    //if it well use svg mask or not also the color of the mask
    mask?: string,
    active?: boolean,
    minimized?: boolean,
    folderPath?: string,
    app: string,
    uniqueName?: string,
    appType: "project" | "os" | "file",
    desktop?: boolean,
    hideInStartMenu?: boolean,
    svgMask?: {startMenu?: boolean, desktop?: boolean, search?: boolean}
    props?: WindowProps;
    componentPath?: string,
    customClose?: boolean,
    windowStyles?: CSSProperties,
    headerStyles?: CSSProperties,
    bodyStyles?: CSSProperties,
    enableResizing?: boolean,
    desktopStyles?: {
        button?: CSSProperties,
        img?: CSSProperties,
        svg?: CSSProperties
    },
    // link for project to open with iframe
    link?: string
}