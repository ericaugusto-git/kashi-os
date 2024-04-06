import { CSSProperties } from "react"

export type WindowType = {
    x?: number,
    y?: number,
    width?: string,
    height?: string,
    icone?: string,
    active?: boolean
    app: string,
    conteudo?: JSX.Element,
    windowStyles?: CSSProperties,
    headerStyles?: CSSProperties,
    bodyStyles?: CSSProperties
}