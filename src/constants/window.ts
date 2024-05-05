import { CSSProperties } from "react"

export type WindowType = {
    x?: number,
    y?: number,
    width?: string,
    height?: string,
    maxWidth?: number,
    maxHeight?: number,
    cantMax?: boolean,
    icon?: string,
    //if it well use svg mask or not also the color of the mask
    mask?: string,
    active?: boolean
    app: string,
    appType: "project" | "os",
    desktop?: boolean,
    hideInStartMenu?: boolean,
    svgMask?: {startMenu?: boolean, desktop?: boolean}
    conteudo?: () => JSX.Element,
    windowStyles?: CSSProperties,
    headerStyles?: CSSProperties,
    bodyStyles?: CSSProperties,
    enableResizing?: boolean,
    desktopStyles?: {
        button?: CSSProperties,
        img?: CSSProperties
    },
    // link for project to open with iframe
    link?: string
}