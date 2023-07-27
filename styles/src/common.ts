import chroma from "chroma-js"
export * from "./theme"
export { chroma }

export const font_families = {
    ui_sans: "IBM Plex Sans",
    sans: "Zed Sans",
    mono: "Zed Mono",
}

const UI_BASE_SIZE = 16

export const font_sizes = {
    "2xs": UI_BASE_SIZE * 0.625,
    xs: UI_BASE_SIZE * 0.75,
    sm: UI_BASE_SIZE * 0.875,
    md: UI_BASE_SIZE,
    lg: UI_BASE_SIZE * 1.125,
}

export type FontWeight = "normal" | "bold"

export const font_weights: { [key: string]: FontWeight } = {
    normal: "normal",
    bold: "bold",
}
