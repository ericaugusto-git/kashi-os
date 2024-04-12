import { CSSProperties } from "react"

export type WindowType = {
    x?: number,
    y?: number,
    width?: string,
    height?: string,
    cantMax?: boolean,
    icon?: string,
    active?: boolean
    app: string,
    conteudo?: JSX.Element,
    windowStyles?: CSSProperties,
    headerStyles?: CSSProperties,
    bodyStyles?: CSSProperties,
    enableResizing?: boolean
}